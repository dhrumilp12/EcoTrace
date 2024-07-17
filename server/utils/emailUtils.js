const nodemailer = require('nodemailer');
require('dotenv').config();


exports.sendPasswordResetEmail = async function(email, resetUrl) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: 465, // For SSL
        secure: true, // Use SSL
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               ${resetUrl}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
};

    