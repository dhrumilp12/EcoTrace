const mongoose = require('mongoose');

const educationalContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Conservation', 'Recycling', 'Pollution', 'Biodiversity', 'Other']
    },
    images: [{ url: String, altText: { type: String, required: true } }],
    videos: [{ url: String, subtitleUrl: { type: String, required: true } }],
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

educationalContentSchema.pre('validate', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title.toLowerCase().split(' ').join('-');
    }
    next();
});


module.exports = mongoose.model('EducationalContent', educationalContentSchema);