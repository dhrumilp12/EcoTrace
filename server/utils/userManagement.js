// utils/userManagement.js
const User = require('../models/user');

async function createUser(data) {
    const { username, email, password, googleId } = data;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
        throw new Error('User with the given email or username already exists');
    }

    // Create new user
    user = new User({ username, email, password, googleId });
    await user.save();
    return user;
}

module.exports = { createUser };
