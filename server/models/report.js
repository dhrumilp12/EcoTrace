const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String], // URLs to images
    videos: [String], // URLs to videos
    location: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// To enable geospatial queries
reportSchema.index({ location: '2dsphere' });

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
