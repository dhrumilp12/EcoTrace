const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user');

// Route to handle login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).send('Invalid credentials');
    }

    const payload = {
        id: user._id,
        email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });

    res.json({ token });
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists with the same email or username
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            if (user.email === email) {
                return res.status(409).json({ message: 'Email already in use' });
            }
            if (user.username === username) {
                return res.status(409).json({ message: 'Username already in use' });
            }
        }

        // Create a new user if no conflicts
        user = new User({ username, email, password });
        await user.save();

        // Generate JWT token after successful registration
        const payload = {
            id: user._id,
            email: user.email
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering new user', error: error.message });
    }
});


// Google OAuth route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

    router.get('/secure-route', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ message: 'Secure data' });
    });
    
module.exports = router;
