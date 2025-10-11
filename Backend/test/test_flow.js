const fetch = require('node-fetch');

async function run(){
  const completeRes = await fetch('http://localhost:3000/api/auth/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: '+15550001111', fullname: 'Flow User', address1: '1 Test St', district: 'D', state: 'S', pincode: '12345' })
  });
  const completeJson = await completeRes.json();
  console.log('complete:', completeJson);
  const token = completeJson.token;
  const meRes = await fetch('http://localhost:3000/api/users/me', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const meText = await meRes.text();
  console.log('me status:', meRes.status);
  console.log('me body:', meText);
}

run().catch(e => { console.error('test flow error', e); process.exit(1); });
