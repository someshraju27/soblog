import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ role, id, image, title, author, likes = [], dislikes = [], userId, currentUserId, refreshBlogs }) => {
  const navigate = useNavigate();
  const [isReacting, setIsReacting] = useState(false);

  const handleClick = () => {
    navigate(`/fullblog/${id}`);
  };

  // Check if current user has liked/disliked
  const hasLiked = likes.includes(currentUserId);
  const hasDisliked = dislikes.includes(currentUserId);

  const handleReaction = async (type, e) => {
    e.stopPropagation();
    if (isReacting || !currentUserId) return;

    setIsReacting(true);
    try {
      const endpoint = type === 'like' ? 'like' : 'dislike';
      await axios.put(`/api/blogs/${id}/${endpoint}`, { userId: currentUserId });
      refreshBlogs?.(); // Refresh the blog list after reaction
    } catch (err) {
      console.error(`${type} failed`, err.response?.data || err.message);
    } finally {
      setIsReacting(false);
    }
  };

  return (
    <div
      className="min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] lg:min-w-[22rem] m-6 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 flex-shrink-0 cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={image || '/default-blog-image.jpg'} 
        alt="Blog cover" 
        className="h-40 md:h-48 w-full object-cover rounded-t-lg"
        onError={(e) => {
          e.target.src = '/default-blog-image.jpg';
        }}
      />
      
      <div className="p-4">
        <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>

        {/* Reaction buttons */}
        <div className="flex gap-4 mt-3">
          <button
            onClick={(e) => handleReaction('like', e)}
            disabled={isReacting}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              hasLiked 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : "bg-gray-200 text-black hover:bg-gray-300"
            } ${isReacting ? 'opacity-70' : ''}`}
            aria-pressed={hasLiked}
          >
            👍 {likes.length || 0}
          </button>
          
          <button
            onClick={(e) => handleReaction('dislike', e)}
            disabled={isReacting}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              hasDisliked 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-gray-200 text-black hover:bg-gray-300"
            } ${isReacting ? 'opacity-70' : ''}`}
            aria-pressed={hasDisliked}
          >
            👎 {dislikes.length || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
