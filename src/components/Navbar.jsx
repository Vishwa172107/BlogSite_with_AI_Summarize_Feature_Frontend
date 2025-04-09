import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        setDropdownOpen(false); // close menu before logout
        logout();
        navigate("/login");
    };

    const handleLogoClick = () => {
        if (user) {
            navigate("/home");
        } else {
            navigate("/");
        }
    };

    // Detect click outside dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <div
                onClick={handleLogoClick}
                className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
            >
                <img
                    src="/assets/blog-app-shopify-6.png"
                    alt="BlogSy Logo"
                    className="object-contain"
                    style={{ width: "1em", height: "1em" }}
                />
                BLOGSY
            </div>


            <div className="relative" ref={dropdownRef}>
                {user ? (
                    <>
                        <button
                            className="bg-white text-blue-500 px-4 py-2 rounded"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user.userName}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded z-50">
                                <Link
                                    to={`/profile`}
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
