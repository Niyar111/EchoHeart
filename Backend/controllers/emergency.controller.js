
const User = require('../models/user.model');

const triggerSOS = async (req, res) => {
  try {
    
    const { uid } = req.user;

    
    const user = await User.findOne({ uid: uid });

    const userName = user ? user.name : uid;
    console.log(`\n🚨 --- SOS SIGNAL RECEIVED --- 🚨`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`User: ${userName} (UID: ${uid})`);
    console.log(`-------------------------------\n`);

    res.status(200).json({ message: 'SOS signal received. Help is on the way.' });
  } catch (error) {
    
    console.error('Error triggering SOS:', error);
    res.status(500).json({ message: 'Server error while triggering SOS.' });
  }
};


module.exports = { triggerSOS };

