const User = require('../models/user'); // Make sure the path is correct based on your project structure

// Function to generate a unique username
async function generateUniqueUsername(baseUsername) {
    let username = baseUsername;
    let count = 0;
    while (await User.exists({ username: username })) {
        count++;
        username = `${baseUsername}${count}`;
    }
    return username;
}

module.exports = generateUniqueUsername;