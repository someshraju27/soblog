import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";

const TrendingBlogs = () => {
  const [translateX, setTranslateX] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const scrollSpeed = 0.1;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setTranslateX((prev) => (Math.abs(prev) >= blogs.length * 24 ? 0 : prev - scrollSpeed));
    }, 50);
    return () => clearInterval(interval);
  }, [blogs]);

  const moveLeft = () => {
    setTranslateX((prev) => (prev < 0 ? prev + 24 : 0));
  };

  const moveRight = () => {
    setTranslateX((prev) => (Math.abs(prev) < (blogs.length - 1) * 24 ? prev - 24 : prev));
  };

  return (
    <div className="relative w-full mt-[10rem] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 overflow-visible">
<h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 
font-bold text-5xl md:text-6xl lg:text-6xl sm:shadow-custom mb-6 text-center mt-4">
  Trending Blogs
</h1>


      {/* Scrollable Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={moveLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black text-white p-2 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Blogs Scrolling Section */}
        <div className="relative flex mt-6 overflow-x-hidden">
          <section
            className="flex space-x-4 transition-transform ease-linear duration-300 no-scrollbar"
            style={{ transform: `translateX(${translateX}rem)` }}
          >
            {blogs.concat(blogs).map((eachObj, index) => (
              // console.log(eachObj.blogImage),
              <div key={index} className="w-[18rem] h-[22rem] shrink-0">
                
                
                <Blog
                  id={eachObj._id}
                  image={eachObj.blogImage}
                  title={eachObj.blogTitle}
                  author={eachObj.blogAuthor}
                />
              </div>
            ))}
          </section>
        </div>

        {/* Right Arrow */}
        <button
          onClick={moveRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black text-white p-2 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrendingBlogs;
