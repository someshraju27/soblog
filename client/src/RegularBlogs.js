import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegularBlogs = () => {
    const [searchInput, setSearchInput] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog`);
                console.log("API Response:", res.data); // Debugging

                if (Array.isArray(res.data)) {
                    setBlogs(res.data);
                } else if (res.data && Array.isArray(res.data.blogs)) {
                    setBlogs(res.data.blogs); // Handle nested API response
                } else {
                    console.error("Invalid data format:", res.data);
                    setBlogs([]);  
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setBlogs([]); 
            } finally {
                setLoading(false); // Stop loading after API call
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg">Loading blogs...</p>;
    if (!blogs.length) return <p className="text-center mt-10 text-lg">No blogs available.</p>;

    return (
        <div className='max-w-[90%] lg:max-w-[78rem] mx-auto mt-10 mb-10'>  
            {/* Heading */}
            <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-bold text-5xl md:text-6xl lg:text-6xl sm:shadow-custom mb-6 text-center lg:text-left'>
                Recent Posts
            </h1>

            {/* Search Bar */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center mb-8 gap-2">
                <input 
                    type="text"
                    className='p-2 sm:p-3 w-[12rem] sm:w-[18rem] lg:w-[21rem] border-2 border-black rounded-md'
                    placeholder='Search Title'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-black w-6 h-6 absolute right-[6.5rem] lg:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            {/* Blog Grid */}
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {blogs
                    .filter(blog => blog?.blogTitle?.toLowerCase().includes(searchInput.toLowerCase()))
                    .slice(0, 9)
                    .map((eachObj, index) => (
                        eachObj ? (
                            <Blog
                                key={eachObj._id || index}
                                id={eachObj._id}
                                image={eachObj.blogImage}
                                title={eachObj.blogTitle}
                                author={eachObj.blogAuthor}
                            />
                        ) : null
                    ))
                }
            </section>

            {/* View More */}
            <div className="flex justify-end mt-6">
                <Link to='/allblogs' className='text-red-700 underline'>View more -&gt;</Link>
            </div>
        </div>
    );
};

export default RegularBlogs;
