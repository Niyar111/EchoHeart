const Post = require('../models/post.model');
const admin = require('firebase-admin'); 

exports.createPost = async (req, res) => {
  try {
    const { title, description, category, hasBusiness } = req.body;
    const uploader = req.user._id; 
    let imageUrl = ''; 
    
    if (req.file) {
      
      const bucket = admin.storage().bucket();
      
      const filename = `${Date.now()}_${req.file.originalname}`;
      const fileUpload = bucket.file(filename);

      
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

  
      blobStream.on('error', (error) => {
        console.error("Firebase Storage Error:", error);
        return res.status(500).send('Something went wrong with the file upload.');
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
        console.error("Database Save Error:", dbError.message);
        res.status(500).send('Server error while saving the post.');
    }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('uploader', ['fullname', 'village']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

