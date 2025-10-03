// --- Imports ---
const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Schema Definition ---
// This blueprint defines the structure for each post document in our database.
const postSchema = new Schema(
  {
    // This field will store the URL or path to the uploaded image.
    imageUrl: {
      type: String,
      required: true, // Every post must have an image.
    },
    // This is an optional field for a short caption or description.
    caption: {
      type: String,
      trim: true, // Removes extra whitespace.
      default: '', // Defaults to an empty string if not provided.
    },
    // --- The Link to the User ---
    // This is a crucial field that creates a relationship between this Post and a User.
    author: {
      type: Schema.Types.ObjectId, // This special type stores a MongoDB document ID.
      ref: 'User',                 // This tells Mongoose that the ID belongs to a document in the 'User' collection.
      required: true,              // Every post must have an author.
    },
  },
  {
    // --- Timestamps ---
    // This automatically adds `createdAt` and `updatedAt` fields.
    // Useful for sorting the feed chronologically.
    timestamps: true,
  }
);

// --- Model Creation ---
// We create the 'Post' model from our schema.
const Post = mongoose.model('Post', postSchema);

// --- Export ---
// We export the Post model so our controllers can use it.
module.exports = Post;

