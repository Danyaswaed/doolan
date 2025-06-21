// server/services/emailService.js
// This service sends emails for the Contact Us form.
// Gmail’s SMTP enforces that the "From" address matches the authenticated user.
// We therefore set From to the site email and use Reply-To for the end user's address.
// To send truly from the user's email, you must use a custom SMTP server or email-sending service
// configured with your own domain and proper SPF/DKIM records (e.g., SendGrid, Mailgun).

require('dotenv').config(); // Load environment variables from .env
const nodemailer = require('nodemailer');

// Create transporter using Gmail service
const transporter = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
    },
  },
  {
    logger: true,
    debug: true,
  }
);

// Verify SMTP connection on startup
transporter.verify()
  .then(() => console.log('✅ SMTP connection successful'))
  .catch((err) => console.error('❌ SMTP connection error:', err));

/**
 * sendContactMessage
 * @param {string} name     - The user’s name
 * @param {string} fromEmail - The user’s email address
 * @param {string} message  - The message content
 */
async function sendContactMessage(name, fromEmail, message) {
  // Mail options
  const mailOptions = {
    // 'From' must match the authenticated account for Gmail SMTP
    from: `"DoOlanyaTrips" <${process.env.EMAIL_USER}>`,  
    to: process.env.EMAIL_USER,
    // BCC for backup or monitoring if needed (optional)
    bcc: process.env.BCC_EMAIL || '',
    subject: `New Contact Form Submission from ${name}`,
    // Body includes original user email so you can see and reply
    text: `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`,
    // When replying, Gmail will direct replies to the user’s address
    replyTo: fromEmail,
    // To override MAIL FROM (envelope sender) you could set:
    // envelope: { from: fromEmail, to: process.env.EMAIL_USER }
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log('📧 Email sent info:', info);
  return info;
}

module.exports = { sendContactMessage };
