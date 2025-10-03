// --- Imports ---
// This brings in Mongoose, the library we use to create schemas and interact with MongoDB.
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring Schema from mongoose for cleaner code.

// --- Schema Definition ---
// A schema is the blueprint for our data. It defines the fields, types, and rules.
const userSchema = new Schema(
  {
    // This is the most important field. It stores the unique ID from Firebase.
    // We will use this to link our MongoDB user profile to the Firebase authenticated user.
    uid: {
      type: String,
      required: true, // Every user MUST have a Firebase UID.
      unique: true,   // Every UID must be unique in our database.
    },
    // The user's full name. We get this from Firebase during the first sign-in.
    name: {
      type: String,
      required: true,
      trim: true, // Removes any extra spaces from the beginning or end.
    },
    // The user's email address, also from Firebase.
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // This is a critical field for your app's logic.
    // It defines the user's permissions. By default, everyone is a 'civilian'.
    // A super-admin would manually change this to 'police' in the database.
    role: {
      type: String,
      enum: ['civilian', 'police'], // The role can only be one of these two values.
      default: 'civilian',         // New users are automatically assigned the 'civilian' role.
    },
  },
  {
    // --- Timestamps ---
    // This option automatically adds `createdAt` and `updatedAt` fields to our documents.
    // This is very useful for tracking when a user was created or last updated.
    timestamps: true,
  }
);

// --- Model Creation ---
// We create a Mongoose model from our schema. A model is a constructor that
// allows us to create, read, update, and delete documents in the 'User' collection.
const User = mongoose.model('User', userSchema);

// --- Export ---
// We export the User model so our controllers can use it to interact with the database.
module.exports = User;

