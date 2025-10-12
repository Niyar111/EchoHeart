require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = process.argv[2];
if(!token){
  console.error('Usage: node verify_token.js <token>');
  process.exit(2);
}

try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Verified. Decoded payload:', decoded);
}catch(err){
  console.error('Verify error:', err && err.name ? `${err.name}: ${err.message}` : String(err));
  process.exit(1);
}
