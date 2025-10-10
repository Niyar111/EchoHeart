const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    
    const {
      firebaseUid,
      fullname,
      email,
      phoneNumber,       
      isPhoneVerified,  
      dob,
      address1,
      address2,
      village,
      district,
      state,
      pincode,
      isTouristGuide,
    } = req.body;

    let user = await User.findOne({ $or: [{ firebaseUid }, { phoneNumber }] });

    if (user) {
      return res.status(400).json({ msg: 'User with this ID or phone number already exists' });
    }

    // Create a new user instance with all the data
    user = new User({
      firebaseUid,
      fullname,
      email,
      phoneNumber,       
      isPhoneVerified,   
      dob,
      address1,
      address2,
      village,
      district,
      state,
      pincode,
      isTouristGuide,
    });

    
    await user.save();

    
    res.status(201).json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    try {
        const { firebaseUid } = req.body;
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({ msg: 'User not found in our database. Please register.' });
        }

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

