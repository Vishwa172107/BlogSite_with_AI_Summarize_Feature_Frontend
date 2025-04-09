import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export function CreateBlog() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "public",
    });

    const [message, setMessage] = useState(""); // Toast message
    const [showToast, setShowToast] = useState(false); // Controls toast visibility
    const navigate = useNavigate();

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found. Please log in.");

            const res = await axios.post(api.CreateBlog, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            setMessage("✅ Blog post created successfully!");
            setShowToast(true);
            setFormData({ title: "", content: "", type: "public" });
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("❌ Failed to create blog post");
            setShowToast(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
            {/* Toast */}
            {showToast && (
                <div className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50 animate-bounce">
                    {message}
                </div>
            )}

            <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Create a Blog Post
                </h1>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter blog title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block font-medium mb-1">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="6"
                            placeholder="Write your blog here..."
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Post as</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="anon"
                                    checked={formData.type === "anon"}
                                    onChange={handleChange}
                                />
                                Anonymous
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="public"
                                    checked={formData.type === "public"}
                                    onChange={handleChange}
                                />
                                Public
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                        >
                            ← Back
                        </button>
                        <input
                            type="submit"
                            value="Submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
