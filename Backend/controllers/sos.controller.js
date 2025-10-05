const Sos = require('../models/sos.model');

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


exports.getAllSos = async (req, res) => {
    try {
        const alerts = await Sos.find().populate('triggeredBy', ['fullname', 'village']);
        res.json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
