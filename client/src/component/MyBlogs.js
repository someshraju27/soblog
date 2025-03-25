import React, { useState, useEffect } from "react";
import Blog from "../Blog";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);

  // Fetch user ID
  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setId(res.data.user.id))
        .catch((err) => console.log(err.message));
    }
  }, [token]);

  // Fetch approved blogs
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/blog`)
        .then((res) => 
          {
            setBlogs(res.data.filter((blog) => blog.userId === id));
            console.log(res.data);
          })
          
        .catch((err) => console.log(err));
    }
  }, [id]);

  // Fetch pending blogs
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/pending`)
        .then((res) => setPendingBlogs(res.data.filter((blog) => blog.userId === id)))
        .catch((err) => console.log(err));
    }
  }, [id, token]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-[#1b1b3a] to-[#152246] overflow-hidden px-6">
      
      {/* Header */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-4xl lg:text-6xl font-bold italic text-start py-6">
        My Blogs
      </h1>

      {/* Back Button */}
      <svg
        className="w-10 text-white absolute top-8 right-6 cursor-pointer transition hover:scale-110"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        onClick={() => navigate('/home')}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

      {/* Approved Blogs Section */}
      <section className="mt-10">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-4xl lg:text-5xl font-bold italic text-center mb-6">
          Approved Blogs
        </h2>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((eachObj) => (
              <Blog
                key={eachObj._id}
                id={eachObj._id}
                image={eachObj.blogImage}
                title={eachObj.blogTitle}
                author={eachObj.blogAuthor}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 italic text-lg">No approved blogs found.</p>
        )}
      </section>

      {/* Pending Blogs Section */}
      <section className="mt-16">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-4xl lg:text-5xl font-bold italic text-center mb-6">
          Pending Blogs
        </h2>
        {pendingBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingBlogs.map((eachObj) => (
              <Blog
                key={eachObj._id}
                id={eachObj._id}
                image={eachObj.blogImage}
                title={eachObj.blogTitle}
                author={eachObj.blogAuthor}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 italic text-lg">No pending blogs found.</p>
        )}
      </section>

      {/* Back to Home */}
      <div className="flex justify-center mt-12">
        <Link to="/home" className="text-red-500 underline text-xl hover:text-red-400 transition">
          Go back to Home Page
        </Link>
      </div>

    </div>
  );
};

export default MyBlogs;
