// routes/badge.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Badge = require('../models/badge');
const passport = require('passport');
const upload = require('../utils/multerUtil');
const mongoose = require('mongoose');

const authenticate = passport.authenticate('jwt', { session: false });

// Create a badge with icon upload
router.post('/', authenticate, upload.single('icon'), async (req, res) => {
    try {
        const { name, description, criteria, points } = req.body;
        const iconUrl = req.file ? req.file.location : null; // Assuming file location is returned by multerS3
        const newBadge = new Badge({ name, description, criteria, iconUrl, points: points || 10 });
        await newBadge.save();
        res.status(201).json(newBadge);
    } catch (error) {
        res.status(400).json({ message: 'Error creating badge', error: error.message });
    }
});

// Get all badges
router.get('/', async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving badges', error });
    }
});

// Update a badge with icon upload
router.put('/:id', authenticate, upload.single('icon'), async (req, res) => {
    const { name, description, criteria, points } = req.body;
    const iconUrl = req.file ? req.file.location : null; // Handling new icon upload
    try {
        const badgeUpdate = { name, description, criteria, ...(points && { points })};
        if (iconUrl) badgeUpdate.iconUrl = iconUrl; // Only update iconUrl if a new icon was uploaded
        const updatedBadge = await Badge.findByIdAndUpdate(req.params.id, badgeUpdate, { new: true, runValidators: true });
        if (!updatedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.json(updatedBadge);
    } catch (error) {
        res.status(500).json({ message: 'Error updating badge', error });
    }
});

// Delete a badge
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedBadge = await Badge.findByIdAndDelete(req.params.id);
        if (!deletedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting badge', error });
    }
});


// Award a badge
router.post('/award-badge', authenticate, async (req, res) => {
    const { userId, badgeId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(badgeId)) {
        return res.status(400).json({ message: 'Invalid user or badge ID' });
    }

    try {
        const user = await User.findById(userId);
        const badge = await Badge.findById(badgeId);
        if (!user || !badge) {
            return res.status(404).json({ message: 'User or Badge not found' });
        }

        const badgeExists = user.badges.some(b => b.badge.equals(badgeId));
        if (badgeExists) {
            return res.status(409).json({ message: 'Badge already awarded' });
        }

        user.badges.push({ badge: badgeId });
        user.points += badge.points;
        await user.save();
        res.json({ message: 'Badge awarded successfully', user: { username: user.username, badges: user.badges } });
    } catch (error) {
        res.status(500).json({ message: 'Error awarding badge', error: error.message });
    }
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({}, 'username points -_id')
                                     .sort({ points: -1 })
                                     .limit(10);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});

module.exports = router;
