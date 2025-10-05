const mongoose = require('mongoose');


const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const alertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    required: true,
    enum: ['flood', 'earthquake', 'landslide'],
  },
  message: {
    type: String,
    required: [true, 'Alert message is required'],
  },
  
  location: {
    type: pointSchema,
    required: true,
    
    index: '2dsphere',
  },
  
  triggeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
