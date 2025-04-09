import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ key, post }) => {
    return (
        <div className="border p-4 mb-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{post.BlogTitle}</h2>
            <p className="text-gray-600">{post.Content?.slice(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="text-blue-500">Read More</Link>
        </div>
    );
};

export default PostCard;
