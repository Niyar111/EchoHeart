const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // --- BILINGUAL FIELDS (CRITICAL CHANGE) ---
    // The controller will save the original text to one field and the translation draft to the other.
    title: {
        en: { type: String, required: true, trim: true }, // English Title (Required to exist)
        as: { type: String, required: false, trim: true }, // Assamese Translation (Draft)
    },
    description: {
        en: { type: String, required: true, trim: true }, // English Description (Required to exist)
        as: { type: String, required: false, trim: true }, // Assamese Translation (Draft)
    },
    
    // --- Post Context ---
    category: {
        type: String,
        required: true,
        enum: ['art&craft', 'community-events', 'folklore', 'tourist-places', 'unique-food', 'local-items'],
    },
    originalLanguage: { // New field to track the language the user originally posted in
        type: String,
        enum: ['en', 'as'],
        required: true,
    },

    // --- Media & Author ---
    imageUrl: {
        type: String,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    hasBusiness: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;