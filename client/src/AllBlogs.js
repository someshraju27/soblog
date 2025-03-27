import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [searchInput, setSearchInput] = useState("");
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/blog`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden mx-auto mb-10 px-4 lg:px-8 bg-gradient-to-r from-black to-[#152246]">
      {/* Heading */}
      <h1 className="text-customPurple text-3xl lg:text-5xl font-bold italic mt-4 mb-6 text-center lg:text-left">
        All Blogs
      </h1>
      <div>
                        <svg
                            className="w-12 absolute top-8 text-white transition ease-out duration-300 mt-2 cursor-pointer right-4 lg:right-[2rem]"
                   xmlns="http://www.w3.org/2000/svg"
                            fill="none"  
                            viewBox="0 0 24 24"
                            strokeWidth="1.5" 
                            stroke="currentColor"
                            onClick={() => navigate('/home')}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            </svg>   
                        </div>
      {/* Search Bar */}
      <div className="flex justify-center lg:justify-end items-center mb-6">
        <input
          type="text"
          className="p-2 lg:p-3 w-[12rem] sm:w-[16rem] md:w-[20rem] lg:w-[24rem] border-2 border-black rounded-md"
          placeholder="Search Title"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="ml-[-2rem] p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Blog Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs
          .filter((blog) =>
            blog.blogTitle.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((eachObj, index) => (
            <Blog
              key={index}
              id={eachObj._id}
              image={eachObj.blogImage}
              title={eachObj.blogTitle}
              author={eachObj.blogAuthor}
            />
          ))}
      </section>

      {/* Go Back Link */}
      <div className="flex justify-center mt-6">
         <Link to="/home"  className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition" >
                    Go back to Home Page
                </Link>
      </div>
    </div>
  );
};

export default AllBlogs;



