import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto lg:overflow-hidden">
    
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/start.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-tight">
  <span className="text-gray-300 italic lg:pr-4 md:pr-4">Welcome to</span>  
  <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold text-5xl md:text-6xl lg:text-7xl sm:shadow-custom">
    SoBlog
  </span>
</h1>


       
          <div className="mt-12">
            <Link to="/login">
              <button className="w-40 md:w-64 h-12 md:h-16 border-2 text-lg md:text-2xl text-white font-bold bg-customPurple transition ease-out duration-500 border-purple-600 hover:bg-opacity-90 focus:ring-4 focus:ring-purple-300">
                Explore Blog
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
