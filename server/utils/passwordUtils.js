// Helper function to check password strength
function isStrongPassword(password) {
    // Example check: at least one number, one lowercase, one uppercase letter, and at least 8 characters
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}

module.exports = isStrongPassword;