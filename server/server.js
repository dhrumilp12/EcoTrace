require('dotenv').config();
const express = require('express');
const session = require('express-session');
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
const educationalRoutes = require('./routes/educational');
const badgeRoutes = require('./routes/badge');
const notificationRoutes = require('./routes/notification');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        const app = express();

        // Session configuration
        app.use(session({
            
            secret: process.env.GOOGLE_CLIENT_SECRET, // Replace 'your_secret_key' with a real secret key
            resave: false,
            saveUninitialized: true,
            cookie: { secure: !process.env.NODE_ENV !== 'production' } // Use secure cookies in production environment
        }));

        // Middlewares
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(cors({
            origin: process.env.Frontend_URL // Your Vercel domain
          }));
          console.log('CORS enabled', process.env.Frontend_URL);
        app.use(bodyParser.json());

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/reports', reportRoutes);
        app.use('/api/environmental', environmentalRoutes);
        app.use('/api/forum', forumRoutes);
        app.use('/api/event', eventRoutes);
        app.use('/api/educational', educationalRoutes);
        app.use('/api/badge', badgeRoutes);
        app.use('/api/notification', notificationRoutes);

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
            try{
            require('./utils/notificationFunctions').sendEventReminders();
            require('./utils/eventUtilities').updateEventStatuses();
            console.log('Daily event reminder notifications sent.');
            } catch (error) {
                console.error('Daily tasks failed:', error);
            }
        });

        // Define PORT from .env, or default to 3000 if not specified
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));