const Post = require('../models/post.model'); // Renamed from Blog model
const { translateToAssamese } = require('../utils/translation.utils'); // NEW: Import the translation utility
// NOTE: Firebase Admin import is REMOVED as we are focusing on JWT/Mongoose/GCP Translation

// --- Helper function to create and save the post (now including translation) ---
async function createAndSavePost(res, postData) {
    try {
        const { title, description, uploader, category, hasBusiness, imageUrl } = postData;

        // 1. Asynchronously generate the Assamese draft translation
        // Use Promise.all to handle both translations concurrently
        const [translatedTitle, translatedDescription] = await Promise.all([
            translateToAssamese(title),
            translateToAssamese(description)
        ]);

        // 2. Structure the data using the bilingual schema
        const newPost = new Post({
            uploader: uploader,
            category: category,
            hasBusiness: hasBusiness,
            imageUrl: imageUrl, // Assumes image URL is handled before this function, or is null

            // Apply bilingual structure
            title: {
                en: title,
                as: translatedTitle, // Machine-generated Assamese draft
            },
            description: {
                en: description,
                as: translatedDescription, // Machine-generated Assamese draft
            },
        });

        const post = await newPost.save();
        
        res.status(201).json({
            message: 'Post created and Assamese translation draft initiated.',
            post: post
        });

    } catch (dbError) {
        console.error('Server error while saving post:', dbError);
        // Handle validation errors or duplicate keys specific to the Post model
        res.status(500).send('Server error while saving post.');
    }
}


// ----------------------------------------------------------------------
// 1. CREATE POST (POST /api/posts) - Updated for Bilingual Logic
// ----------------------------------------------------------------------
exports.createPost = async (req, res) => {
    try {
        // Collect data from body and uploader ID from middleware
        const { title, description, category, hasBusiness } = req.body;
        const uploader = req.user.id; // Correctly using Mongoose ID from authMiddleware
        
        // NOTE: File upload logic (req.file) is complex and has been removed 
        // to focus on the hackathon priority: translation and data structure.
        // Assuming imageUrl is handled externally or not required for V1.
        const imageUrl = req.body.imageUrl || ''; 

        // Check for required fields before proceeding to complex translation/DB logic
        if (!title || !description) {
            return res.status(400).json({ msg: 'Title and description are required for a post.' });
        }
        
        // Pass the data directly to the helper function to handle translation and save
        await createAndSavePost(res, { title, description, category, hasBusiness, uploader, imageUrl });

    } catch (err) {
        console.error('Create Post Error:', err.message);
        res.status(500).send('Server Error during post creation.');
    }
};


// ----------------------------------------------------------------------
// 2. GET ALL POSTS (GET /api/posts) - Correct and Final
// ----------------------------------------------------------------------
exports.getAllPosts = async (req, res) => {
    try {
        // Fetches posts and populates the uploader's basic details (fullname, village)
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('uploader', 'fullname village');
            
        res.json(posts);
        
    } catch (err) {
        console.error("Error in getAllPosts:", err.message);
        res.status(500).send('Server Error');
    }
};