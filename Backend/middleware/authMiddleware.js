const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or token format is invalid.' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.user.id;

        const user = await User.findById(userId).select('-phoneOtp -phoneOtpExpires'); // Exclude OTP fields

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found in database.' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error.message);
        // Handle common errors like token expiry or invalid signature
        if (error.name === 'TokenExpiredError') {
             return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
        }
        res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

module.exports = authMiddleware;