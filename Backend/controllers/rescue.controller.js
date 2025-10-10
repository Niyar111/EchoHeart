const RescueContact = require('../models/rescueContact.model'); // Your Mongoose model
const { validationResult } = require('express-validator'); // Useful for future request body validation

// ----------------------------------------------------------------------
// 1. Add New Rescue Contact (POST /api/rescue/add)
// ----------------------------------------------------------------------
exports.addContact = async (req, res) => {
    // Note: Validation should be done in the route/middleware before this.
    // Assuming req.user is available from authMiddleware
    try {
        const { organizationName, contactPerson, phoneNumber, district } = req.body;

        // 1. Check if the contact already exists (e.g., by phone number)
        let existingContact = await RescueContact.findOne({ phoneNumber });
        if (existingContact) {
            return res.status(400).json({ msg: 'A rescue contact with this phone number already exists.' });
        }

        // 2. Create the new contact document
        const newContact = new RescueContact({
            organizationName,
            contactPerson,
            phoneNumber,
            district,
            // isActive defaults to true as per the model
        });

        // 3. Save the contact to the database
        await newContact.save();

        res.status(201).json({ 
            msg: 'Rescue organization contact added successfully.', 
            contact: newContact 
        });

    } catch (err) {
        console.error('Error adding rescue contact:', err.message);
        res.status(500).send('Server Error while adding contact.');
    }
};

// ----------------------------------------------------------------------
// 2. Get All Active Rescue Contacts (GET /api/rescue/all)
// ----------------------------------------------------------------------
exports.getAllContacts = async (req, res) => {
    try {
        // Find all contacts that are marked as active
        const contacts = await RescueContact.find({ isActive: true })
            .select('-createdAt -updatedAt'); // Exclude unnecessary metadata

        res.json({ 
            count: contacts.length, 
            contacts 
        });

    } catch (err) {
        console.error('Error fetching all contacts:', err.message);
        res.status(500).send('Server Error while fetching contacts.');
    }
};

// ----------------------------------------------------------------------
// 3. Get Contacts by District (GET /api/rescue/:district)
// ----------------------------------------------------------------------
exports.getContactsByDistrict = async (req, res) => {
    try {
        const districtName = req.params.district;

        // Find active contacts matching the district name (case-insensitive search)
        const contacts = await RescueContact.find({ 
            district: { $regex: new RegExp(districtName, 'i') },
            isActive: true 
        });

        if (contacts.length === 0) {
            return res.status(404).json({ msg: `No active rescue contacts found for district: ${districtName}` });
        }

        res.json({ 
            district: districtName,
            count: contacts.length, 
            contacts 
        });

    } catch (err) {
        console.error('Error fetching contacts by district:', err.message);
        res.status(500).send('Server Error while fetching district contacts.');
    }
};

// ----------------------------------------------------------------------
// 4. Update Rescue Contact (PUT /api/rescue/:id)
// ----------------------------------------------------------------------
exports.updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const updates = req.body;

        const updatedContact = await RescueContact.findByIdAndUpdate(
            contactId,
            { $set: updates }, // Apply all updates from req.body
            { new: true, runValidators: true } // Return the updated document and run Mongoose schema validators
        );

        if (!updatedContact) {
            return res.status(404).json({ msg: 'Rescue contact not found.' });
        }

        res.json({ 
            msg: 'Rescue contact updated successfully.', 
            contact: updatedContact 
        });

    } catch (err) {
        console.error('Error updating contact:', err.message);
        res.status(500).send('Server Error while updating contact.');
    }
};

// ----------------------------------------------------------------------
// 5. Deactivate Rescue Contact (DELETE /api/rescue/:id)
// ----------------------------------------------------------------------
exports.deactivateContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        // Perform a soft delete by setting isActive to false
        const deactivatedContact = await RescueContact.findByIdAndUpdate(
            contactId,
            { $set: { isActive: false } },
            { new: true }
        );

        if (!deactivatedContact) {
            return res.status(404).json({ msg: 'Rescue contact not found.' });
        }

        res.json({ 
            msg: `Rescue contact for ${deactivatedContact.organizationName} deactivated successfully.`,
            contact: deactivatedContact
        });

    } catch (err) {
        console.error('Error deactivating contact:', err.message);
        res.status(500).send('Server Error during contact deactivation.');
    }
};