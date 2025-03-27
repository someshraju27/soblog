
import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ role,id, image, title, author }) => {
  const navigate = useNavigate();

const handleClick =() =>{

    navigate(`/fullblog/${id}`);

}
  return (
    <div
      className="min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] lg:min-w-[22rem] m-6 ml- bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 flex-shrink-0 cursor-pointer"
       onClick={handleClick}>
      <img src={image} alt="Blog" className="h-40 md:h-48 w-full object-cover rounded-t-lg" />
      <div className="p-4">
        <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <p className="ml-2 text-gray-700 text-sm">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;