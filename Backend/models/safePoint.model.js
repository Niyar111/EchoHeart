const mongoose = require('mongoose');

const safePointSchema = new mongoose.Schema({
    // --- Creator Link (For moderation) ---
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Enhancement: Embed essential creator info for easier moderation lookups
    creatorName: { type: String, trim: true },
    creatorPhoneNumber: { type: String, trim: true }, 

    // --- 2. Location Data ---
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            default: 'Point',
        },
        coordinates: { // Stored as [longitude, latitude]
            type: [Number],
            required: true,
            index: '2dsphere', // Critical for nearby searches
        },
    },

    // --- 3. Descriptive Data ---
    name: {
        type: String,
        required: [true, 'Safe Point name is required.'],
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Public Hall', 'School', 'Open Ground', 'Relative Home', 'Self Home', 'Other'],
    },
    district: {
        type: String,
        required: true,
        trim: true,
    },
    
    // --- 4. Verification & Status Tags ---
    capacity: { type: Number, default: 0 },
    foodAvailable: { type: Boolean, default: false },
    waterproof: { type: Boolean, default: false },
    
    isVerified: {
        type: Boolean,
        default: false, // Requires official review
    },
}, {
    timestamps: true,
});

// Create a compound index for fast queries by district and location
safePointSchema.index({ district: 1, location: '2dsphere' });

const SafePoint = mongoose.model('SafePoint', safePointSchema);
module.exports = SafePoint;