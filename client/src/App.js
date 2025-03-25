import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './component/Home';
import Start from './component/Start';
import AdminPanel from './AdminPanel';
import AboutMe from './component/AboutUs';
import CreateBlog from './component/CreateBlog';
import Signup from './Signup';
import BlogFull from './BlogFull';
import Login from './Login';
import MyBlogs from './component/MyBlogs';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import AllBlogs from './AllBlogs';

export const store = createContext();

const App = () => {
    // ✅ Use useState (NOT useContext) for token
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <store.Provider value={[token, setToken]}>
            <Router>
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/createblog" element={<CreateBlog />} />
                        <Route path="/fullblog/:id" element={<BlogFull />} />
                        <Route path="/allblogs" element={<AllBlogs />} />
                        <Route path="/myblogs/:id" element={<MyBlogs />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </div>
            </Router>
        </store.Provider>
    );
};

export default App;
