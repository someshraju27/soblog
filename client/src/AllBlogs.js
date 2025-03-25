import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [searchInput, setSearchInput] = useState("");
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/blog`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden mx-auto mb-10 px-4 lg:px-8 bg-gradient-to-r from-black to-[#152246]">
      {/* Heading */}
      <h1 className="text-customPurple text-3xl lg:text-5xl font-bold italic mt-4 mb-6 text-center lg:text-left">
        All Blogs
      </h1>
      <div>
                        <svg
                            className="w-12 absolute top-8 text-white transition ease-out duration-300 mt-2 cursor-pointer right-4 lg:right-[2rem]"
                   xmlns="http://www.w3.org/2000/svg"
                            fill="none"  
                            viewBox="0 0 24 24"
                            strokeWidth="1.5" 
                            stroke="currentColor"
                            onClick={() => navigate('/home')}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            </svg>   
                        </div>
      {/* Search Bar */}
      <div className="flex justify-center lg:justify-end items-center mb-6">
        <input
          type="text"
          className="p-2 lg:p-3 w-[12rem] sm:w-[16rem] md:w-[20rem] lg:w-[24rem] border-2 border-black rounded-md"
          placeholder="Search Title"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="ml-[-2rem] p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Blog Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs
          .filter((blog) =>
            blog.blogTitle.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((eachObj, index) => (
            <Blog
              key={index}
              id={eachObj._id}
              image={eachObj.blogImage}
              title={eachObj.blogTitle}
              author={eachObj.blogAuthor}
            />
          ))}
      </section>

      {/* Go Back Link */}
      <div className="flex justify-center mt-6">
        <Link to="/home" className="text-red-700 mb-10 underline text-lg">
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default AllBlogs;




// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { store } from "./App";

// const BlogFull = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     // const [token] = useContext(store);
//     const token = localStorage.getItem("token");
//     const [userId, setUserId] = useState("");
//     const [data, setData] = useState({
//         blogTitle: "",
//         blogContent: "",
//         blogAuthor: "",
//         blogImage: "",
//     });
//     const [editButton, setEditButton] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState("");
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(true);

//     const API_BASE_URL = "http://192.168.86.134:5000";

//     // Redirect to login if no token
//     useEffect(() => {
//         if (!token) navigate("/login");
//     }, [token, navigate]);

//     // Fetch user ID
//     useEffect(() => {
//         if (token) {
//             axios
//                 .get(`${API_BASE_URL}/home`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((res) => setUserId(res.data.user.id))
//                 .catch((err) => setError("Failed to fetch user data."));
//         }
//     }, [token]);

//     // Fetch blog data
//     useEffect(() => {
//         axios
//             .get(`${API_BASE_URL}/api/blog/${id}`)
//             .then((res) => {
//                 setData(res.data);
//                 setImagePreview(res.data.blogImage);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 setError("Failed to load blog. Please try again later.");
//                 setIsLoading(false);
//             });
//     }, [id]);

//     // Check if user is the author
//     useEffect(() => {
//         if (userId && userId === data.userId) {
//             setEditButton(true);
//         }
//     }, [userId, data.userId]);

//     // Handle input changes
//     const handleChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     // Handle image changes
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!data.blogTitle.trim() || !data.blogContent.trim()) {
//             setError("Title and content cannot be empty.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("blogTitle", data.blogTitle);
//         formData.append("blogContent", data.blogContent);
//         if (imageFile) {
//             formData.append("blogImage", imageFile);
//         }

//         try {
//             await axios.put(`${API_BASE_URL}/api/blog/${id}`, formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             alert("Blog updated successfully!");
//             setIsEditing(false);
//         } catch (err) {
//             setError("Failed to update blog. Please try again.");
//         }
//     };

//     return (
//         <div className="bg-gradient-to-r from-black to-[#152246] min-h-screen flex justify-center items-center px-6 py-12">
//             <div className="max-w-4xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8 relative">
//                 {/* Back Button */}
//                 <svg
//                     className="w-10 text-white cursor-pointer hover:scale-110 transition absolute top-6 left-6"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     onClick={() => navigate("/home")}
//                     aria-label="Go back to home"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                 </svg>

//                 {/* Loading State */}
//                 {isLoading ? (
//                     <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//                     </div>
//                 ) : (
//                     <>
//                         {/* Error Message */}
//                         {error && <div className="text-red-500 mb-4">{error}</div>}

//                         {/* 📝 Edit Mode */}
//                         {isEditing ? (
//                             <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
//                                 {/* Blog Title */}
//                                 <input
//                                     type="text"
//                                     name="blogTitle"
//                                     value={data.blogTitle}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
//                                     placeholder="Enter Blog Title"
//                                 />

//                                 {/* Blog Content */}
//                                 <textarea
//                                     name="blogContent"
//                                     value={data.blogContent}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white"
//                                     rows={6}
//                                     placeholder="Enter Blog Content"
//                                 />

//                                 {/* Change Image */}
//                                 <div>
//                                     <label className="block mb-2 font-semibold">Change Image (optional):</label>
//                                     <input
//                                         type="file"
//                                         name="blogImage"
//                                         onChange={handleImageChange}
//                                         className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
//                                     />
//                                     {imagePreview && (
//                                         <img
//                                             src={imagePreview}
//                                             alt="Preview"
//                                             className="mt-4 w-full h-32 object-cover rounded-md"
//                                         />
//                                     )}
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="flex gap-4">
//                                     <button
//                                         type="submit"
//                                         className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
//                                     >
//                                         Save Changes
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsEditing(false)}
//                                         className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </form>
//                         ) : (
//                             // 📖 View Mode
//                             <>
//                                 <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-purple-400">
//                                     {data.blogTitle}
//                                 </h1>

//                                 <img
//                                     src={data.blogImage}
//                                     alt="Blog"
//                                     className="mt-4 mb-4 w-full h-[16rem] lg:h-[25rem] object-cover rounded-md shadow-lg"
//                                 />

//                                 {/* Expand/Collapse Button */}
//                                 <div className="flex justify-end mb-2">
//                                     <button
//                                         onClick={() => setIsExpanded(!isExpanded)}
//                                         className="text-gray-400 hover:text-gray-200 transition"
//                                         aria-label={isExpanded ? "Collapse" : "Expand"}
//                                     >
//                                         {isExpanded ? "▲ Collapse" : "▼ Expand"}
//                                     </button>
//                                 </div>

//                                 {/* Blog Content */}
//                                 <div className={`overflow-hidden ${isExpanded ? "" : "max-h-24"}`}>
//                                     <p className="text-lg text-gray-300 leading-relaxed">
//                                         {data.blogContent}
//                                     </p>
//                                 </div>

//                                 {/* Author Section */}
//                                 <div className="mt-6 flex items-center gap-4">
//                                     <h4 className="text-xl font-bold text-white">{data.blogAuthor}</h4>
//                                 </div>

//                                 {editButton && (
//                                     <button
//                                         onClick={() => setIsEditing(true)}
//                                         className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
//                                     >
//                                         Edit Blog
//                                     </button>
//                                 )}
//                             </>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BlogFull;