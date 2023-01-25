import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiLogoutCircleRFill, RiMessage2Fill, RiLogoutBoxRFill } from 'react-icons/ri';
import { useDispatch } from "react-redux";
import { setLogout } from '../state';



const Nav = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    const [messages, setMessages] = useState(false);
    
    const dispatch = useDispatch();
    useEffect(() => {
        if(window.location.pathname.includes('profile')){
            setProfile(true)
        } else if(window.location.pathname.includes('dashboard')){
            setDashboard(true);
        } else {
            setMessages(true);
        }
    }, [])

    // Navigate to dashboard page
    const goDashboard = () => {
        navigate("/dashboard");
    };

    const goProfile = () => {
        navigate("/profile");
    }

    const goMessages = () => {
        navigate("/messages")
    }

    const logout = () => {
        if(window.confirm("Are you sure you want to log out?")) {
            dispatch(setLogout())
            localStorage.removeItem('user');
            localStorage.removeItem('email');
            navigate("/")
        }
    }

    

  return (
      <div className="theme-green nav-bar h-fit flex justify-center bg-slate-100 z-20 mb-12">
        <h1 onClick={goDashboard} className="py-3 font-extrabold tracking-tight text-3xl ml-4 mr-2 cursor-pointer sm:mr-32 md:mr-32 lg:mr-32 xl:mr-32 2xl:mr-32" >Friends First.</h1>
        
        <div onClick={goDashboard} className={dashboard ? 'cursor-pointer border-b-4 w-24 text-black border-slate-700 px-2 py-3' : 'cursor-pointer w-24 px-2 py-3 hover:text-black'}>
            <BsFillCalendar2EventFill size={26} className='cursor-pointer m-auto'/>
            <h2 className={'theme-green cursor-pointer text-center'}>Events</h2>
        </div>
        
        <div onClick={goProfile} className={profile ? 'cursor-pointer border-b-4 w-24 text-black border-slate-700 px-2 py-3' : ' cursor-pointer w-24 px-2 py-3 hover:text-black'}>
            <BsPersonCircle size={26} className='cursor-pointer m-auto'/>
            <h2 className={'theme-green cursor-pointer text-center'}>Profile</h2>
        </div>

        <div onClick={goMessages} className={messages ? 'cursor-pointer w-24 border-b-4 text-black border-slate-700 px-3 py-3' : 'cursor-pointer w-24 px-3 py-3 hover:text-black'}>
            <RiMessage2Fill size={26} className='cursor-pointer m-auto'/>
            <h2 className={'theme-green cursor-pointer text-center'}>Messages</h2>
        </div>
        
        <div onClick={logout} className='w-24 px-2 py-3 cursor-pointer hover:text-black'>
            <RiLogoutBoxRFill size={26} className='cursor-pointer m-auto'/>
            <h2 className={'theme-green cursor-pointer text-center'}>Logout</h2>
        </div>
        
        
        </div>
  )
}

export default Nav;
