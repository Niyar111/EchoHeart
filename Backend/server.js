
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');




dotenv.config();

// --- REMOVED: Firebase Admin SDK Initialization ---
/*
// All this code block is removed as it's no longer used for Auth or general API features
try {
    const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
    const serviceAccount = require(serviceAccountPath);

    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('Firebase Admin SDK initialized successfully.');
    }
} catch (error) {
    console.warn('Warning: serviceAccountKey.json not found. Firebase features may be limited.');
}
*/

// --- Database Connection ---
connectDB(); // Assuming this connects Mongoose

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Essential for parsing JSON request bodies

// --- Route Imports (Keep these, they define your API endpoints) ---
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const sosRoutes = require('./routes/sos.routes');
const businessRoutes = require('./routes/business.routes');
const userRoutes = require('./routes/user.routes');
const notificationRoutes = require('./routes/notification.routes'); 
const rescueRoutes = require('./routes/rescue.routes'); // <-- Recommend adding a route for your SDRF/NDRF contacts

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rescue', rescueRoutes); // <-- Added recommended route

// --- Server Definition ---
const PORT = 3000;

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});