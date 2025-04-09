// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({
        firstName: "", lastName: "", userName: "", email: "", password: "", otp: ""
    });
    const [otpSent, setOtpSent] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(api.sendOtp, { email: form.email });
            setOtpSent(true);
        } catch (error) {
            alert("Signup failed!");
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            await axios.post(api.signup, { form });
            window.location.href = "/login";
        } catch (error) {
            alert("Invalid OTP");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            {!otpSent ? (
                <form onSubmit={handleSignup} className="w-[350px] bg-white p-8 shadow-md rounded-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Sign Up</h2>
                    {[
                        { id: "firstName", type: "text", label: "First Name" },
                        { id: "lastName", type: "text", label: "Last Name" },
                        { id: "userName", type: "text", label: "Username" },
                        { id: "email", type: "email", label: "E-mail" },
                        { id: "password", type: "password", label: "Password" },
                    ].map(({ id, type, label }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
                            <input
                                id={id}
                                type={type}
                                placeholder={label}
                                className="border p-2 w-full mb-4 rounded"
                                onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                                required
                            />
                        </div>
                    ))}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded transition">
                        Send OTP
                    </button>
                    <p className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                    </p>
                </form>
            ) : (
                <form onSubmit={verifyOtp} className="w-[350px] bg-white p-8 shadow-md rounded-lg">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">Verify OTP</h2>
                    <label className="block mb-1 font-medium">Enter OTP</label>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="border p-2 w-full mb-4 rounded"
                        onChange={(e) => setForm({ ...form, otp: e.target.value })}
                        required
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 w-full rounded transition">
                        Verify
                    </button>
                </form>
            )}
        </div>
    );
};

export default Signup;
