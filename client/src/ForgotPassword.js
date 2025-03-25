import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email });
      alert('You received an email. Click on the reset link.');
    } catch (err) {
      console.error(err.message);
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex items-center justify-center px-4">
      <form
        className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700"
        onSubmit={handleSubmit}
      >
        {/* ✅ Title */}
        <h2 className="text-blue-500 text-3xl font-bold text-center mb-8">
          Reset Password
        </h2>

        {/* ✅ Email Input */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* ✅ Send Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Send Reset Link
        </button>

        {/* ✅ Redirect to Login */}
        <p className="text-center text-gray-400 mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
