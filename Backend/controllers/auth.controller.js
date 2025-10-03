
const User = require('../models/user.model');


const registerUser = async (req, res) => {
  try {
    
    const { uid, email, name } = req.user;

    const existingUser = await User.findOne({ uid: uid });

    if (existingUser) {
      
      return res.status(200).json({
        message: 'Welcome back! User already exists.',
        user: existingUser,
      });
    }

    const newUser = new User({
      uid: uid,
      name: name,
      email: email,
      
    });

    
    const savedUser = await newUser.save();
    
    res.status(201).json({
      message: 'User registered successfully in our database!',
      user: savedUser,
    });
  } catch (error) {
    
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Server error during user registration.' });
  }
};


module.exports = { registerUser };

