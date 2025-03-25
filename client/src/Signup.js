import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        profileImage: null
    });

    // ✅ Handle input changes
    const handleChange = (e) => {
        if (e.target.name === "profileImage") {
            setUserData({ ...userData, profileImage: e.target.files[0] });
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    // ✅ Toggle password visibility
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", userData.username);
        data.append("email", userData.email);
        data.append("password", userData.password);
        data.append("profileImage", userData.profileImage);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Signup successful", response.data);
            alert("Signup successful! You can now log in.");
        } catch (err) {
            console.error("Error:", err.message);
        }

        setUserData({
            username: "",
            email: "",
            password: "",
            profileImage: null
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex items-center justify-center">
            <form className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-blue-500 text-3xl font-bold text-center mb-6">Sign Up</h2>

                {/* ✅ Username */}
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white mb-4"
                />

                {/* ✅ Email */}
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white mb-4"
                />

                {/* ✅ Password */}
                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-300"
                        onClick={handlePasswordToggle}
                    >
                         {showPassword ? (
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                className="w-5 h-5"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13.875 18.825A10.97 10.97 0 0112 19c-4.418 0-8.418-2.64-10.125-6.56a1.012 1.012 0 010-.88C3.582 7.64 7.582 5 12 5c1.316 0 2.573.23 3.75.65M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0L21 21M3 3l6 6"
                                />
                            </svg>
                        ) : (
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                className="w-5 h-5"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M12 4.5c-4.64 0-8.577 3.01-9.964 7.178a1.012 1.012 0 000 .639C3.423 16.49 7.36 19.5 12 19.5c4.64 0 8.577-3.01 9.964-7.178a1.012 1.012 0 000-.639C20.577 7.51 16.64 4.5 12 4.5zm0 11.25a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z"
                                />
                            </svg>
                        )}
                    </span>
                </div>

                {/* ✅ Image Upload */}
                <div className="mb-6">
                    <label className="block text-gray-400 font-medium mb-2">
                        Upload Profile Image
                    </label>
                    <div
                        className="w-full border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                        {userData.profileImage ? (
                            <img
                                src={URL.createObjectURL(userData.profileImage)}
                                alt="Profile Preview"
                                className="w-24 h-24 object-cover rounded-full border border-gray-500 shadow-lg mb-2"
                            />
                        ) : (
                            <div className="text-gray-400">
                                <span className="text-xl">📷</span>
                                <p className="text-sm mt-2">Click to upload an image</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ✅ Signup Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition"
                >
                    Sign Up
                </button>

                {/* ✅ Redirect to Login */}
                <p className="text-center text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
