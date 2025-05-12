import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogFull = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const [userId, setUserId] = useState("");
    const [data, setData] = useState({
        blogTitle: "",
        blogContent: "",
        blogAuthor: "",
        blogImage: "",
        likes: [],
        dislikes: [],
        userId: ""
    });

    const [image, setImage] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [userReaction, setUserReaction] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isReacting, setIsReacting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user data
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/home`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserId(res.data.user.id);
                setImage(res.data.user.profileImage);
            } catch (err) {
                console.error("Failed to fetch user data:", err.message);
                // Consider redirecting to login if token is invalid
            }
        };

        fetchUserData();
    }, [token, navigate]);

    // Fetch blog data
    useEffect(() => {
        if (!id) return;
    
        const fetchBlogData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`);
                setData({
                    ...res.data,
                    likes: Array.isArray(res.data.likes) ? res.data.likes : [],
                    dislikes: Array.isArray(res.data.dislikes) ? res.data.dislikes : []
                });
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                navigate("/home");
            }
        };
    
        fetchBlogData();
    }, [id, navigate]);

    // Check user reaction and edit permissions
    useEffect(() => {
        if (!userId || !data.likes || !data.dislikes) return;

        // Determine user reaction
        if (data.likes.includes(userId)) {
            setUserReaction("like");
        } else if (data.dislikes.includes(userId)) {
            setUserReaction("dislike");
        } else {
            setUserReaction(null);
        }

        // Check if user is the author
        setEditButton(userId === data.userId);
    }, [userId, data.likes, data.dislikes, data.userId]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("blogTitle", data.blogTitle);
        formData.append("blogContent", data.blogContent);
        if (imageFile) {
            formData.append("blogImage", imageFile);
        }

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/${id}`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            });
            alert("Blog updated successfully!");
            setIsEditing(false);
            // Refresh data after update
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`);
            setData(res.data);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update blog");
        }
    };

    const handleReaction = async (type) => {
        if (!userId || isReacting) return;
        
        setIsReacting(true);
        try {
            // Ensure likes and dislikes are arrays before processing
            const currentLikes = Array.isArray(data.likes) ? data.likes : [];
            const currentDislikes = Array.isArray(data.dislikes) ? data.dislikes : [];
            
            // Determine the new state
            let newLikes = [...currentLikes];
            let newDislikes = [...currentDislikes];
            let newReaction = userReaction;
    
            if (type === 'like') {
                if (currentLikes.includes(userId)) {
                    // Remove like
                    newLikes = currentLikes.filter(id => id !== userId);
                    newReaction = null;
                } else {
                    // Add like and remove dislike if exists
                    newLikes = [...currentLikes, userId];
                    newDislikes = currentDislikes.filter(id => id !== userId);
                    newReaction = 'like';
                }
            } else { // dislike
                if (currentDislikes.includes(userId)) {
                    // Remove dislike
                    newDislikes = currentDislikes.filter(id => id !== userId);
                    newReaction = null;
                } else {
                    // Add dislike and remove like if exists
                    newDislikes = [...currentDislikes, userId];
                    newLikes = currentLikes.filter(id => id !== userId);
                    newReaction = 'dislike';
                }
            }
    
            // Optimistic UI update
            setData(prev => ({
                ...prev,
                likes: newLikes,
                dislikes: newDislikes
            }));
            setUserReaction(newReaction);
    
            // Make API call
            const endpoint = type;
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/${id}/${endpoint}`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
        } catch (err) {
            console.error("Reaction error:", err.response?.data || err.message);
            // Revert optimistic update on error
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`);
            setData(res.data);
        } finally {
            setIsReacting(false);
        }
    };
    const handleLike = () => handleReaction('like');
    const handleDislike = () => handleReaction('dislike');

    if (isLoading) {
        return (
            <div className="bg-gradient-to-r from-black to-[#152246] min-h-screen flex justify-center items-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#152246] min-h-screen flex justify-center items-center px-4 sm:px-6 py-12">
            <div className="max-w-4xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-6 sm:p-8 relative">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="blogTitle"
                            value={data.blogTitle}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter Blog Title"
                            required
                        />
                        <textarea
                            name="blogContent"
                            value={data.blogContent}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={isExpanded ? 12 : 6}
                            placeholder="Enter Blog Content"
                            onClick={() => setIsExpanded(true)}
                            required
                        />
                        {!isExpanded && (
                            <div
                                onClick={() => setIsExpanded(true)}
                                className="cursor-pointer text-gray-400 hover:text-gray-200 text-right text-sm"
                            >
                                ⬆️ Expand editor
                            </div>
                        )}
                        <div>
                            <label className="block mb-2 font-semibold">Change Image (optional):</label>
                            <input
                                type="file"
                                name="blogImage"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                            />
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button 
                                type="submit" 
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                            >
                                Save Changes
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setIsEditing(false)} 
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/home")}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <svg
                                className="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>

                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-purple-400">{data.blogTitle}</h1>
                        
                        {data.blogImage && (
                            <img 
                                src={data.blogImage} 
                                alt="Blog cover" 
                                className="mt-4 mb-6 w-full h-64 sm:h-80 lg:h-96 object-cover rounded-md shadow-lg"
                                loading="lazy"
                            />
                        )}

                        <div className="prose prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                                {data.blogContent}
                            </pre>
                        </div>

                        {/* Reaction Buttons */}
                        <div className="flex items-center gap-4 mt-8">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                animate={{ 
                                    scale: userReaction === "like" ? [1, 1.1, 1] : 1,
                                    backgroundColor: userReaction === "like" ? "#16a34a" : "#374151"
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={handleLike}
                                disabled={isReacting}
                                className="flex items-center gap-2 px-4 py-2 rounded transition-all"
                            >
                                👍 <span className="font-medium">{data.likes?.length || 0}</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                animate={{ 
                                    scale: userReaction === "dislike" ? [1, 1.1, 1] : 1,
                                    backgroundColor: userReaction === "dislike" ? "#dc2626" : "#374151"
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={handleDislike}
                                disabled={isReacting}
                                className="flex items-center gap-2 px-4 py-2 rounded transition-all"
                            >
                                👎 <span className="font-medium">{data.dislikes?.length || 0}</span>
                            </motion.button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700 flex items-center gap-4">
                            <img 
                                src={image || "/default-avatar.png"} 
                                alt="Author" 
                                className="w-12 h-12 object-cover rounded-full border-2 border-purple-500"
                            />
                            <div>
                                <h4 className="text-xl font-bold text-white">{data.blogAuthor}</h4>
                                <p className="text-gray-400">Author</p>
                            </div>
                        </div>

                        {editButton && (
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                                >
                                    Edit Blog
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogFull;
