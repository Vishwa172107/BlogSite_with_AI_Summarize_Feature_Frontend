// Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(api.login, form);
            const { token, UserId } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", UserId);
            login(UserId, token);
            navigate("/home");
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="w-[350px] bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Login</h2>
                <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-4 rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4 rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded transition">
                    Login
                </button>
                <p className="mt-4 text-center text-sm">
                    New to BlogSy? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
