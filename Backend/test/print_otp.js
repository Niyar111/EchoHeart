require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

async function main(){
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    const phone = '+15550001111';
    const user = await User.findOne({ phoneNumber: phone }).select('+phoneOtp phoneOtpExpires').lean();
    if(!user){
      console.log(JSON.stringify({ error: 'not_found' }));
    } else {
      console.log(JSON.stringify({ otp: user.phoneOtp, expires: user.phoneOtpExpires }));
    }
    await mongoose.disconnect();
  }catch(err){
    console.error(JSON.stringify({ error: err && err.message ? err.message : String(err) }));
    process.exit(1);
  }
}
main();
