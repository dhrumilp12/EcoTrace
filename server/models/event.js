const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String },
    rating: { type: Number }
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
        address: String  // Optional address field for better readability
    },
    images: [{ type: String }],  // Array to store image URLs
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    feedback: [feedbackSchema], // Array of feedback objects
    public: { type: Boolean, default: true }, // Whether the event is public or private
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

eventSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);
