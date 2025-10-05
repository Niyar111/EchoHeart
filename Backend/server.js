
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const admin = require('firebase-admin');

dotenv.config();

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
const sosRoutes = require('./routes/sos.routes');
const businessRoutes = require('./routes/business.routes');
const userRoutes = require('./routes/user.routes'); // <-- THIS LINE IS NEW

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

