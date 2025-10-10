const Sos = require('../models/sos.model');
const User = require('../models/user.model');
const RescueContact = require('../models/rescueContact.model');
const { sendSms } = require('../Services/sms.service');

// --- 1. FUNCTION FOR A USER REQUESTING RESCUE ---
exports.requestRescue = async (req, res) => {
  try {
    const { message, location } = req.body;
    const userInDistress = req.user;

    const newSos = new Sos({
      sosType: 'security',
      alertType: 'personal-safety',
      message: `URGENT RESCUE REQUEST: ${message}`,
      location,
      triggeredBy: userInDistress._id,
      isVerified: true,
    });
    await newSos.save();

    const rescueTeams = await RescueContact.find({
      district: userInDistress.district,
      isActive: true,
    });

    if (rescueTeams.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Your SOS has been logged, but no local rescue contacts could be automatically notified.' 
      });
    }

    const googleMapsLink = `https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`;
    const emergencyMessage = `URGENT EchoHeart RESCUE ALERT:\nPerson: ${userInDistress.fullname}\nPhone: ${userInDistress.phoneNumber}\nLocation: ${googleMapsLink}\nMessage: "${message}"`;

    const smsPromises = rescueTeams.map(team => {
      const formattedPhoneNumber = team.phoneNumber.startsWith('+') ? team.phoneNumber : `+${team.phoneNumber}`;
      return sendSms(formattedPhoneNumber, emergencyMessage);
    });

    await Promise.all(smsPromises);

    res.json({
      success: true,
      message: `Emergency alert successfully sent to ${rescueTeams.length} local rescue teams. Help is on the way.`
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 2. FUNCTION FOR CREATING A GENERAL ALERT ---
exports.createSos = async (req, res) => {
  try {
    const { sosType, alertType, message, location } = req.body;
    const triggeredBy = req.user._id; 

    const newSos = new Sos({
      sosType,
      alertType,
      message,
      location,
      triggeredBy,
    });

    const sos = await newSos.save();
    res.status(201).json(sos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 3. FUNCTION FOR GETTING ALL ALERTS ---
exports.getAllSos = async (req, res) => {
    try {
        const alerts = await Sos.find().populate('triggeredBy', ['fullname', 'village']);
        res.json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

