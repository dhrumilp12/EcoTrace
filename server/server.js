require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');  // Make sure passport is required
const cron = require('node-cron');
const Event = require('./models/event');
const { notifyParticipants } = require('./utils/notificationFunctions');
require('./config/passport'); // Make sure passport config is required

// Import routes
const authRoutes = require('./routes/OAuth');
const reportRoutes = require('./routes/report');
const environmentalRoutes = require('./routes/environmental');
const forumRoutes = require('./routes/forum');
const eventRoutes = require('./routes/event');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        const app = express();

        // Middlewares
        app.use(passport.initialize());
        app.use(cors());
        app.use(bodyParser.json());

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/report', reportRoutes);
        app.use('/api/environmental', environmentalRoutes);
        app.use('/api/forum', forumRoutes);
        app.use('/api/event', eventRoutes);

        // Basic route
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Cron job to delete past events daily at midnight
        cron.schedule('0 0 * * *', async () => {
            const now = new Date();
            try {
                const deletedEvents = await Event.deleteMany({ date: { $lt: now } });
                console.log(`Deleted past events: ${deletedEvents.deletedCount}`);
            } catch (error) {
                console.error('Error deleting past events:', error);
            }
            require('./utils/notificationFunctions').sendEventReminders();
            require('./utils/eventUtilities').updateEventStatuses();
            console.log('Daily event reminder notifications sent.');
        });

        // Define PORT from .env, or default to 3000 if not specified
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));