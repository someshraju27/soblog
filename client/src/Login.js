import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { store } from './App';
const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Store token in localStorage whenever it updates
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);
    
    const [data,setData] = useState({
        username:"",
        password:""
    });
    useEffect(()=>{
        if(token){
            navigate('/home');
        }
    },[token,navigate]);
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(data);
        console.log(process.env);
        console.log('API URL:', process.env.REACT_APP_API_URL);

    await axios.post(`${process.env.REACT_APP_API_URL}/login`,data)
    .then((res)=>{
        setToken(res.data.token)
        localStorage.setItem('token',res.data.token);
        console.log(res.data.token);
        alert('Login Successfull');
        navigate('/home');
    })
    .catch((err)=>{
        console.log(err.message);
        alert('Invalid Credentials');
    }
    )
    


    
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex items-center justify-center px-4">
            <form
                className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700"
                onSubmit={handleSubmit}
            >
                {/* ✅ Title */}
                <h2 className="text-blue-500 text-3xl font-bold text-center mb-8">Login</h2>

                {/* ✅ Username */}
                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white outline-none focus:border-blue-500 transition duration-300"
                        autoComplete="off"
                    />
                </div>

                {/* ✅ Password */}
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white outline-none focus:border-blue-500 transition duration-300"
                    />
                    <span
                        className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-300"
                        onClick={handlePasswordToggle}
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3l18 18M10.536 10.536a3 3 0 104.928 4.928M12 3c-4.418 0-8.4 3.582-9.536 8 .536 1.609 1.6 3 3.072 4.072m4.464 2.464c1.072 1.472 2.463 2.536 4.072 3.072 4.418-1.136 8-5.118 8-9.536"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 12.232a3 3 0 01-4.464 4.464M12 4.5c4.64 0 8.577 3.01 9.964 7.178a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5s-8.577-3.01-9.964-7.178a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5z"
                                />
                            </svg>
                        )}
                    </span>
                    <Link
                        to="/forgot-password"
                        className="text-gray-400 hover:text-gray-300 text-sm mt-2 block text-right"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* ✅ Login Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                    Login
                </button>

                {/* ✅ Redirect to Signup */}
                <p className="text-center text-gray-400 mt-6">
                    No account?{' '}
                    <Link to="/signup" className="text-red-500 hover:text-red-400 font-medium">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;