require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'test' });
    console.log('Connected to MongoDB for check.');
    const phone = '+15550001111';
    const user = await User.findOne({ phoneNumber: phone }).lean();
    if (!user) {
      console.log('User not found for phone', phone);
    } else {
      console.log('Found user:', user);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error in check script:', err);
    process.exit(1);
  }
}

main();
