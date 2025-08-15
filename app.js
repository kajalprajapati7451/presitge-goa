require('dotenv').config(); // Load .env variables

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ADMIN_EMAIL = process.env.EMAIL_USER;
const ADMIN_PASS = process.env.EMAIL_PASS;

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: ADMIN_EMAIL,
                pass: ADMIN_PASS
            }
        });

        // 1. Email to YOU
        await transporter.sendMail({
            from: `"Contact Form" <${ADMIN_EMAIL}>`,
            to: ADMIN_EMAIL,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        // 2. Email to the USER
        await transporter.sendMail({
            from: `"Your Company" <${ADMIN_EMAIL}>`,
            to: email,
            subject: "We received your message",
            text: `Hello ${name},\n\nThanks for contacting us! Here’s your message:\n"${message}"`
        });

        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
