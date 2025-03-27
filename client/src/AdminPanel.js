import { useEffect, useState } from "react";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [pendingBlogs, setPendingBlogs] = useState([]);
    const [loading, setLoading] = useState({
        user: true,
        blogs: true,
        actions: false
    });
    const [error, setError] = useState({
        user: null,
        blogs: null,
        actions: null
    });
    const navigate = useNavigate();

    // Redirect if no token
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(prev => ({...prev, user: true}));
                setError(prev => ({...prev, user: null}));
                
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/home`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setUser(res.data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(prev => ({...prev, user: "Failed to load user data"}));
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setLoading(prev => ({...prev, user: false}));
            }
        };

        if (token) fetchUser();
    }, [token, navigate]);

    // Fetch pending blogs
    useEffect(() => {
        const fetchPendingBlogs = async () => {
            try {
                setLoading(prev => ({...prev, blogs: true}));
                setError(prev => ({...prev, blogs: null}));
                
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/pending`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setPendingBlogs(res.data);
            } catch (err) {
                console.error("Error fetching pending blogs:", err);
                setError(prev => ({...prev, blogs: "Failed to load pending blogs"}));
            } finally {
                setLoading(prev => ({...prev, blogs: false}));
            }
        };

        if (token) fetchPendingBlogs();
    }, [token]);

    // Approve Blog
    const handleApprove = async (id) => {
        try {
            setLoading(prev => ({...prev, actions: true}));
            setError(prev => ({...prev, actions: null}));
            
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/${id}/approve`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPendingBlogs(prev => prev.filter(blog => blog._id !== id));
        } catch (err) {
            console.error("Error approving blog:", err);
            setError(prev => ({...prev, actions: "Failed to approve blog"}));
        } finally {
            setLoading(prev => ({...prev, actions: false}));
        }
    };

    // Reject Blog
    const handleReject = async (id) => {
        try {
            setLoading(prev => ({...prev, actions: true}));
            setError(prev => ({...prev, actions: null}));
            
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/${id}/reject`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPendingBlogs(prev => prev.filter(blog => blog._id !== id));
        } catch (err) {
            console.error("Error rejecting blog:", err);
            setError(prev => ({...prev, actions: "Failed to reject blog"}));
        } finally {
            setLoading(prev => ({...prev, actions: false}));
        }
    };

    if (loading.user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex justify-center items-center">
                <div className="text-white text-2xl">Loading user data...</div>
            </div>
        );
    }

    if (error.user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-black to-[#152246] flex flex-col justify-center items-center">
                <div className="text-red-500 text-2xl mb-4">{error.user}</div>
                <Link to="/login" className="text-white underline">Please login again</Link>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-black to-[#152246]">
            <h1 className="text-customPurple text-3xl sm:text-4xl lg:text-5xl font-bold italic mb-6 text-center lg:text-left">
                Pending Blogs
            </h1>

            {loading.blogs ? (
                <div className="text-white text-center text-xl">Loading pending blogs...</div>
            ) : error.blogs ? (
                <div className="text-red-500 text-center text-xl">{error.blogs}</div>
            ) : pendingBlogs.length === 0 ? (
                <div className="text-white text-center text-xl">No pending blogs to review</div>
            ) : (
                <>
                    {error.actions && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                            {error.actions}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingBlogs.map((blog) => (
                            <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
                                <Blog 
                                    id={blog._id}
                                    role={user?.role}
                                    title={blog.title}
                                    content={blog.content}
                                    author={blog.userId?.name || "Unknown Author"}
                                    image={blog.blogImage}
                                />
                                <div className="flex gap-2 mt-4 justify-center">
                                    <button 
                                        onClick={() => handleApprove(blog._id)} 
                                        disabled={loading.actions}
                                        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition ${
                                            loading.actions ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {loading.actions ? "Processing..." : "Approve"}
                                    </button>
                                    <button 
                                        onClick={() => handleReject(blog._id)} 
                                        disabled={loading.actions}
                                        className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition ${
                                            loading.actions ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {loading.actions ? "Processing..." : "Reject"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            
            <div className="mt-8 text-center">
                <Link 
                    to="/home" 
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                >
                    Go back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;