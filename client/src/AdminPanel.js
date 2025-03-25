import { useEffect, useState, useContext } from "react";
import { store } from "./App";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
    // const [token, setToken] = useContext(store);
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const [pendingBlogs, setPendingBlogs] = useState([]);
    const navigate = useNavigate(); // ✅ Use React Router for navigation

    // ✅ Redirect if no token
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // ✅ Fetch user data
    useEffect(() => {
        console.log("Token:", token);
        
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}/home`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setUser(res.data.user))
            .catch((err) => console.error("Error fetching user:", err.message));
        }
    }, [token]);

    // ✅ Fetch pending blogs
    useEffect(() => {

        
        if (token) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/pending`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => setPendingBlogs(res.data))
            .catch((err) => console.error("Error fetching pending blogs:", err));
        }
    }, [token]);

    // ✅ Approve Blog
    const handleApprove = async (id) => {
        console.log(token);
        
        try {
            console.log(id);
            
            await axios.put(`${process.env.REACT_APP_API_URL}/api/${id}/approve`,{},
         
            { headers: { Authorization: `Bearer ${token}` } });

            setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error approving blog:", error);
        }
    };

    // ✅ Reject Blog
    const handleReject = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/${id}/reject`, {},
          
            { headers: { Authorization: `Bearer ${token}` } });

            setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error("Error rejecting blog:", error);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-black to-[#152246]  ">
            <h1 className="text-customPurple text-3xl sm:text-4xl lg:text-5xl font-bold italic mb-6 text-center lg:text-left">
                Pending Blogs
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingBlogs.map((blog) => (
                    <div key={blog._id} className="p-4 shadow-md">
                        <Blog 
                            id={blog._id}
                            role={user.role}
                            title={blog.title}
                            content={blog.content}
                            author={blog.userId.name}
                            image={blog.blogImage}
                        />
                        <div className="flex gap-2 mt-2">
                            <button 
                                onClick={() => handleApprove(blog._id)} 
                                className="bg-green-500 text-white px-6 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button 
                                onClick={() => handleReject(blog._id)} 
                                className="bg-red-500 text-white px-6 py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 text-center">
                <Link to="/home" className="text-red-700 text-xl underline">
                    Go back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;
