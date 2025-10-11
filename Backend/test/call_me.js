require('dotenv').config();
const http = require('http');

const token = process.argv[2];
if (!token) {
  console.error('Usage: node call_me.js <token>');
  process.exit(2);
}

(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error('Request error:', err);
    process.exit(1);
  }
})();
