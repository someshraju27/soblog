import React,{useState,useContext,useEffect} from 'react';
import Navigation from '../Navigation';
import TrendingBlogs from '../TrendingBlogs';
import RegularBlogs from '../RegularBlogs';
import Footer from './Footer';
import AboutUs from './AboutUs';

import CreateBlog from './CreateBlog';
import { useNavigate } from 'react-router-dom';
import { store } from '../App';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AdminPanel from '../AdminPanel';

const Home = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(
        {
            id:"",
            username:"",
            email:"",
            profileImage:"",
            role:""
        }
    )

    const token =localStorage.getItem('token');

    useEffect(()=>{

        
        if(!token){
            navigate('/login');
        }
        axios.get(`${process.env.REACT_APP_API_URL}/home`,
            { headers: { Authorization: `Bearer ${token}` } 

    }).then((res)=>setData(res.data.user)).catch((err)=>console.log(err.message));
},[token,navigate]);

    return (
        <div className="flex flex-col min-h-screen w-full lg:overflow-hidden bg-gradient-to-r from-black to-[#152246]">
           <Navigation 
                        id={data.id}
                        name={data.username}
                        email={data.email}
                        image={data.profileImage}
                        role={data.role}
           />
            
            {/* Main Content */}
            <div className="flex-grow">
                <TrendingBlogs />
                <RegularBlogs />
                <AboutUs />
                 <Footer />
            </div>

          
          
        </div>
    );
};

export default Home;
