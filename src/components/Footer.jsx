import React from "react";
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaGlobe
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">About Me</h2>
                    <p className="text-sm leading-relaxed">
                        I'm a passionate software developer focused on building scalable and user-friendly applications.
                        I enjoy working across the full stack and always exploring new technologies.
                    </p>
                </div>

                {/* Social Profiles */}
                <div>
                    <h2 className="text-lg font-semibold mb-3">Connect with Me</h2>
                    <div className="flex space-x-4 mt-2">
                        <a
                            href="https://github.com/Vishwa172107"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="hover:text-white transition"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="https://linkedin.com/in/vishwa-badrinadh-padala"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-white transition"
                        >
                            <FaLinkedin size={22} />
                        </a>
                        <a
                            href="https://twitter.com/your-username"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="hover:text-white transition"
                        >
                            <FaTwitter size={22} />
                        </a>
                        <a
                            href="https://instagram.com/your-username"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-white transition"
                        >
                            <FaInstagram size={22} />
                        </a>
                        <a
                            href="https://your-portfolio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Portfolio"
                            className="hover:text-white transition"
                        >
                            <FaGlobe size={22} />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 md:text-right">
                    <p>© {new Date().getFullYear()} Vishwa Badrinadh Padala</p>
                    <p>All rights reserved. Built with React & Tailwind CSS.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
