const SafePoint = require('../models/safePoint.model');

// ----------------------------------------------------------------------
// 1. ADD NEW SAFE POINT (POST /api/safe-points)
// ----------------------------------------------------------------------
exports.addSafePoint = async (req, res) => {
    try {
        const { name, type, capacity, foodAvailable, waterproof, latitude, longitude } = req.body;
        
        const user = req.user; // Full user object from JWT middleware
        const userId = user.id;
        const userDistrict = user.district; 
        
        const creatorName = user.fullname;
        const creatorPhoneNumber = user.phoneNumber;

        if (!latitude || !longitude) {
            return res.status(400).json({ msg: 'Location coordinates are required.' });
        }
        if (!userDistrict) {
            return res.status(400).json({ msg: 'User profile is incomplete. District is required to submit a Safe Point.' });
        }


        const newSafePoint = new SafePoint({
            createdBy: userId,
            // Embed creator data
            creatorName: creatorName,
            creatorPhoneNumber: creatorPhoneNumber,
            
            name,
            type,
            capacity,
            foodAvailable,
            waterproof,
            district: userDistrict,
            location: {
                type: 'Point',
                // GeoJSON format is [longitude, latitude]
                coordinates: [parseFloat(longitude), parseFloat(latitude)], 
            },
            isVerified: false, // Requires official review
        });

        await newSafePoint.save();

        res.status(201).json({ 
            message: 'Safe Point submitted for verification. Thank you for contributing to community safety!',
            point: newSafePoint
        });

    } catch (err) {
        console.error('Error adding safe point:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: `Validation Error: ${err.message}` });
        }
        res.status(500).send('Server Error while adding Safe Point.');
    }
};

// ----------------------------------------------------------------------
// 2. GET NEARBY SAFE POINTS (GET /api/safe-points/nearby)
// ----------------------------------------------------------------------
exports.getNearbySafePoints = async (req, res) => {
    try {
        // Get location from query parameters (default max distance is 10km)
        const { latitude, longitude, maxDistance = 10000 } = req.query; 

        if (!latitude || !longitude) {
            return res.status(400).json({ msg: 'Current location (latitude and longitude) is required to find nearby points.' });
        }

        // Use MongoDB's GeoJSON $near operator on the 2dsphere index
        const nearbyPoints = await SafePoint.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance) 
                }
            },
            isVerified: true // Only show verified points to the public
        }).limit(30)
          .select('-createdBy -__v'); // Exclude sensitive/unnecessary fields

        res.status(200).json({ 
            count: nearbyPoints.length,
            points: nearbyPoints
        });

    } catch (err) {
        console.error('Error fetching nearby safe points:', err);
        res.status(500).send('Server Error while fetching nearby Safe Points.');
    }
};

// ----------------------------------------------------------------------
// 3. GET UNVERIFIED POINTS (GET /api/safe-points/unverified)
// ----------------------------------------------------------------------
exports.getUnverifiedPoints = async (req, res) => {
    try {
        // Find all points awaiting review
        const unverifiedPoints = await SafePoint.find({ isVerified: false })
            .populate('createdBy', 'fullname phoneNumber district') // Show who submitted the point
            .limit(50); 
        
        res.status(200).json({ 
            count: unverifiedPoints.length,
            points: unverifiedPoints
        });

    } catch (err) {
        console.error('Error fetching unverified safe points:', err);
        res.status(500).send('Server Error while fetching unverified Safe Points.');
    }
};


// 🚨 FINAL CORRECTED EXPORT for use in the router
module.exports = {
    addSafePoint: exports.addSafePoint,
    getNearbySafePoints: exports.getNearbySafePoints,
    getUnverifiedPoints: exports.getUnverifiedPoints,
};