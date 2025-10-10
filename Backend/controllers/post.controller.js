const Post = require('../models/post.model');
const admin = require('firebase-admin');

// This function for creating posts is already correct.
exports.createPost = async (req, res) => {
  try {
    const { title, description, category, hasBusiness } = req.body;
    const uploader = req.user._id;
    let imageUrl = '';

    if (req.file) {
      const bucket = admin.storage().bucket();
      const filename = `${Date.now()}_${req.file.originalname}`;
      const fileUpload = bucket.file(filename);
      const blobStream = fileUpload.createWriteStream({ metadata: { contentType: req.file.mimetype } });
      
      blobStream.on('error', (error) => {
        console.error("Firebase Storage Error:", error);
        res.status(500).send('File upload failed.');
      });

      blobStream.on('finish', async () => {
        await fileUpload.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        await createAndSavePost(res, { title, description, category, hasBusiness, uploader, imageUrl });
      });
      blobStream.end(req.file.buffer);
    } else {
      await createAndSavePost(res, { title, description, category, hasBusiness, uploader, imageUrl });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

async function createAndSavePost(res, postData) {
    try {
        const newPost = new Post(postData);
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (dbError) {
        console.error(dbError.message);
        res.status(500).send('Server error while saving post.');
    }
}


// --- THIS IS THE FINAL, CORRECTED FUNCTION ---
// @desc    Get all posts and include the author's details
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    // This query does three things:
    // 1. .find({}): Gets all documents from the 'posts' collection.
    // 2. .sort({ createdAt: -1 }): Sorts them so the newest posts are first.
    // 3. .populate('uploader', 'fullname village'): This is the magic part. It looks at the
    //    'uploader' ID, finds the matching user in the 'users' collection, and
    //    attaches their 'fullname' and 'village' to the post data.
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('uploader', 'fullname village');
      
    // It then sends the complete, rich data back to Postman.
    res.json(posts);
  } catch (err) {
    console.error("Error in getAllPosts:", err.message);
    res.status(500).send('Server Error');
  }
};

