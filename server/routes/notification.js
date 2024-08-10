const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to authenticate using JWT
const authenticate = passport.authenticate('jwt', { session: false });

const Notification = require('../models/notification');
// Ensure this route is protected by authentication middleware
router.get('/',  authenticate, async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
        
        res.json(notifications);
    } catch (error) {
        console.error('Failed to fetch notifications', error);
        res.status(500).send('Error fetching notifications');
    }
});

module.exports = router;
