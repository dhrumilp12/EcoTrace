const mongoose = require('mongoose');

const environmentalDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateRecorded: Date,
    pollutionLevel: Number,
    temperature: Number,
    type: {
        type: String,
        required: true,
        enum: ['Air Quality', 'Water Pollution', 'Noise Levels', 'Land Pollution', 'Other']
    },
    location: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('EnvironmentalData', environmentalDataSchema);
