const User = require('../models/user.model');

// ----------------------------------------------------------------------
// 1. GET CURRENT USER PROFILE (GET /api/users/me)
// ----------------------------------------------------------------------
exports.getCurrentUserProfile = async (req, res) => {
    // The user object is attached by authMiddleware and is already clean
    // (excluding password, OTP fields).
    res.json(req.user);
};

// ----------------------------------------------------------------------
// 2. UPDATE USER PROFILE (PUT /api/users/me)
// ----------------------------------------------------------------------
exports.updateUserProfile = async (req, res) => {
    try {
        // Find the user using the ID provided by authMiddleware
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Apply updates only if the corresponding field is provided in the request body
        user.fullname = req.body.fullname || user.fullname;
        // NOTE: The model doesn't have address2 or isTouristGuide in the schema you shared, 
        // but I've kept them here based on your provided code for safety.
        user.dob = req.body.dob || user.dob;
        user.address1 = req.body.address1 || user.address1;
        // user.address2 = req.body.address2 || user.address2; // If needed, add to model
        user.village = req.body.village || user.village;
        user.district = req.body.district || user.district;
        user.state = req.body.state || user.state;
        user.pincode = req.body.pincode || user.pincode;
        
        // This is a boolean field, so check if it was intentionally included
        // if (req.body.isTouristGuide !== undefined) { 
        //     user.isTouristGuide = req.body.isTouristGuide; 
        // }

        // Mongoose will run validation on save (e.g., pincode length, email format)
        const updatedUser = await user.save();
        
        // Return a clean user object (you might want to select specific fields here)
        res.json(updatedUser);
        
    } catch (err) {
        console.error('Update Profile Error:', err.message);
        // Handle Mongoose validation errors separately
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: `Validation Error: ${err.message}` });
        }
        res.status(500).send('Server Error');
    }
};

// ----------------------------------------------------------------------
// 3. UPDATE USER LOCATION (PUT /api/users/location) - NEW FEATURE
// ----------------------------------------------------------------------
exports.updateLocation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ msg: 'Latitude and longitude are required for location update.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                currentLocation: {
                    type: 'Point',
                    // GeoJSON format is [longitude, latitude]
                    coordinates: [parseFloat(longitude), parseFloat(latitude)],
                },
                'currentLocation.lastUpdated': Date.now(),
            },
            { new: true, runValidators: true, select: 'phoneNumber currentLocation' } // Return only relevant fields
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        res.status(200).json({ 
            message: 'Location updated successfully.', 
            location: updatedUser.currentLocation 
        });

    } catch (error) {
        console.error('Error updating user location:', error);
        res.status(500).send('Server Error during location update.');
    }
};


// Ensure we export the functions that were attached to `exports` above.
module.exports = {
    getCurrentUserProfile: exports.getCurrentUserProfile,
    updateUserProfile: exports.updateUserProfile,
    updateLocation: exports.updateLocation,
};