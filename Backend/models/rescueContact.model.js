const mongoose = require('mongoose');

const rescueContactSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    enum: ['SDRF', 'NDRF', 'Police', 'Fire', 'Medical'],
  },
  contactPerson: {
    type: String, 
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const RescueContact = mongoose.model('RescueContact', rescueContactSchema);
module.exports = RescueContact;
