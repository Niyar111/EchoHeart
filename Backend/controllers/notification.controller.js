const User = require('../models/user.model');
// --- THIS IS THE FIX ---
// The path now correctly points to the 'Services' folder with a capital 'S'.
const { sendSms } = require('../Services/sms.service');

// @desc    Send a broadcast SMS to all users in a specific district
// @route   POST /api/notifications/broadcast
// @access  Private (should be admin-only in a real app)
exports.sendBroadcastAlert = async (req, res) => {
  const { district, message } = req.body;

  if (!district || !message) {
    return res.status(400).json({ msg: 'Please provide a district and a message.' });
  }

  try {
    const usersInDistrict = await User.find({ district: district, isPhoneVerified: true });

    if (usersInDistrict.length === 0) {
      return res.status(404).json({ msg: `No verified users found in the district: ${district}` });
    }

    const smsPromises = usersInDistrict.map(user => {
      const formattedPhoneNumber = user.phoneNumber.startsWith('+') ? user.phoneNumber : `+${user.phoneNumber}`;
      return sendSms(formattedPhoneNumber, `EchoHeart Emergency Alert: ${message}`);
    });

    await Promise.all(smsPromises);

    res.json({
      success: true,
      message: `Successfully sent alerts to ${usersInDistrict.length} users in ${district}.`
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

