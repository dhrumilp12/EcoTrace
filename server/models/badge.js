const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    criteria: String, // Description of how to earn this badge
    iconUrl: String, // URL to an image representing the badge
    points: {
        type: Number,
        default: 10 // Default points awarded for this badge
    }
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;
