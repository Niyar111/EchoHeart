const User = require('../models/user.model');
const RescueContact = require('../models/rescueContact.model'); 
const { sendSms } = require('../Services/sms.service');          

const triggerSOS = async (req, res) => {
    try {
        const user = req.user; 
        
        if (!user || !user.isPhoneVerified) {
            return res.status(401).json({ message: 'User is not authenticated or verified.' });
        }

        const district = user.district;
        const alertMessage = 
            `🚨 LIVE SOS ALERT 🚨\nUser: ${user.fullname || 'Verified User'}\nPhone: ${user.phoneNumber}\nLocation: ${district}.\nIMMEDIATE ATTENTION REQUIRED.`;


        // 1. Find all active rescue contacts in the user's district
        const rescueContacts = await RescueContact.find({
            district: { $regex: new RegExp(district, 'i') },
            isActive: true
        }).select('phoneNumber organizationName');

        if (rescueContacts.length === 0) {
            console.warn(`No rescue organizations found for district: ${district}. SOS only logged.`);
            // Still return success, but alert the user that organizations might be unregistered
            return res.status(200).json({ 
                message: 'SOS signal logged. No registered rescue organizations found in your district.',
                status: 'logged' 
            });
        }
        
        // 2. Dispatch SMS to all found contacts
        const smsPromises = rescueContacts.map(contact => 
            sendSms(contact.phoneNumber, alertMessage)
                .then(() => console.log(`Notified ${contact.organizationName} at ${contact.phoneNumber}`))
                .catch(error => console.error(`Failed to notify ${contact.organizationName}: ${error.message}`))
        );

        // Wait for all SMS attempts to finish
        await Promise.allSettled(smsPromises);


        // 3. Final Response
        res.status(200).json({ 
            message: 'SOS signal processed. Rescue organizations have been notified.',
            organizationsNotified: rescueContacts.map(c => c.organizationName)
        });
        
    } catch (error) {
        console.error('Fatal Error triggering SOS:', error);
        res.status(500).json({ message: 'Server error while processing SOS.' });
    }
};

module.exports = { triggerSOS };