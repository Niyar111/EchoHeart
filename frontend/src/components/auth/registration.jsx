import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { Phone, ArrowLeft, CheckCircle } from "lucide-react";

const API_BASE = "http://localhost:3000";

const emptyForm = (overrides = {}) => ({
    phoneNumber: "",
    fullname: "",
    email: "",
    dob: "",
    address1: "",
    address2: "",
    village: "",
    district: "",
    state: "",
    pincode: "",
    isTouristGuide: false,
    ...overrides,
});

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [step, setStep] = useState(1); // 1: Phone input, 2: OTP verification, 3: Registration form
    const [otp, setOtp] = useState("");
    const [form, setForm] = useState(emptyForm());
    const [countdown, setCountdown] = useState(0);

    // Countdown timer for OTP resend
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Validate phone number format
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    };

    // Send OTP to phone number
    const sendOTP = async () => {
        if (!form.phoneNumber) {
            setError("Please enter your phone number");
            return;
        }

        const cleanPhone = form.phoneNumber.replace(/\D/g, '');
        if (!validatePhoneNumber(cleanPhone)) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // First try to send OTP for new user registration
            let response = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: `+91${cleanPhone}`,
                }),
            });

            // If register fails with "already registered", try login endpoint
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (errorData.msg && errorData.msg.includes("already registered")) {
                    response = await fetch(`${API_BASE}/api/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            phoneNumber: `+91${cleanPhone}`,
                        }),
                    });
                }
            }

            if (response.ok) {
                setStep(2);
                setSuccess("OTP sent successfully to your phone number");
                setCountdown(30); // 30 seconds countdown
            } else {
                const errorData = await response.json().catch(() => ({ message: "Failed to send OTP" }));
                throw new Error(errorData.msg || errorData.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error("OTP sending error:", err);
            setError(`Failed to send OTP. Please try again. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const verifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Verify OTP via backend API - using the verify endpoint
            const response = await fetch(`${API_BASE}/api/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: `+91${form.phoneNumber.replace(/\D/g, '')}`,
                    otp: otp,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Check if user needs to complete profile or is already logged in
                if (data.token) {
                    // User is already registered and logged in
                    setSuccess("Login successful!");
                    // You can redirect to dashboard or store token here
                    console.log("User logged in:", data.user);
                } else {
                    // User needs to complete registration
                    setStep(3);
                    setSuccess("Phone number verified successfully! Please complete your profile.");
                }
            } else {
                const errorData = await response.json().catch(() => ({ message: "Invalid OTP" }));
                throw new Error(errorData.msg || errorData.message || "Invalid OTP");
            }
        } catch (err) {
            console.error("OTP verification error:", err);
            setError(`OTP verification failed. Please try again. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const resendOTP = async () => {
        if (countdown > 0) return;
        await sendOTP();
    };

    // Go back to previous step
    const goBack = () => {
        if (step === 2) {
            setStep(1);
            setOtp("");
        } else if (step === 3) {
            setStep(2);
        }
        setError("");
        setSuccess("");
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Prepare basic form data
            const base = {
                firebaseUid: user.uid,
                fullname: user.displayName || "",
                email: user.email || "",
            };

            // Ask backend if user exists
            const loginRes = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firebaseUid: user.uid }),
            });

            if (loginRes.status === 200) {
                const userData = await loginRes.json();
                console.log("User exists, logged in:", userData);
                // In a real app we'd store auth state and redirect. For now just show success.
                setForm(emptyForm());
                alert("Login successful");
            } else if (loginRes.status === 404) {
                // user not found — show registration form prefilled
                setForm(emptyForm(base));
            } else {
                const t = await loginRes.text();
                throw new Error(t || "Login check failed");
            }

        } catch (err) {
            console.error(err);
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const handleOTPChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtp(value);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setForm((f) => ({ ...f, phoneNumber: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Basic validation
            if (!form.phoneNumber || !form.fullname || !form.email || !form.dob) {
                setError("Please fill required fields: name, email, dob");
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_BASE}/api/auth/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    phoneNumber: `+91${form.phoneNumber.replace(/\D/g, '')}`,
                }),
            });

            if (res.status === 201) {
                const created = await res.json();
                console.log("Registered user:", created);
                setStep(1);
                setForm(emptyForm());
                setOtp("");
                alert("Registration successful");
            } else {
                const body = await res.json().catch(() => null) || await res.text();
                throw new Error(body.msg || body || `Register failed (${res.status})`);
            }

        } catch (err) {
            console.error(err);
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? "Get Started" : step === 2 ? "Verify Phone Number" : "Complete Registration"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1 ? "Enter your phone number to continue" :
                            step === 2 ? "Enter the OTP sent to your phone" :
                                "Fill in your details to complete registration"}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                    {[1, 2, 3].map((stepNum) => (
                        <div key={stepNum} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
                            </div>
                            {stepNum < 3 && (
                                <div className={`w-12 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Error and Success Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                        {success}
                    </div>
                )}

                {/* Step 1: Phone Number Input */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phoneNumber"
                                    type="tel"
                                    value={form.phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder="Enter your 10-digit phone number"
                                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={sendOTP}
                                disabled={loading || !form.phoneNumber}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>

                        {/* Debug Information */}
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
                            <p><strong>🔧 Development Mode:</strong></p>
                            <p>• Phone: +91{form.phoneNumber || 'Not entered'}</p>
                            <p>• Backend: {API_BASE}</p>
                            <p>• <strong>Check your backend console for the OTP!</strong></p>
                            <p>• SMS sending is disabled (Twilio auth error)</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">Or</p>
                            <button
                                onClick={signInWithGoogle}
                                disabled={loading}
                                className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                {loading ? "Please wait..." : "Continue with Google"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <button
                                onClick={goBack}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back
                            </button>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>
                            <div className="mt-1">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    value={otp}
                                    onChange={handleOTPChange}
                                    placeholder="Enter 6-digit OTP"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest"
                                    maxLength="6"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                OTP sent to +91 {form.phoneNumber}
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={verifyOTP}
                                disabled={loading || otp.length !== 6}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={resendOTP}
                                disabled={countdown > 0}
                                className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
                            >
                                {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Registration Form */}
                {step === 3 && (
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <button
                                onClick={goBack}
                                className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back
                            </button>
                        </div>

                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                                Full Name *
                            </label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={form.fullname}
                                onChange={handleChange}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth *
                            </label>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                value={form.dob}
                                onChange={handleChange}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="address1" className="block text-sm font-medium text-gray-700">
                                Address Line 1 *
                            </label>
                            <input
                                id="address1"
                                name="address1"
                                type="text"
                                value={form.address1}
                                onChange={handleChange}
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="address2" className="block text-sm font-medium text-gray-700">
                                Address Line 2
                            </label>
                            <input
                                id="address2"
                                name="address2"
                                type="text"
                                value={form.address2}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                                    Village *
                                </label>
                                <input
                                    id="village"
                                    name="village"
                                    type="text"
                                    value={form.village}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                    District *
                                </label>
                                <input
                                    id="district"
                                    name="district"
                                    type="text"
                                    value={form.district}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                    State *
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={form.state}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                                    Pincode *
                                </label>
                                <input
                                    id="pincode"
                                    name="pincode"
                                    type="text"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="isTouristGuide"
                                name="isTouristGuide"
                                type="checkbox"
                                checked={form.isTouristGuide}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isTouristGuide" className="ml-2 block text-sm text-gray-900">
                                I am a tourist guide
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Complete Registration'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Registration;