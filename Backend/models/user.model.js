const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  village: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String, 
    required: true,
    trim: true,
  },
  
  isTouristGuide: {
    type: Boolean,
    default: false,
  },
}, {
  
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
