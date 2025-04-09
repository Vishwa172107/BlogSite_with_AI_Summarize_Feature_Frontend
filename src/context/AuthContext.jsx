import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to fetch user data and update state
    const fetchUser = async (userId) => {
        try {
            const res = await axios.get(api.getUser(userId));
            setUser(res.data); // ✅ Ensures state is updated
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) fetchUser(userId); // Fetch user on initial load
    }, []);

    const login = async (userId, token) => {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        await fetchUser(userId); // ✅ Fetch user after login to update state
    };

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
