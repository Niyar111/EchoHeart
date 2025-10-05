const Business = require('../models/business.model');

exports.createBusiness = async (req, res) => {
  try {
    const { businessName, description, category, imageUrl } = req.body;
    
    const owner = req.user._id; 

    const newBusiness = new Business({
      businessName,
      description,
      category,
      imageUrl,
      owner, 
    });

    const business = await newBusiness.save();
    
    res.status(201).json(business);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllBusinesses = async (req, res) => {
    try {
        
        const businesses = await Business.find().populate('owner', ['fullname', 'village']);
        
        res.json(businesses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

