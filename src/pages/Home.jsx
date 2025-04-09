import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utils/api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(api.getPosts, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }).then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="relative container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>

            {/* Floating Create Blog Button */}
            <button
                onClick={() => navigate("/create-blog")}
                className="fixed bottom-6 right-6 bg-blue-600 text-white text-xl px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                title="Create a new blog"
            >
                +
            </button>
        </div>
    );
};

export default Home;
