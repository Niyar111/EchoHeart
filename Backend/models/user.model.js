const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // --- Authentication & Verification ---
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true,
    },
    phoneOtp: { type: String, select: false },
    phoneOtpExpires: { type: Date, select: false },
    isPhoneVerified: { type: Boolean, default: false },

    // --- Core Profile Details ---
    fullname: { 
        type: String, 
        trim: true 
    },
    email: { 
        type: String, 
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'organization'], 
        default: 'user' 
    },
    
    // --- Geo-Location & Address Details ---
    district: { 
        type: String,
        trim: true
    },
    state: { 
        type: String,
        trim: true
    },
    pincode: { 
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true; // allow empty during initial registration
                return v.length >= 5 && v.length <= 6; // Basic length check for pincode
            },
            message: props => `${props.value} is not a valid Pincode length!`
        }
    },
    address1: { 
        type: String,
        trim: true
    },
    village: { 
        type: String,
        trim: true
    },
    dob: { 
        type: Date,
    },
    
    // 🚨 NEW FEATURE: User's Current Live Location for SOS and Mapping
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON type
            default: 'Point',
        },
        // Stored as [longitude, latitude]. Mongoose recommends this order.
        coordinates: { 
            type: [Number],
            index: '2dsphere', // Critical for fast geospatial queries (e.g., finding nearby users)
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        }
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User; 
 