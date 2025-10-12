const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'], 
    required: true,
  },
  coordinates: {
    type: [Number], 
    required: true,
  },
});

const sosSchema = new mongoose.Schema({
  sosType: {
    type: String,
    required: true,
    enum: ['area', 'security'],
  },
  alertType: {
    type: String,
    required: true,
    enum: ['flood', 'earthquake', 'landslide','personal-saftey'],
  },
  message: {
    type: String,
    required: [true, 'An alert message is required'],
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
  isEmergency: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false, 
  },
}, {
  
  timestamps: true,
});

const Sos = mongoose.model('Sos', sosSchema);

module.exports = Sos;

