const express = require('express');
const router = express.Router();
const EnvironmentalData = require('../models/environmentalData');
const passport = require('passport');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Middleware to authenticate using JWT
const authenticate = passport.authenticate('jwt', { session: false });

// POST route to create new environmental data
router.post('/data', authenticate, async (req, res) => {
    
    try {
        const { dateRecorded, pollutionLevel, temperature, latitude, longitude, type } = req.body;
        const newEntry = new EnvironmentalData({
            userId: req.user._id, // Assume req.user is populated from the JWT
            dateRecorded,
            pollutionLevel,
            temperature,
            type,
            location: { latitude, longitude }
        });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: 'Error creating data', error: error.message });
    }
});

// PUT route to update environmental data
router.put('/data/:id', authenticate, async (req, res) => {
    try {
        const entry = await EnvironmentalData.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Data not found' });
        }
        if (entry.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedEntry = await EnvironmentalData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
});

// DELETE route to delete environmental data
router.delete('/data/:id', authenticate, async (req, res) => {
    try {
        const entry = await EnvironmentalData.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Data not found' });
        }
        if (entry.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await EnvironmentalData.findByIdAndDelete(req.params.id);
        res.status(204).send('Data deleted successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
});

// Endpoint to get environmental data with optional filtering (with caching)
router.get('/data', async (req, res) => {
    let cacheKey = JSON.stringify(req.query);
    let cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const { startDate, endDate, minPollution, maxPollution, type, userId } = req.query;
        let query = {};

        if (startDate || endDate) {
            query.dateRecorded = {};
            if (startDate) query.dateRecorded.$gte = new Date(startDate);
            if (endDate) query.dateRecorded.$lte = new Date(endDate);
        }

        if (minPollution || maxPollution) {
            query.pollutionLevel = {};
            if (minPollution) query.pollutionLevel.$gte = parseFloat(minPollution);
            if (maxPollution) query.pollutionLevel.$lte = parseFloat(maxPollution);
        }

        if (type) {
            query.type = type;
        }

        if (userId) { // Assuming you want to let users filter their own data
            query.userId = userId;
        }

        const data = await EnvironmentalData.find(query).lean();
        console.log('Data:', data);
        cache.set(cacheKey, data); // Update cache with new data
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});


// Endpoint to get aggregated environmental statistics
router.get('/statistics', async (req, res) => {
    try {
        const stats = await EnvironmentalData.aggregate([
            {
                $group: {
                    _id: null,
                    averagePollution: { $avg: '$pollutionLevel' },
                    maxTemperature: { $max: '$temperature' },
                    minTemperature: { $min: '$temperature' }
                }
            }
        ]);

        if (stats.length > 0) {
            res.json(stats[0]);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
});


module.exports = router;
