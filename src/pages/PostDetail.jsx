import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";
import "../styles/main.css";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(api.getPost(id))
            .then((res) => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching post data.");
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (post?.author) {
            axios.get(api.getUser(post.author))
                .then((res) => setAuthor(res.data))
                .catch(() => setError("Error fetching author data."));
        }
    }, [post]);

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    const handleSummarizeClick = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token is missing. Please log in.");
            return;
        }

        if (isLoading || !post) return;
        setIsLoading(true);
        setError("");

        axios.post(api.getSummary,
            { text: post.Content },
            {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true,
            }
        )
            .then((res) => {
                setSummary(res.data.summary || res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setError("Failed to generate summary. Please try again.");
                setIsLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="post-container px-4 md:px-0">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded shadow-sm transition duration-200"
            >
                ← Back
            </button>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {post ? (
                <div className="post-card">
                    <div className="card-body">
                        <h1 className="post-title">{post.BlogTitle}</h1>
                        <div className="post-content">
                            {post.Content}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {author ? (
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-600">Posted by</p>
                                    <button
                                        onClick={() => handleUserClick(author._id)}
                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                    >
                                        {author.userName}
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-500">Posted Anonymously</p>
                            )}

                            <button
                                onClick={handleSummarizeClick}
                                disabled={isLoading}
                                className="btn btn-primary ml-auto flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                                        <span>Summarizing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                        <span>Summarize</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {summary && (
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2">Summary</h3>
                                <p className="text-gray-700">{summary}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">Post not found.</div>
            )}
        </div>
    );
};

export default PostDetail;
