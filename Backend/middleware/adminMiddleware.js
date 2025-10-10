
const adminMiddleware = (req, res, next) => {
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'organization')) {
    
    next();

  } else {
    
    res.status(403).json({ message: 'Forbidden: You do not have the required permissions for this action.' });
  }
};

module.exports = adminMiddleware;

