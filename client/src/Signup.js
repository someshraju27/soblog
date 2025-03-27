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
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        profileImage: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Validation rules
    const validateField = (name, value) => {
        let error = "";
        
        switch (name) {
            case "username":
                if (!value.trim()) {
                    error = "Username is required";
                } else if (value.length < 3) {
                    error = "Username must be at least 3 characters";
                } else if (value.length > 20) {
                    error = "Username must be less than 20 characters";
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    error = "Username can only contain letters, numbers and underscores";
                }
                break;
                
            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Please enter a valid email address";
                }
                break;
                
            case "password":
                if (!value.trim()) {
                    error = "Password is required";
                } else if (value.length < 8) {
                    error = "Password must be at least 8 characters";
                } else if (!/[A-Z]/.test(value)) {
                    error = "Password must contain at least one uppercase letter";
                } else if (!/[a-z]/.test(value)) {
                    error = "Password must contain at least one lowercase letter";
                } else if (!/[0-9]/.test(value)) {
                    error = "Password must contain at least one number";
                } else if (!/[^A-Za-z0-9]/.test(value)) {
                    error = "Password must contain at least one special character";
                }
                break;
                
            case "profileImage":
                if (!value) {
                    error = "Profile image is required";
                } else if (value.size > 2 * 1024 * 1024) { // 2MB limit
                    error = "Image size must be less than 2MB";
                } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(value.type)) {
                    error = "Only JPEG, PNG or GIF images are allowed";
                }
                break;
                
            default:
                break;
        }
        
        return error;
    };

    // Handle input changes with validation
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        // Clear any existing error for this field
        setErrors(prev => ({ ...prev, [name]: "" }));
        
        if (name === "profileImage") {
            const file = files[0];
            setUserData({ ...userData, profileImage: file });
            
            // Validate image immediately
            const error = validateField(name, file);
            setErrors(prev => ({ ...prev, [name]: error }));
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    // Validate entire form
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
        
        // Validate each field
        Object.keys(userData).forEach(key => {
            const error = validateField(key, userData[key]);
            newErrors[key] = error;
            if (error) isValid = false;
        });
        
        setErrors(newErrors);
        return isValid;
    };

    // Toggle password visibility
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const data = new FormData();
            data.append("username", userData.username);
            data.append("email", userData.email);
            data.append("password", userData.password);
            data.append("profileImage", userData.profileImage);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            console.log("Signup successful", response.data);
            alert("Signup successful! You can now log in.");
            
            // Reset form on success
            setUserData({
                username: "",
                email: "",
                password: "",
                profileImage: null
            });
            setErrors({
                username: "",
                email: "",
                password: "",
                profileImage: ""
            });
            
        } catch (err) {
            console.error("Error:", err);
            let errorMessage = "Signup failed. Please try again.";
            
            if (err.response) {
                if (err.response.status === 409) {
                    errorMessage = err.response.data.message || "Username or email already exists";
                } else {
                    errorMessage = err.response.data.message || errorMessage;
                }
            }
            
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex items-center justify-center">
            <form className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-blue-500 text-3xl font-bold text-center mb-6">Sign Up</h2>
                
                {submitError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                        {submitError}
                    </div>
                )}

                {/* Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className={`w-full p-3 border rounded bg-gray-800 text-white ${
                            errors.username ? "border-red-500" : "border-gray-700"
                        }`}
                    />
                    {errors.username && (
                        <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`w-full p-3 border rounded bg-gray-800 text-white ${
                            errors.email ? "border-red-500" : "border-gray-700"
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className={`w-full p-3 border rounded bg-gray-800 text-white ${
                                errors.password ? "border-red-500" : "border-gray-700"
                            }`}
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-300"
                            onClick={handlePasswordToggle}
                        >
                            {showPassword ? "🙈" : "👁️"}                        </span>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                    )}
                    {!errors.password && userData.password && (
                        <p className="text-green-400 text-sm mt-1">
                            Password strength: {
                                userData.password.length >= 12 ? 
                                "Strong" : 
                                userData.password.length >= 8 ? 
                                "Medium" : 
                                "Weak"
                            }
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-gray-400 font-medium mb-2">
                        Upload Profile Image
                    </label>
                    <div
                        className={`w-full border-2 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-300 ${
                            errors.profileImage ? "border-red-500" : "border-dashed border-gray-600"
                        }`}
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
                            <>
                                <img
                                    src={URL.createObjectURL(userData.profileImage)}
                                    alt="Profile Preview"
                                    className="w-24 h-24 object-cover rounded-full border border-gray-500 shadow-lg mb-2"
                                />
                                <p className="text-sm text-gray-400">
                                    {userData.profileImage.name} (
                                    {(userData.profileImage.size / 1024).toFixed(1)} KB)
                                </p>
                            </>
                        ) : (
                            <div className="text-gray-400">
                                <span className="text-xl">📷</span>
                                <p className="text-sm mt-2">Click to upload an image</p>
                            </div>
                        )}
                    </div>
                    {errors.profileImage && (
                        <p className="text-red-400 text-sm mt-1">{errors.profileImage}</p>
                    )}
                </div>

                {/* Signup Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white font-bold py-3 rounded transition ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-500"
                    }`}
                >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>

                {/* Redirect to Login */}
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
