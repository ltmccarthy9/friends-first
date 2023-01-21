import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../state';

const Nav = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    
    const dispatch = useDispatch();
    useEffect(() => {
        if(window.location.pathname.includes('profile')){
            setProfile(true)
        } else if(window.location.pathname.includes('dashboard')){
            setDashboard(true);
        }
    }, [])

    // Navigate to dashboard page
    const goDashboard = () => {
        navigate("/dashboard");
    };

    const logout = () => {
        if(window.confirm("Are you sure you want to log out?")) {
            dispatch(setLogout())
            localStorage.removeItem('user');
            localStorage.removeItem('email');
            navigate("/")
        }
    }

    const goProfile = () => {
        navigate("/profile");
    }

  return (
      <div className="theme-green nav-bar h-fit flex justify-center bg-slate-100 z-20 mb-20">
        <h1 onClick={goDashboard} className="my-auto font-extrabold tracking-tight text-3xl mr-32 cursor-pointer" >Friends First.</h1>
        
        <div className={dashboard ? 'border-b-4 border-slate-700 mx-2 p-4' : 'mx-2 p-4'}>
            <BsFillCalendar2EventFill onClick={goDashboard} size={22} className='cursor-pointer ml-2'/>
            <h2 onClick={goDashboard} className={'theme-green cursor-pointer'}>Events</h2>
        </div>
        
        <div className={profile ? 'border-b-4 border-slate-700 mx-2 p-4' : 'mx-2 p-4'}>
            <BsPersonCircle onClick={goProfile} size={22} className='cursor-pointer ml-2'/>
            <h2 onClick={goProfile} className={'theme-green cursor-pointer'}>Profile</h2>
        </div>
        
        <div className='mx-2 p-4'>
            <RiLogoutCircleRFill onClick={logout} size={22} className='cursor-pointer ml-2'/>
            <h2 onClick={logout} className={'theme-green cursor-pointer'}>Logout</h2>
        </div>
        
        
        </div>
  )
}

export default Nav;
