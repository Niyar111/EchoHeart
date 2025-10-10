const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// ----------------------------------------------------------------------
// Fix: Initialize client conditionally
// ----------------------------------------------------------------------
let client = null;
if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.warn('CRITICAL WARNING: Twilio credentials not fully configured. SMS feature will be disabled.');
} else {
    // Only initialize the client if all credentials are present
    client = twilio(accountSid, authToken);
}


/**
 * Sends an SMS message using the Twilio API.
 * @param {string} to - The recipient's phone number in E.164 format (e.g., '+919876543210').
 * @param {string} body - The text content of the SMS message.
 * @returns {Promise<object>} A promise that resolves with the Twilio message object on success.
 */
const sendSms = async (to, body) => {
    // 1. Check if the client was initialized (based on .env check)
    if (!client) {
        console.error(`SMS service disabled. Cannot send SMS to ${to}.`);
        // Instead of throwing an initialization error, throw a controlled error or return true
        // to allow the application flow to continue in case of missing credentials (dev environment).
        throw new Error('Twilio service is uninitialized due to missing credentials.');
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
        // Re-throw the error so the calling controller's catch block can handle it
        throw error; 
    }
};

module.exports = { sendSms };