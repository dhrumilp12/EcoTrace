const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const passport = require('passport');
const upload = require('../utils/multerUtil');

// Middleware to authenticate using JWT
const authenticate = passport.authenticate('jwt', { session: false });

// POST route to submit a new report with image and video uploads
router.post('/reports', authenticate, upload.fields([{ name: 'images', maxCount: 3 }, { name: 'videos', maxCount: 3 }]), async (req, res) => {
    const { description, longitude, latitude } = req.body;
    const images = req.files['images'] ? req.files['images'].map(file => file.location) : [];
    const videos = req.files['videos'] ? req.files['videos'].map(file => file.location) : [];

    try {
        const newReport = new Report({
            userId: req.user._id,
            description,
            images,
            videos,
            location: { coordinates: [longitude, latitude] }
        });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: 'Error creating report', error: error.message });
    }
});


// GET route to fetch reports
router.get('/reports', authenticate, async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
});

module.exports = router;
