import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(api.getUser(id));
                setUser(res.data);
                checkIfFollowing(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const checkIfFollowing = (userData) => {
        const currentUserId = localStorage.getItem("userId");
        setIsFollowing(userData.followers.includes(currentUserId));
        console.log(userData)
        console.log(currentUserId)
    };

    const handleFollow = async () => {
        try {
            await axios.post(api.followUser(id), {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setIsFollowing(true);
            const res = await axios.get(api.getUser(id));
            setUser(res.data);
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axios.post(api.unfollowUser(id), {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setIsFollowing(false);
            const res = await axios.get(api.getUser(id));
            setUser(res.data);
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    if (!user) return <p>User not found.</p>;

    return (
        <div className="p-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold">{user.userName}</h1>
                <p className="text-gray-600">{user.bio || "No bio available"}</p>
                <div className="mt-4">
                    <p className="text-gray-700">
                        <strong>{user.followers.length}</strong> Followers |
                        <strong> {user.following.length}</strong> Following
                    </p>
                </div>
                <button
                    className={`mt-4 px-4 py-2 rounded text-white ${isFollowing ? "bg-red-500" : "bg-blue-500"}`}
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>

                <h2 className="mt-6 text-xl font-bold">Posts</h2>
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map((post) => (
                        <div key={post._id} className="border p-4 my-4 rounded shadow-md cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>
                            <h3 className="text-lg font-bold">{post.BlogTitle || "Untitled"}</h3>
                            <p className="text-gray-600">{post.Content?.slice(0, 100)}...</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;