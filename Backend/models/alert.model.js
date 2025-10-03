// --- Imports ---
const mongoose = require('mongoose');
const { Schema } = mongoose;

// --- Schema Definition ---
// This blueprint defines the structure for each alert document.
const alertSchema = new Schema(
  {
    // The main content of the alert message.
    message: {
      type: String,
      required: true, // Every alert must have a message.
      trim: true,
    },
    // A severity level to help the frontend display the alert appropriately (e.g., with different colors).
    severity: {
      type: String,
      enum: ['High', 'Medium', 'Low'], // Can only be one of these values.
      default: 'Medium',
    },
    // --- The Link to the Police User ---
    // This creates a relationship to the user who created the alert.
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',      // The ID must belong to a document in the 'User' collection.
      required: true, // Every alert must have an author.
    },
  },
  {
    // --- Timestamps ---
    // Automatically adds `createdAt` and `updatedAt` fields.
    timestamps: true,
  }
);

// --- Model Creation ---
// We create the 'Alert' model from our schema.
const Alert = mongoose.model('Alert', alertSchema);

// --- Export ---
// We export the Alert model for our controllers to use.
module.exports = Alert;

