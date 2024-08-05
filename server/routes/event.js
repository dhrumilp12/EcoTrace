const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const passport = require('passport');
const upload = require('../utils/multerUtil');
const Notification = require('../models/notification');
const { notifyParticipants } = require('../utils/notificationFunctions');

// Middleware to authenticate using JWT
const authenticate = passport.authenticate('jwt', { session: false });

// Post a new event
router.post('/', authenticate, upload.array('images', 3), async (req, res) => {
    try {
        const { title, description, public: publicStatus, date: dateString, location: locationString } = req.body;

        // Trim and remove potential extra quotes
        const cleanDateString = dateString.trim().replace(/^"|"$/g, '');
        console.log('Cleaned date string:', cleanDateString); // Debugging to see the cleaned date string

        const date = new Date(cleanDateString);
        console.log('Parsed date:', date); // Check the parsed date output

        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Error creating event', error: 'Invalid date format' });
        }

        // Explicitly convert publicStatus to a boolean
        const public = publicStatus === 'true' ? true : publicStatus === 'false' ? false : Boolean(publicStatus);
        
        let location = typeof locationString === 'string' ? JSON.parse(locationString) : locationString;
        console.log('Parsed location:', location); // Check the parsed location output

        if (!location || !location.coordinates) {
            return res.status(400).json({ message: 'Error creating event', error: 'Coordinates are required for location' });
        }

        let imagePaths = req.files.map(file => file.location);

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            public,
            images: imagePaths,
            organizer: req.user._id
        });

        await newEvent.save();
        notifyParticipants(newEvent._id, 'A new community project event has been created!');
        res.status(201).json(newEvent);
        console.log('Event created:', newEvent); // Log the created event
    } catch (error) {
        console.error('Server error:', error); // Log the full error
        res.status(400).json({ message: 'Error creating event', error: error.message || error.toString() });
    }
});


// RSVP to an event
router.post('/:eventId/rsvp', authenticate, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.eventId,
            { $addToSet: { participants: req.user._id } },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await notifyParticipants(req.params.eventId, "New participant RSVPed!");
        res.json({ message: 'RSVP successful', event });
    } catch (error) {
        res.status(500).json({ message: 'Error RSVPing to event', error });
    }
});

// Get all events with filtering capabilities
router.get('/', async (req, res) => {
    try {
        const { start, end, public } = req.query;
        let query = {};
        if (public) {
            query.public = public === 'true';
        }
        if (start || end) {
            query.date = {};
            if (start) query.date.$gte = new Date(start);
            if (end) query.date.$lte = new Date(end);
        }
        const events = await Event.find(query).populate('organizer participants', 'username');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});


// Update an event by its ID (only by organizer)
router.put('/:eventId', authenticate, upload.array('images', 3), async (req, res) => {
    console.log("Received body:", req.body); // Log the received body data
    try {
        const { title, description, location, public: publicStatus } = req.body;
        let imagePaths = req.files.map(file => file.location);
        
        const eventBeforeUpdate = await Event.findById(req.params.eventId);
        if (!eventBeforeUpdate || eventBeforeUpdate.organizer.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        // Use existing date if not provided or invalid
        let dateString = req.body.date;
        let date = new Date(dateString?.trim());
        if (!dateString || isNaN(date.getTime())) {
            date = eventBeforeUpdate.date; // fallback to existing date
        }
        
        let locationParsed = typeof location === 'string' ? JSON.parse(location) : location;

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.eventId,
            { $set: { title, description, date, location: locationParsed, public: publicStatus === 'true' || publicStatus === true, images: imagePaths }},
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        let updateMessage = 'Event details have been updated!';
        if (eventBeforeUpdate.date.toString() !== date.toString()) {
            updateMessage = 'Event date has changed!';
        }

        notifyParticipants(updatedEvent._id, updateMessage);
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error processing request:", error); // Log the error details
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});




// Delete an event
router.delete('/:eventId', authenticate, async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId).populate('participants');
        if (!event || event.organizer.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        // Notify participants before deleting the event
        await notifyParticipants(event._id, 'Event has been cancelled!', 'cancel');

        // Now delete the event
        await Event.deleteOne({ _id: req.params.eventId });
        res.status(204).send();
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});

// Route to add feedback to an event
router.post('/:eventId/feedback', authenticate, async (req, res) => {
    const { comment, rating } = req.body;
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.eventId, participants: req.user._id },
            { $push: { feedbacks: { participant: req.user._id, comment, rating } } },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }
        notifyParticipants(event._id, 'New feedback has been added!');
        res.json({ message: 'Feedback added successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error adding feedback', error });
    }
});

module.exports = router;