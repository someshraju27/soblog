import React,{useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import {store} from './App';

const Navigation = ( props ) => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const { id, name, email, image,role } = props || {}; // Handle undefined user

    const [profile,setProfile] = useState(false);
    const [mobileMenu,setMobileMenu]=useState(false);
    const getProfile=()=>{
        setProfile(true);
      }
    const handleCloseProfile=()=>{
        setProfile(false);
    }
    const responsiveNav=()=>{
       setMobileMenu(!mobileMenu);
        }
        const handleLogout = () => {
          setToken("");
          localStorage.removeItem("token"); // Clear local storage if applicable
          navigate('/login');
        };
        

    return (
        <div>
<div className="h-[6rem] z-[9999] bg-customBlack fixed top-0 w-full">
        <div className="brand-logo absolute top-[1.7rem] left-[4rem] lg:top-2 lg:left-24">
        <div className="block md:inline bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-bold text-5xl md:text-6xl lg:text-7xl sm:shadow-custom">
  SoBlog
  </div>
        </div>
        <nav className="navigator hidden lg:inline absolute top-1 right-28">
            <ul className="text-customWhite flex flex-row">
            
             <li className="p-8"> <Link to="/home" className="hover:text-gray-400 text-2xl">Home</Link></li>
             <li className="p-8"> <Link to="/createblog" className="hover:text-gray-400 text-2xl">Blog</Link></li>
                <li className="p-8"> <ScrollLink to="about" smooth={true} offset={-90} duration={500} className="hover:text-gray-400 text-2xl cursor-pointer">About Us</ScrollLink></li>
                <li className="p-8"><ScrollLink to="footer" smooth={true} offset={-90} className="hover:text-gray-400 text-2xl cursor-pointer">Contact Us</ScrollLink></li>
            </ul>
        </nav>
        <div className="profile absolute top-6 right-4 lg:top-4 lg:right-8 cursor-pointer">
            <img src={image} className="rounded-full w-[3.3rem] h-[3.3rem] lg:w-[4rem] lg:h-[4rem]" alt="no profile" onClick={getProfile}/>  
        </div>
      {profile && (
  <div
    className="profile-container absolute top-12 right-4 w-64 p-4 rounded-xl bg-black bg-opacity-70 backdrop-blur-sm shadow-lg z-[10000]"
    id="my-profile"
  >
    {/* Close Button */}
    <button
      aria-label="Close profile"
      onClick={handleCloseProfile}
      className="absolute top-2 right-2 text-white hover:text-red-400 transition"
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>

    {/* Profile Info */}
    <div className="flex flex-col items-center space-y-2 mb-4">
      <img
        src={image}
        alt="User Profile"
        className="w-16 h-16 rounded-full object-cover"
      />
      <h2 className="text-lg font-semibold text-white">{name}</h2>
      <p className="text-sm text-gray-200">{email}</p>
    </div>

    {/* Links */}
    <div className="flex flex-col space-y-2">
      {role === "admin" && (
        <Link
          to="/admin"
          className="text-white text-center py-2 px-4 rounded border border-gray-400 hover:bg-gray-800 transition"
        >
          Admin Panel
        </Link>
      )}
      <Link
        to={`/myblogs/${id}`}
        className="text-white text-center py-2 px-4 rounded border border-gray-400 hover:bg-gray-800 transition"
      >
        My Blogs
      </Link>
    </div>

    {/* Logout */}
    <div className="flex justify-center mt-4">
      <button
        className="rounded-lg text-base px-6 py-2 bg-purple-700 text-white hover:bg-purple-800 transition border border-gray-400"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
)}        </div>

       <div className="block fixed top-8 left-4 lg:hidden z-[100000]" onClick={responsiveNav}>
        <button id="menu-toggle" className="focus:outline-none text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
          
      </div>
     
      {mobileMenu && (
  <div
    id="mobile-menu"
    className="fixed top-24 left-0 w-full bg-gray-800 bg-opacity-50 text-white z-20 flex flex-col items-center space-y-4 py-4"
  >
    <Link to="/" className="hover:text-gray-400 text-2xl"  onClick={() => setMobileMenu(false)}>
      Home
    </Link>
    <Link to="/createblog" className="hover:text-gray-400 text-2xl" onClick={() => setMobileMenu(false)}>
     Blog
     </Link>
     <ScrollLink to="about" smooth={true} duration={500} className="hover:text-gray-400 text-2xl" onClick={() => setMobileMenu(false)}>
     About Us
     </ScrollLink>
     <ScrollLink to="contact" smooth={true} duration={500} className="hover:text-gray-400 text-2xl" onClick={() => setMobileMenu(false)}>
      Contact Us
     </ScrollLink>
  </div>
)}

     
       
        </div>
    );
      }

export default Navigation;
