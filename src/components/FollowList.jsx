import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

const FollowList = ({ type }) => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(api.getUser(id)).then((res) => {
            if (type === "followers") {
                setUsers(res.data.followers);
            } else {
                setUsers(res.data.following);
            }
        });
    }, [id, type]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{type === "followers" ? "Followers" : "Following"}</h1>
            {users.length > 0 ? (
                users.map((user) => (
                    <Link key={user._id} to={`/profile/${user._id}`} className="block border p-4 my-2 rounded shadow-md">
                        {user.userName}
                    </Link>
                ))
            ) : (
                <p className="text-gray-500">No {type} yet.</p>
            )}
        </div>
    );
};

export default FollowList;
