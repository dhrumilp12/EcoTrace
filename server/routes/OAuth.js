const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();
const User = require('../models/user');
const isStrongPassword = require('../utils/passwordUtils');

// Route to handle login
router.post('/login', async (req, res) => {
    const { login, password } = req.body; // 'login' can be either an email or a username

    // Find the user by email or username
    const user = await User.findOne({
        $or: [
            { email: login },
            { username: login }
        ]
    });

    // Check if user exists and password is valid
    if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).send('Invalid credentials');
    }

    // If user is found and password is valid, create a JWT token
    const payload = {
        id: user._id,
        email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });

    // Send the token to the client
    res.json({ token });
});

module.exports = router;

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check password strength
    if (!isStrongPassword(password)) {
        return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

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

        res.status(201).json({ message: 'User created successfully', token });
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
