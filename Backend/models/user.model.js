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

    // --- Core User Details (optional at initial registration) ---
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
    
    // --- Geo-Location & Address Details (Fields previously included in JSON) ---
    district: { 
        type: String,
        trim: true
    },
    state: { // Added
        type: String,
        trim: true
    },
    pincode: { // Added
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
    address1: { // Added
        type: String,
        trim: true
    },
    village: { // Added
        type: String,
        trim: true // Making village optional
    },
    dob: { // Added
        type: Date,
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;