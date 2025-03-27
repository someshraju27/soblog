import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [id, setId] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [errors, setErrors] = useState({
        title: '',
        content: '',
        author: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            title: '',
            content: '',
            author: '',
            image: ''
        };

        // Title validation
        if (!title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        } else if (title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
            valid = false;
        }

        // Content validation
        if (!content.trim()) {
            newErrors.content = 'Content is required';
            valid = false;
        } else if (content.length < 50) {
            newErrors.content = 'Content must be at least 50 characters';
            valid = false;
        }

        // Author validation
        if (!author.trim()) {
            newErrors.author = 'Author name is required';
            valid = false;
        } else if (!/^[a-zA-Z ]+$/.test(author)) {
            newErrors.author = 'Author name should only contain letters and spaces';
            valid = false;
        }

        // Image validation
        if (!image) {
            newErrors.image = 'Image is required';
            valid = false;
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(image.type)) {
                newErrors.image = 'Only JPEG, PNG, GIF, or WEBP images are allowed';
                valid = false;
            }
            if (image.size > 5 * 1024 * 1024) { // 5MB limit
                newErrors.image = 'Image size must be less than 5MB';
                valid = false;
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            // Clear image error when new image is selected
            setErrors({...errors, image: ''});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append("userId", id);
            data.append("blogTitle", title);
            data.append("blogContent", content);
            data.append("blogAuthor", author);
            data.append("blogImage", image);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog`, data, {
                headers: { 
                    "content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });
            
           
            alert("You will receive an Email after approval of your Blog. Thank You");

            // Reset form
            setTitle('');
            setContent('');
            setAuthor('');
            setImage(null);
            setImagePreview(null);
            setErrors({
                title: '',
                content: '',
                author: '',
                image: ''
            });
            
            // Navigate after successful submission if needed
            // navigate('/home');
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('Failed to submit blog. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper function to handle input changes with validation
    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({...errors, [field]: ''});
        }
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="title">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleInputChange(setTitle, 'title')}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                                errors.title ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                            }`}
                            placeholder="Enter blog title..."
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Blog Content */}
                    <div className={`transition-all duration-500 ${expanded ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-50' : ''}`}>
                        <div className={`relative w-full bg-white p-6 rounded-xl shadow-lg ${expanded ? 'max-w-4xl h-[70vh]' : 'mb-4'}`}>
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
                                onChange={handleInputChange(setContent, 'content')}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 resize-none ${
                                    expanded ? 'h-[60vh]' : 'h-48'
                                } ${
                                    errors.content ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                                }`}
                                placeholder="Write your blog content here..."
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                            )}
                        </div>
                    </div>

                    {/* Author Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="author">
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={handleInputChange(setAuthor, 'author')}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                                errors.author ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                            }`}
                            placeholder="Enter your name..."
                        />
                        {errors.author && (
                            <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                        )}
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
                                className={`p-4 text-center cursor-pointer ${
                                    errors.image ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                onClick={() => window.fileUpload.click()}
                            >
                                <span className={`${errors.image ? 'text-red-600' : 'text-gray-600'}`}>
                                    {image ? image.name : 'Click to upload an image'}
                                </span>
                            </div>
                        </div>
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                        )}
                        {imagePreview && (
                            <div className="mt-4">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="max-w-full h-auto rounded-lg shadow-md" 
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Image Preview ({Math.round(image.size / 1024)} KB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-lg py-3 rounded-lg transition-all duration-300 shadow-lg ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-customPurple hover:bg-purple-700 text-white'
                        }`}
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Blog 🚀'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;