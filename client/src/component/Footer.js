import React from "react";
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
const Footer = () => {
    return (
        <footer className="bg-customBlack text-white py-4 lg:py-8" id="footer">
            <div className="container mx-auto px-6 md:flex md:justify-between">
               
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2">
                        <Link to="/home" className="hover:underline">Home</Link>
                          
                        </li>
                        <li className="mb-2">
                        <Link to="/createblog" className="hover:underline">Blog</Link>
                        </li>
                        <li className="mb-2">
                        <ScrollLink to="about" smooth={true} duration={500} className="hover:underline cursor-pointer">
     About Us
     </ScrollLink>
    
                        </li>
                        <li className="mb-2">
                        <ScrollLink to="contact" smooth={true} duration={500} className="hover:underline cursor-pointer">
      Contact Us
     </ScrollLink>
                        </li>
                    
                    </ul>
                </div>

                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4 z-[9999]">
                        <a href="#" className="hover:text-gray-200 cursor-pointer">
                            <i className="fab fa-facebook-f"></i> {/* Facebook */}
                        </a>
                        <a href="https://x.com/SomeshRaju_27?t=uBvSIB12bCApiVlcHImIgw&s=08" className="hover:text-gray-200 cursor-pointer">
                            <i className="fab fa-twitter"></i> {/* Twitter */}
                        </a>
                        <a href="https://instagram.com/someshraju_27?igshid=ZGUzMzM3NWJiOQ==" className="hover:text-gray-200 cursor-pointer">
                            <i className="fab fa-instagram"></i> {/* Instagram */}
                        </a>
                        <a href="https://www.linkedin.com/in/somesh-raju-a47bab2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-gray-200 cursor-pointer" >
                            <i className="fab fa-linkedin-in"></i> {/* LinkedIn */}
                        </a>
                    </div>
                </div>

                
                <div>
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <p className="mb-2">Email: someshraju2715@gmail.com</p>
                    <p>Phone: +91 8919653968</p>
                </div>
            </div>

          
            <div className="mt-8 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Your Blog. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
