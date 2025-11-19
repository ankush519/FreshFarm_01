import express from 'express';

const router = express.Router();

// In-memory store for OTPs (in production, use Redis or database)
const otpStore = new Map();

// Send OTP
router.post('/send', async (req, res) => {
  try {
    const { gmail } = req.body;

    if (!gmail || !gmail.includes('@gmail.com')) {
      return res.status(400).json({ message: 'Valid Gmail address required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with expiration (5 minutes)
    otpStore.set(gmail, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    // For testing: Log OTP to console instead of sending email
    console.log(`OTP for ${gmail}: ${otp}`);

    /*
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: gmail,
      subject: 'Your OTP for Payment Verification',
      text: `Your OTP for payment verification is: ${otp}. This OTP will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    */

    res.json({ message: 'OTP sent to your Gmail' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify', (req, res) => {
  try {
    const { gmail, otp } = req.body;

    const storedOtp = otpStore.get(gmail);

    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (Date.now() > storedOtp.expires) {
      otpStore.delete(gmail);
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP verified, remove from store
    otpStore.delete(gmail);

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

export default router;
