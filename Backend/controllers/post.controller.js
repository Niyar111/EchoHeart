
const Post = require('../models/post.model');
const User = require('../models/user.model');

const createPost = async (req, res) => {
  try {
    
    const { uid } = req.user;
    
    const { caption } = req.body;
    
    const imageUrl = req.file?.path;

    
    if (!imageUrl) {
      return res.status(400).json({ message: 'An image file is required to create a post.' });
    }

   
    const author = await User.findOne({ uid: uid });
    if (!author) {
      return res.status(404).json({ message: 'Author not found in our database.' });
    }

    
    const newPost = new Post({
      imageUrl: imageUrl,
      caption: caption,
      
      author: author._id,
    });

   
    await newPost.save();

    
    res.status(201).json({
      message: 'Post created successfully!',
      post: newPost,
    });
  } catch (error) {
    
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
};


const getAllPosts = async (req, res) => {
  try {
    
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate('author', 'name');

    
    res.status(200).json(posts);
  } catch (error) {
    
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
};


module.exports = { createPost, getAllPosts };

