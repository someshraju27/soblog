import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    });
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        
        // Simple validation - just check if fields are entered
        let hasError = false;
        const newErrors = { username: "", password: "" };
        
        if (!data.username.trim()) {
            newErrors.username = "Username is required";
            hasError = true;
        }
        
        if (!data.password.trim()) {
            newErrors.password = "Password is required";
            hasError = true;
        }
        
        setErrors(newErrors);
        if (hasError) return;
        
        setIsSubmitting(true);
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, data);
            localStorage.setItem("token", response.data.token);
            navigate('/home');
        } catch (err) {
            setSubmitError("Invalid username or password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex items-center justify-center px-4">
            <form className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700" onSubmit={handleSubmit}>
                <h2 className="text-blue-500 text-3xl font-bold text-center mb-8">Login</h2>
                
                {submitError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                        {submitError}
                    </div>
                )}

                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={(e) => setData({...data, username: e.target.value})}
                        placeholder="Username"
                        className={`w-full p-4 border rounded-lg bg-gray-800 text-white outline-none focus:border-blue-500 transition duration-300 ${
                            errors.username ? "border-red-500" : "border-gray-700"
                        }`}
                    />
                    {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>

                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                        placeholder="Password"
                        className={`w-full p-4 border rounded-lg bg-gray-800 text-white outline-none focus:border-blue-500 transition duration-300 ${
                            errors.password ? "border-red-500" : "border-gray-700"
                        }`}
                    />
                    <span 
                        className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-gray-400 mt-6">
                    No account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
