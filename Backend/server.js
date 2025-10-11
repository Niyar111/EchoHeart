const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// --- Database Connection ---
connectDB(); // Assuming this connects Mongoose

// --- App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Essential for parsing JSON request bodies

// --- Route Imports (All files needed for the app) ---
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const sosRoutes = require('./routes/sos.routes');
const businessRoutes = require('./routes/business.routes');
const userRoutes = require('./routes/user.routes');
const notificationRoutes = require('./routes/notification.routes'); 
const rescueRoutes = require('./routes/rescue.routes'); 
const safePointRoutes = require('./routes/safePoint.routes'); 
const debugController = require('./controllers/debug.controller');

// --- API Routes (Mounting the routers) ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rescue', rescueRoutes); 
app.use('/api/safe-points', safePointRoutes); // <-- NEW MOUNT POINT

// Debug route (temporary) to inspect incoming headers
app.get('/api/debug/headers', debugController.headers);

// --- Server Definition ---
const PORT = 3000;

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});