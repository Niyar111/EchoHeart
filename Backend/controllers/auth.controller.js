const User = require('../models/user.model');
const { sendSms } = require('../Services/sms.service'); // Your Twilio service
const jwt = require('jsonwebtoken');

// Utility function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ----------------------------------------------------------------------
// 1. REGISTER - Phone-only: create minimal user record (if absent) and send OTP
// ----------------------------------------------------------------------
exports.register = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ msg: 'Phone number is required to start registration.' });
        }

        // Find existing user
        let user = await User.findOne({ phoneNumber });
        if (user) {
            if (user.isPhoneVerified) {
                return res.status(400).json({ msg: 'Phone already registered and verified. Please login.' });
            }
            // If exists but not verified, we'll resend OTP
        } else {
            // Create a minimal user record (profile fields optional)
            user = new User({ phoneNumber });
        }

        // Generate and save OTP
        const otp = generateOTP();
        const phoneOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

        user.phoneOtp = otp;
        user.phoneOtpExpires = phoneOtpExpires;
        user.isPhoneVerified = false;
        await user.save();

    // Log OTP to console for testing and send via SMS if configured
    console.log(`[OTP] (register) Phone: ${user.phoneNumber} | OTP: ${otp}`);
    await sendSms(user.phoneNumber, `[EchoHeart] Your verification code is: ${otp}. It expires in 10 minutes.`);

        res.status(200).json({ success: true, message: 'OTP sent. Verify the phone number using /api/auth/verify' });

    } catch (err) {
        console.error('Registration Error:', err);
        if (err && err.code === 11000) {
            // Duplicate key error (could be from unique indexes like firebaseUid)
            return res.status(400).json({ msg: 'Registration failed: duplicate key detected. Please contact support or try a different phone number.' });
        }
        res.status(500).send('Server Error during registration.');
    }
};

// ----------------------------------------------------------------------
// 2. REQUEST LOGIN OTP - For Existing, Verified Users
// ----------------------------------------------------------------------
exports.requestLoginOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // 1. Find the user
        let user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ msg: 'User not found. Please register first.' });
        }
        
        if (!user.isPhoneVerified) {
            return res.status(400).json({ msg: 'User registration not complete. Please verify your phone number via OTP first.' });
        }

        // 2. Generate and store new OTP for login
        const otp = generateOTP();
        const phoneOtpExpires = Date.now() + 5 * 60 * 1000; 

        user.phoneOtp = otp;
        user.phoneOtpExpires = phoneOtpExpires;
        await user.save();

    // 3. Log OTP to console for testing and Send the OTP via SMS
    console.log(`[OTP] (login) Phone: ${user.phoneNumber} | OTP: ${otp}`);
    await sendSms(user.phoneNumber, `[EchoHeart] Your login code is: ${otp}. It expires in 5 minutes.`);

        res.status(200).json({ 
            success: true, 
            message: 'Login OTP sent successfully. Proceed to verification.' 
        });

    } catch (err) {
        console.error('Login OTP Request Error:', err); // Log the full error object
        res.status(500).send('Server Error during login OTP request.');
    }
};

// ----------------------------------------------------------------------
// 3. VERIFY OTP - Final Step for both Registration and Login
// ----------------------------------------------------------------------
exports.verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        // 1. Find user and check OTP expiry
        const user = await User.findOne({ 
            phoneNumber: phoneNumber,
            phoneOtpExpires: { $gt: Date.now() }
        }).select('+phoneOtp');

        // 2. Validation Check
        if (!user || user.phoneOtp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP or the OTP has expired. Please request a new OTP.' });
        }

        // 3. OTP is Valid: mark as verified and clear OTP fields
        user.isPhoneVerified = true;
        user.phoneOtp = undefined;
        user.phoneOtpExpires = undefined;
        await user.save();

        // Decide whether to issue JWT now (login) or ask client to complete profile (registration)
        const profileComplete = Boolean(user.fullname && String(user.fullname).trim().length > 0);

        if (profileComplete) {
            // Issue JWT (this covers both login and verified existing users)
            const payload = { id: user.id, role: user.role };
            const token = await new Promise((resolve, reject) => {
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            return res.json({ 
                token,
                message: 'Verification successful. User logged in.',
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    district: user.district
                }
            });
        }

        // If profile is incomplete, instruct the client to finish registration
        return res.json({ message: 'Phone verified successfully. Now submit profile details at /api/auth/complete' });

    } catch (err) {
        console.error('Verification Error:', err); // Log the full error object
        res.status(500).send('Server Error during verification and login.');
    }
};

// ----------------------------------------------------------------------
// 4. COMPLETE REGISTRATION - after phone verification, submit profile and receive JWT
// ----------------------------------------------------------------------
exports.completeRegistration = async (req, res) => {
    try {
        const { phoneNumber, fullname, email, dob, address1, district, state, pincode, village } = req.body;

        if (!phoneNumber) return res.status(400).json({ msg: 'Phone number is required.' });

        const user = await User.findOne({ phoneNumber });
        if (!user) return res.status(404).json({ msg: 'User not found. Start registration first.' });
        if (!user.isPhoneVerified) return res.status(400).json({ msg: 'Phone not verified. Verify the phone first.' });

        // Basic validation: require core profile fields before completing registration
        const required = { fullname, address1, district, state, pincode };
        const missing = Object.keys(required).filter(k => !required[k] || String(required[k]).trim() === '');
        if (missing.length) {
            return res.status(400).json({ msg: `Missing required fields: ${missing.join(', ')}` });
        }

        // Update profile fields
        user.fullname = fullname;
        user.email = email || user.email;
        user.dob = dob || user.dob;
        user.address1 = address1;
        user.district = district;
        user.state = state;
        user.pincode = pincode;
        user.village = village || user.village;

        await user.save();

        // Issue JWT
        const payload = { id: user.id, role: user.role };
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.json({ token, message: 'Registration complete.', user: { id: user.id, fullname: user.fullname, phoneNumber: user.phoneNumber } });

    } catch (err) {
        console.error('Complete Registration Error:', err);
        res.status(500).send('Server Error while completing registration.');
    }
};