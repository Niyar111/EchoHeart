const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.warn('CRITICAL WARNING: Twilio credentials not found in .env file. SMS feature will be disabled.');
}

const client = twilio(accountSid, authToken);


/**
 * Sends an SMS message using the Twilio API.
 * This is an async function that returns a Promise.
 * @param {string} to - The recipient's phone number in E.164 format (e.g., '+919876543210').
 * @param {string} body - The text content of the SMS message.
 * @returns {Promise<object>} A promise that resolves with the Twilio message object on success.
 */
const sendSms = async (to, body) => {
  if (!client.accountSid) {
    throw new Error('Twilio client is not initialized. Please check your .env credentials.');
  }
  
  try {
    const message = await client.messages.create({
      body: body,
      from: twilioPhoneNumber,
      to: to,
    });
    console.log(`SMS sent successfully to ${to}. SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.message);
    throw error; 
  }
};

module.exports = { sendSms };
