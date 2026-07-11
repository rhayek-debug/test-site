const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, phone, comments } = req.body || {};

  // Server-side validation (never trust the client alone)
  if (!name || !email || !phone || !comments) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  try {
    await resend.emails.send({
      // Until you verify your own domain in Resend, you must send FROM this address.
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO,
      reply_to: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nComments:\n${comments}`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
