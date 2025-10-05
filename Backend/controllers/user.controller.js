const User = require('../models/user.model');

exports.getCurrentUserProfile = async (req, res) => {
  
  res.json(req.user);
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      
      user.fullname = req.body.fullname || user.fullname;
      user.dob = req.body.dob || user.dob;
      user.address1 = req.body.address1 || user.address1;
      user.address2 = req.body.address2 || user.address2; 
      user.village = req.body.village || user.village;
      user.district = req.body.district || user.district;
      user.state = req.body.state || user.state;
      user.pincode = req.body.pincode || user.pincode;

      if (req.body.isTouristGuide !== undefined) {
        user.isTouristGuide = req.body.isTouristGuide;
      }

      const updatedUser = await user.save();
      
      res.json(updatedUser);
      
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

