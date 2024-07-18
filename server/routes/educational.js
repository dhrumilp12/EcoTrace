const express = require('express');
const router = express.Router();
const EducationalContent = require('../models/educationalContent');
const passport = require('passport');
const upload = require('../utils/multerUtil');

const authenticate = passport.authenticate('jwt', { session: false });

// POST route to create educational content with media uploads
router.post('/', authenticate, upload.fields([{ name: 'images', maxCount: 5 }, { name: 'videos', maxCount: 3 }]), async (req, res) => {
    const { title, description, content, category, tags } = req.body;

    if (!title || !description || !content || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let images = req.files['images'] || [];
        let videos = req.files['videos'] || [];

        images = images.map(file => ({ url: file.location, altText: '' })); // Placeholder for alt text
        videos = videos.map(file => ({ url: file.location, subtitleUrl: '' })); // Placeholder for subtitles

        const newContent = new EducationalContent({
            title,
            description,
            content,
            category,
            tags: tags ? tags.split(',') : [], // Convert string to array if tags are provided
            images,
            videos,
            author: req.user._id
        });

        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        console.error('Error creating educational content:', error);
        res.status(500).json({ message: 'Error creating educational content', error: error.message });
    }
});

// GET route to fetch all educational content
router.get('/', async (req, res) => {
    try {
        const { category, tags } = req.query;
        let query = {};
        if (category) query.category = category;
        if (tags) query.tags = { $all: tags.split(',') };

        const contents = await EducationalContent.find(query).populate('author', 'username').sort({ createdAt: -1 });
        res.json(contents);
    } catch (error) {
        console.error('Error fetching educational content:', error);
        res.status(500).json({ message: 'Error fetching educational content', error });
    }
});

// PUT route to update educational content by ID
router.put('/:id', authenticate, async (req, res) => {
    const { title, description, content, category, images, videos } = req.body;
    try {
        const updatedContent = await EducationalContent.findByIdAndUpdate(
            req.params.id, 
            { title, description, content, category, images, videos },
            { new: true, runValidators: true }
        );
        res.json(updatedContent);
    } catch (error) {
        console.error('Error updating educational content:', error);
        res.status(500).json({ message: 'Error updating educational content', error });
    }
});

// DELETE route to delete educational content by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        await EducationalContent.findByIdAndDelete(req.params.id);
        res.status(204).send('Educational content deleted successfully');
    } catch (error) {
        console.error('Error deleting educational content:', error);
        res.status(500).json({ message: 'Error deleting educational content', error });
    }
});

module.exports = router;
