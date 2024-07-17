const Event = require('../models/event');
const { notifyParticipants } = require('./notificationFunctions');

// This function updates the status of events based on the current date
exports.updateEventStatuses = async function() {
    const now = new Date();
    const events = await Event.find({
        date: { $lte: now },
        status: { $ne: 'Completed' } // Fetch events that are not already completed
    });

    events.forEach(async (event) => {
        let newStatus = 'Ongoing';
        if (new Date(event.date) < now) {
            newStatus = 'Completed';
        }
        if (event.status !== newStatus) {
            event.status = newStatus;
            await event.save();
            console.log(`Event status updated: ${event.title} is now ${newStatus}`);
            notifyParticipants(event._id, `Event status updated to ${newStatus}`);
        }
    });
};
