const Alert = require('../models/alert.model');
const User = require('../models/user.model');

const createAlert = async (req, res) => {
  try {
    
    const { uid } = req.user;
    
    const { message, severity } = req.body;

    const author = await User.findOne({ uid: uid });
    if (!author) {
      return res.status(404).json({ message: 'User not found in our database.' });
    }

    if (author.role !== 'police') {
      
      return res.status(403).json({ message: 'Access denied. Only police users can create alerts.' });
    }

    const newAlert = new Alert({
      message: message,
      severity: severity,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude],
      },

      author: author._id,
    });
await newAlert.save();

    
    res.status(201).json({
      message: 'Alert created successfully!',
      alert: newAlert,
    });
  } catch (error) {

    console.error('Error creating alert:', error);
    res.status(500).json({ message: 'Server error while creating alert.' });
  }
};


const getAllAlerts = async (req, res) => {
  try {
    
    const alerts = await Alert.find({}).sort({ createdAt: -1 }).populate('author', 'name');

    
    res.status(200).json(alerts);
  } catch (error) {
    
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Server error while fetching alerts.' });
  }
};


module.exports = { createAlert, getAllAlerts };

