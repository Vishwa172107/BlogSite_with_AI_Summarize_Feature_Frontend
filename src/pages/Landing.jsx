import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-6xl w-full">

                {/* Section 1 */}
                <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between bg-white rounded-xl shadow-md hover:shadow-xl transition w-full p-8 my-6 gap-8">
                    <div className="max-w-lg w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to BLOGSY</h1>
                        <p className="text-gray-600 mb-6">
                            A social blogging platform to share and discover new ideas.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
                            <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/assets/image4.jpg" alt="Welcome" className="w-full max-w-md rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition w-full p-8 my-6 gap-8">
                    <div className="max-w-lg w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">Worried about long blogs? We got you!</h1>
                        <p className="text-gray-600">
                            At Blogsy, you can share your thoughts without holding back. Our Summarization Feature uses Machine Learning
                            to help you get the most out of your reading experience.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/assets/image1.jpg" alt="Summarization" className="w-full max-w-md rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between bg-white rounded-xl shadow-md hover:shadow-xl transition w-full p-8 my-6 gap-8">
                    <div className="max-w-lg w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Concerns? No worries!</h1>
                        <p className="text-gray-600">
                            We at Blogsy prioritize user privacy. Your personal data is never stored, and you can even post anonymously!
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/assets/image2.jpg" alt="Privacy" className="w-full max-w-md rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Section 4 */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition w-full p-8 my-6 gap-8">
                    <div className="max-w-lg w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">Help Keep the Community Safe</h1>
                        <p className="text-gray-600">
                            Blogsy enforces strict anti-hate speech and discrimination policies. Our goal is to maintain a safe and
                            respectful community for everyone.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src="/assets/image3.png" alt="Safety" className="w-full max-w-md rounded-lg shadow-lg" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Landing;
