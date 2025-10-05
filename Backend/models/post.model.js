const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Post description is required'],
  },
  category: {
    type: String,
    required: true,
    
    enum: ['art&craft', 'community-events', 'folklore'],
  },
  imageUrl: {
    type: String,
    required: true,
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
