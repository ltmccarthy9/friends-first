import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiLogoutCircleRFill } from 'react-icons/ri';

const Nav = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);
    const [dashboard, setDashboard] = useState(false);
    
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
            localStorage.removeItem('user');
            localStorage.removeItem('email');
            navigate("/")
        }
    }

    const goProfile = () => {
        navigate("/profile");
    }

  return (
    <div>
      <div className="theme-green nav-bar h-fit flex justify-center bg-slate-100">
        <h1 className="my-auto font-extrabold tracking-tight text-3xl mr-20 cursor-pointer" >Friends First.</h1>
        
        <div className={dashboard ? 'border-b-2 border-slate-700 mx-2 p-4' : 'mx-4 p-4'}>
            <BsFillCalendar2EventFill onClick={goDashboard} size={25} className='cursor-pointer ml-2'/>
            <h2 onClick={goDashboard} className={'theme-green cursor-pointer'}>Events</h2>
        </div>
        
        <div className={profile ? 'border-b-2 border-slate-700 mx-2 p-4' : 'mx-4 p-4'}>
            <BsPersonCircle onClick={goProfile} size={25} className='cursor-pointer ml-2'/>
            <h2 onClick={goProfile} className={'theme-green cursor-pointer'}>Profile</h2>
        </div>
        
        <div className='mx-2 p-4'>
            <RiLogoutCircleRFill onClick={logout} size={25} className='cursor-pointer ml-2'/>
            <h2 onClick={logout} className={'theme-green cursor-pointer'}>Logout</h2>
        </div>
        
        
        </div>
    </div>
  )
}

export default Nav;
