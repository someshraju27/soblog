import React, { useEffect, useState, useRef } from "react";
import Blog from "./Blog";
import axios from "axios";

const TrendingBlogs = ({ currentUserId }) => {
  const [translateX, setTranslateX] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const scrollSpeed = 0.15; // Slightly slower for better UX
  const itemWidth = 24; // rem
  const itemGap = 6; // rem - matches space-x-6
  const [duplicatedBlogs, setDuplicatedBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/trending`);
      
      if (res.data.success) {
        setBlogs(res.data.data);
        // Duplicate blogs for seamless looping
        setDuplicatedBlogs([...res.data.data, ...res.data.data]);
      } else {
        throw new Error(res.data.error || 'Invalid data format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load blogs');
      setTimeout(fetchBlogs, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (duplicatedBlogs.length === 0) return;
    
    const containerWidth = scrollContainerRef.current?.offsetWidth || 0;
    const singleLoopWidth = (blogs.length * (itemWidth + itemGap)) - itemGap;
    
    const autoScroll = () => {
      setTranslateX(prev => {
        let newX = prev - scrollSpeed;
        
        // When we've scrolled one full loop, reset position seamlessly
        if (Math.abs(newX) >= singleLoopWidth) {
          newX = 0;
        }
        
        return newX;
      });
    };

    const interval = setInterval(autoScroll, 30); // Smoother animation
    return () => clearInterval(interval);
  }, [duplicatedBlogs, blogs.length]);

  const moveLeft = () => {
    const containerWidth = scrollContainerRef.current?.offsetWidth || 0;
    const singleLoopWidth = (blogs.length * (itemWidth + itemGap)) - itemGap;
    
    setTranslateX(prev => {
      let newX = prev + (itemWidth + itemGap);
      if (newX > 0) {
        newX = -singleLoopWidth + (itemWidth + itemGap);
      }
      return newX;
    });
  };

  const moveRight = () => {
    const containerWidth = scrollContainerRef.current?.offsetWidth || 0;
    const singleLoopWidth = (blogs.length * (itemWidth + itemGap)) - itemGap;
    
    setTranslateX(prev => {
      let newX = prev - (itemWidth + itemGap);
      if (Math.abs(newX) >= singleLoopWidth) {
        newX = 0;
      }
      return newX;
    });
  };

  if (loading) return (
    <div className="w-full mt-[10rem] flex flex-col items-center">
      <div className="animate-pulse text-purple-500 text-lg mb-4">Loading trending blogs...</div>
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="w-full mt-[10rem] flex flex-col items-center">
      <div className="text-red-500 text-lg mb-2">{error}</div>
      <button 
        onClick={fetchBlogs}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  if (blogs.length === 0) return (
    <div className="w-full mt-[10rem] flex flex-col items-center">
      <div className="text-gray-500 text-lg mb-2">No trending blogs found</div>
      <button 
        onClick={fetchBlogs}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Refresh
      </button>
    </div>
  );

  return (
    <div className="relative w-full mt-[10rem] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
      <h1 className="text-purple-600 font-bold text-5xl md:text-6xl lg:text-6xl sm:shadow-custom mb-6 text-center mt-4">
        Trending Blogs
      </h1>

      <div className="relative w-full overflow-hidden" ref={scrollContainerRef}>
        {/* Left Arrow Button */}
        <button
          onClick={moveLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg transition-colors duration-200 hover:scale-110"
          disabled={translateX >= 0}
          aria-label="Scroll left"
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

        {/* Blogs Container */}
        <div className="overflow-x-auto scrollbar-hidden">
          <div
            className="flex space-x-6 transition-transform duration-300 ease-linear py-4"
            style={{ transform: `translateX(${translateX}rem)` }}
          >
            {duplicatedBlogs.map((blog, index) => (
              <div 
                key={`${blog._id}-${index}`} 
                className="w-[18rem] h-[22rem] flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
              >
                <Blog
                  id={blog._id}
                  image={blog.blogImage}
                  title={blog.blogTitle}
                  author={blog.blogAuthor}
                  likes={blog.likes}
                  dislikes={blog.dislikes}
                  userId={blog.userId}
                  currentUserId={currentUserId}
                  refreshBlogs={fetchBlogs}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={moveRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg transition-colors duration-200 hover:scale-110"
          aria-label="Scroll right"
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
