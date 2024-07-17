const Notification = require('../models/notification');
const Event = require('../models/event');

exports.notifyParticipants = async function(eventId, message, eventType = 'update') {
    try {
        const event = await Event.findById(eventId).populate('participants');
        if (!event) {
            console.log(`Event ${eventId} not found for notifications.`);
            return; // Exit if no event found
        }

        const notifications = event.participants.map(participant => ({
            recipient: participant._id,
            message: `${message} - ${eventType}`,
            event: eventId
        }));
        await Notification.insertMany(notifications);
        console.log(`Notifications sent for event ${eventId}: ${eventType}`);
    } catch (error) {
        console.error(`Failed to send notifications for event ${eventId}:`, error);
    }
};

exports.sendEventReminders = async function() {
    const today = new Date();
    const reminderDate = new Date(today.setDate(today.getDate() + 3)); // set reminders for events happening in 3 days
    const eventsToRemind = await Event.find({
        date: { $lte: reminderDate, $gt: new Date() },
        status: { $in: ['Upcoming', 'Ongoing'] }
    }).populate('participants');


    eventsToRemind.forEach(event => {
        notifyParticipants(event._id, 'Reminder: Your event is coming up in 3 days!', 'reminder');
    });
};
