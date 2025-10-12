const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); 

const authMiddleware = async (req, res, next) => {
    // Accept Authorization header in a case-insensitive way and also allow a raw token in query for testing
    const authHeader = req.headers.authorization || req.headers.Authorization || req.query.token || '';

    if (!authHeader || (typeof authHeader === 'string' && authHeader.trim() === '')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or token format is invalid.' });
    }

    // Extract token: support 'Bearer <token>' or raw token
    let token = '';
    if (typeof authHeader === 'string' && authHeader.toLowerCase().startsWith('bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (typeof authHeader === 'string') {
        // Could be a raw token or contain surrounding quotes
        token = authHeader;
    } else {
        token = String(authHeader);
    }

    // Trim whitespace and surrounding quotes
    token = (token || '').trim().replace(/^"|"$/g, '');
    console.log('authMiddleware DEBUG: token_snippet=', token ? token.slice(0,40) + '...' : 'none');
    const secretSnip = process.env.JWT_SECRET ? (process.env.JWT_SECRET.length > 8 ? process.env.JWT_SECRET.slice(0,8) + '...' : process.env.JWT_SECRET) : 'none';
    console.log('authMiddleware DEBUG: JWT_SECRET_snippet=', secretSnip);
    // Write a short debug line to a file so it's easier to inspect from this environment
    try {
        const fs = require('fs');
        const debugLine = `[authDebug] ${new Date().toISOString()} authHeader=${String(authHeader).slice(0,60)} tokenLen=${token ? token.length : 'none'} secretLen=${process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 'none'}\n`;
        fs.appendFileSync(require('path').join(__dirname, '..', 'auth_debug.log'), debugLine);
    } catch (e) {
        console.error('Failed to write auth debug file:', e && e.message ? e.message : e);
    }

    try {
        // Try verifying with the raw secret first, then with a trimmed-quote variant.
        let decoded;
        // First attempt: verify as-is with the environment secret
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('authMiddleware: token verified with raw JWT_SECRET');
        } catch (e1) {
            // Second attempt: sometimes the secret may contain surrounding quotes from .env parsing
            const altSecret = (process.env.JWT_SECRET || '').replace(/^"|"$/g, '');
            try {
                decoded = jwt.verify(token, altSecret);
                console.log('authMiddleware: token verified with trimmed JWT_SECRET');
            } catch (e2) {
                // Third attempt: token itself may have surrounding quotes (some clients shell-escape headers)
                const altToken = (token || '').replace(/^"|"$/g, '');
                try {
                    decoded = jwt.verify(altToken, process.env.JWT_SECRET);
                    console.log('authMiddleware: token verified after trimming token quotes');
                } catch (e3) {
                    console.error('authMiddleware: jwt.verify failed for all attempts', e1.message, e2.message, e3.message);
                    throw e3;
                }
            }
        }

        const userId = decoded.id; 
        
        if (!userId) {
             return res.status(401).json({ message: 'Unauthorized: Token payload is missing user ID.' });
        }
        
        const user = await User.findById(userId).select('-phoneOtp -phoneOtpExpires');

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found in database.' });
        }
        
        // User object is attached to the request
        req.user = user;

        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error.message);
        
        if (error.name === 'TokenExpiredError') {
             return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
        }
        res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

module.exports = authMiddleware;