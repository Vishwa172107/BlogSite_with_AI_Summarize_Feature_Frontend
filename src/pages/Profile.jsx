import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";
import { AuthContext } from "../context/AuthContext"; // ⬅️ Import context
import "../styles/main.css";

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // ⬅️ Get logout from context
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(api.getUser(localStorage.getItem("userId")), {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((res) => {
            setUser(res.data);
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        logout(); // ⬅️ Trigger logout from context
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="profile-container px-4 md:px-0">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded shadow-sm transition duration-200"
                >
                    ← Back
                </button>
                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded shadow-sm transition duration-200"
                >
                    Logout
                </button>
            </div>

            <div className="card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user?.userName?.[0]?.toUpperCase() || "?"}
                    </div>
                    <h1>{user?.firstName + " " + user?.lastName}</h1>
                    <p>{user?.email}</p>
                </div>
                <div className="card-body">
                    <div className="profile-stats">
                        <div className="stat-card">
                            <h3>Followers</h3>
                            <p className="stat-number">{user?.followers?.length || 0}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Following</h3>
                            <p className="stat-number">{user?.following?.length || 0}</p>
                        </div>
                    </div>
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                        {user?.posts?.length > 0 ? (
                            <div className="space-y-4">
                                {user.posts.map((post) => (
                                    <div key={post._id} className="post-card">
                                        <div className="card-body">
                                            <h3 className="post-title">{post.BlogTitle}</h3>
                                            <p className="post-content">
                                                {post.Content?.slice(0, 100)}...
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No posts yet. Start writing!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
