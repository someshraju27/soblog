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
       {profile &&  <div className="profile-container absolute top-12 right-4 p-4 rounded bg-black bg-opacity-50 z-10" id="my-profile">
            <div className="profile-details mb-4">
                <div className="profile-image flex justify-center"><img src={image} alt="User Profile Image"  width="50px" height="50px" className="rounded-full" /></div> 
                <div className="profile-user-name text-md lg:text-xl flex justify-center font-bold text-white">{name}</div> 
                <div className="profile-user-mail text-sm flex justify-centert text-white mb-2 lg:mb-6">{email}</div> 
             { role=="admin"? <Link to={'/admin'} className='text-white border-1 z-10 p-2 ml-8 mb-2 border-2 border-gray-400 transition ease-out duration-300 block'>Admin Panel</Link>
               : " "}  <Link to={`/myblogs/${id}`} className='text-white border-1 z-10 p-2 ml-14 lg:ml-10 hover:border-2 lg:mb-8 border-gray-400 transition ease-out duration-300'>MyBlogs</Link>
                <svg
  className="w-6 absolute top-0 right-2 mt-2 text-white cursor-pointer transition ease-out duration-300"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  onClick={handleCloseProfile}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  />
</svg>

                  
            </div>
            <div className="flex justify-center m-1"><button className="profile-lgbtn rounded-lg text-base p-2 bg-customPurple text-white hover:border-2 border-gray-400 transition ease-out duration-300"onClick={handleLogout}>Logout</button></div>
        </div>}
        </div>

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