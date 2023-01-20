import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiLogoutCircleRFill } from 'react-icons/ri';

const Nav = () => {

    const navigate = useNavigate();

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
      <div className="nav nav-bar h-fit flex justify-center bg-slate-100">
        <h1 className="dash-title font-extrabold tracking-tight text-3xl mr-20 cursor-pointer" >Friends First.</h1>
        <BsFillCalendar2EventFill size={25} className='ml-6 mr-1 my-3 cursor-pointer'/>
        <div onClick={goDashboard} className={'nav mr-6 ml-0 my-3 rounded-md cursor-pointer'}>Events</div>
        <BsPersonCircle size={25} className='ml-6 mr-1 my-3 cursor-pointer'/>
        <div onClick={goProfile} className={'nav mr-6 ml-0 my-3 rounded-md cursor-pointer'}>Profile</div>
        <RiLogoutCircleRFill size={28} className='ml-6 mr-1 my-3 cursor-pointer'/>
        <div onClick={logout} className={'nav mr-6 ml-0 my-3 rounded-md cursor-pointer'}>Logout</div>
        </div>
    </div>
  )
}

export default Nav;
