import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [id, setId] = useState("");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/home`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => setId(res.data.user.id))
            .catch((err) => console.log(err.message));
    }, [token]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("userId", id);
        data.append("blogTitle", title);
        data.append("blogContent", content);
        data.append("blogAuthor", author);
        data.append("blogImage", image);

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog`, data, {
            headers: { "content-Type": "multipart/form-data" }
        });
        console.log('Successful', response.data);

        setTitle('');
        setContent('');
        setAuthor('');
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="p-6 w-full bg-gradient-to-r from-black to-[#152246] overflow-hidden min-h-screen flex justify-center items-center">
            <div className="w-full max-w-3xl transition-all duration-500">
                <form 
                    onSubmit={handleSubmit} 
                    className="w-full bg-white p-8 shadow-2xl rounded-xl"
                    encType="multipart/form-data"
                >
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-customPurple">
                            Create a New Blog
                        </h2>
                        <svg
                            className="w-10 h-10 text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300"
                            onClick={() => navigate('/home')}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    {/* Blog Title */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="title">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-200"
                            placeholder="Enter blog title..."
                            required
                        />
                    </div>

                    {/* Blog Content */}
                    <div className={`transition-all duration-500 ${expanded ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-50' : ''}`}>
                        <div className={`relative w-full bg-white p-6 rounded-xl shadow-lg ${expanded ? 'max-w-4xl h-[70vh]' : 'mb-6'}`}>
                            <div className="flex justify-between items-center">
                                <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="content">
                                    Blog Content
                                </label>
                                {/* Expand/Collapse Icon */}
                                <svg
                                    className={`w-8 h-8 text-gray-500 cursor-pointer transition-transform duration-300 ${
                                        expanded ? 'rotate-180' : ''
                                    }`}
                                    onClick={() => setExpanded(!expanded)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none ${
                                    expanded ? 'h-[60vh]' : 'h-48'
                                }`}
                                placeholder="Write your blog content here..."
                                required
                            />
                        </div>
                    </div>

                    {/* Author Name */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="author">
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-200"
                            placeholder="Enter your name..."
                            required
                        />
                    </div>

                    {/* Blog Image Upload */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            Upload Blog Image
                        </label>
                        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                ref={(fileInput) => (window.fileUpload = fileInput)}
                            />
                            <div
                                className="p-4 bg-gray-100 hover:bg-gray-200 text-center cursor-pointer"
                                onClick={() => window.fileUpload.click()}
                            >
                                <span className="text-gray-600">Click to upload an image</span>
                            </div>
                        </div>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-4 max-w-full h-auto rounded-lg shadow-md" />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-customPurple text-white text-lg py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg"
                        onClick={() => alert("You will receive an Email after approval of your Blog. Thank You")}
                    >
                        Publish Blog 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
