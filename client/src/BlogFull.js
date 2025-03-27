import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { store } from "./App";
import { motion } from "framer-motion";


const BlogFull = () => {
    const navigate = useNavigate();

    
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();
    // const token = useContext(store)[0];
    const token = localStorage.getItem("token");
    const [userId, setUserId] = useState("");
    const [data, setData] = useState({
        blogTitle: "",
        blogContent: "",
        blogAuthor: "",
        blogImage: "",
    });
    const [image, setImage] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    // ✅ Redirect to login if no token
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // ✅ Fetch user ID
    useEffect(() => {
        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/home`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => 
                    {
                        setUserId(res.data.user.id);
                        setImage(res.data.user.profileImage);
                    }
                    )
                .catch((err) => console.log(err.message));
        }
    }, [token]);

    // ✅ Fetch blog details
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    // ✅ Show edit button only if user owns the blog
    useEffect(() => {
        if (userId && userId === data.userId) {
            setEditButton(true);
        }
    }, [userId, data.userId]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // ✅ Handle image file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // ✅ Handle form submission (Update Blog)
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
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Blog updated successfully!");
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-gradient-to-r from-black to-[#152246] min-h-screen flex justify-center items-center px-6 py-12">
            <div className="max-w-4xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
                {/* 📝 Edit Mode */}
                {isEditing ? (
      
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        {/* Blog Title */}
                        <input
                            type="text"
                            name="blogTitle"
                            value={data.blogTitle}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
                            placeholder="Enter Blog Title"
                        />
                    
                        {/* Blog Content (Expandable) */}
                        <textarea
                            name="blogContent"
                            value={data.blogContent}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
                            rows={isExpanded ? 12 : 6}
                            placeholder="Enter Blog Content"
                            onClick={() => setIsExpanded(true)}
                            animate={{
                                width: isExpanded ? "80%" : "100%",
                                height: isExpanded ? "300px" : "150px",
                                x: isExpanded ? "-10%" : "0%",
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        />
                    
                        {/* Expand Icon */}
                        {!isExpanded && (
                            <div
                                onClick={() => setIsExpanded(true)}
                                className="cursor-pointer text-gray-400 hover:text-gray-200 text-right"
                            >
                                ⬆️ Expand
                            </div>
                        )}
                    
                        {/* Change Image */}
                        <div>
                            <label className="block mb-2 font-semibold">Change Image (optional):</label>
                            <input
                                type="file"
                                name="blogImage"
                                onChange={handleImageChange}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            />
                        </div>
                    
                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false) }
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    
                
                ) : (
                    // 📖 View Mode
                    <>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-purple-400">{data.blogTitle}</h1>
                        {/* 🔙 Back Button */}
                        <svg
                            className="w-10 text-white cursor-pointer hover:scale-110 transition absolute top-6 right-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            onClick={() => navigate("/home")}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <img src={data.blogImage} alt="Blog" className="mt-4 mb-4 w-full h-[16rem] lg:h-[25rem] object-cover rounded-md shadow-lg" />
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap overflow-hidden break-words">
    {data.blogContent}
</p>



                        {/* ✍️ Author Section */}
                        <div className="mt-6 flex items-center gap-4">
                            <img
                                src={image}
                                alt="Author"
                                className="w-12 h-12 object-cover rounded-full border border-gray-500"
                            />
                            <div>
                                <h4 className="text-xl font-bold text-white">{data.blogAuthor}</h4>
                                <p className="text-gray-400">Author & Blogger</p>
                            </div>
                        </div>

                        {/* 🛠 Edit Button (Only for Author) */}
                        {editButton && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
                            >
                                Edit Blog
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogFull;