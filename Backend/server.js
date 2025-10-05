
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


const path = require('path');

// --- NEW: Firebase Admin SDK Initialization ---
// It's a best practice to initialize this at the top.
const admin = require('firebase-admin');

// Create a reliable path to your service account key
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath)
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.warn('Warning: serviceAccountKey.json not found or invalid. Firebase Admin SDK not initialized.');
  
}


// --- Configuration ---
dotenv.config();

// --- Database Connection ---
connectDB();

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Route Imports ---
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const alertRoutes = require('./routes/alert.routes');
const emergencyRoutes = require('./routes/emergency.routes');

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/emergency', emergencyRoutes);


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
