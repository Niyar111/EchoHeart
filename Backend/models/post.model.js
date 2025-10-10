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
    enum: ['art&craft', 'community-events', 'folklore', 'tourist-places', 'unique-food', 'local-items'],
  },
  imageUrl: {
    type: String,
  },
  // This is the critical link to the author of the post.
  // It must have a 'ref' that exactly matches the User model name.
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This tells Mongoose to look in the 'users' collection
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

