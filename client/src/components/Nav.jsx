import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setFriends, setMessageWith, setPage } from '../state';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/auth'

const Nav = () => {

    const [nav, setNav] = useState(false);
    //useNavigate for changing pages
    const navigate = useNavigate();
    // utilize useDispatch hook for logging out
    const dispatch = useDispatch();
    const userId = localStorage.getItem('id');

    //for nav styling depending on current page
    const events =  useSelector((state) => state.page) === 'events'
    const profile = useSelector((state) => state.page) === 'profile'
    const messages =  useSelector((state) => state.page) === 'messages'

    const handleNav = () => {
        setNav(!nav);
    };

    //logout function
    const logout = () => {
        if(window.confirm("Are you sure you want to log out?")) {
            firebase.auth().signOut().then(() => {
                console.log('firebase user signed out')
              }).catch((error) => {
                console.log('error signing firebase user out ', error)
              });
            dispatch(setPage({
                page: 'events'
            }))
            dispatch(setLogout())
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            navigate("/login")
        }
    }

    

  return (
      <nav className="navBar fixed top-0 w-full h-18 z-20 pt-2 mb-4 sm:px-12 md:px-14 lg:px-20 xl:px-32 2xl:px-60 ">
        <div className='flex justify-between h-full'>
        <div className='flex flex-grow my-auto'>
            <a href='/events' 
            className="font-extrabold text-zinc-100 hover:text-zinc-100 text-2xl
            cursor-pointer"
            >Friends First.
            </a>
        </div>
        
        <div className='hidden h-full flex-grow-0 md:flex md:justify-end lg:ml-44'>
            <div className='flex md:mr-12 h-full' >
                <a href='/events'
                className={events ? 'h-full p-2 cursor-pointer border-b-4 w-24 text-zinc-100 hover:text-zinc-100 border-[#f69400]' 
                : ' cursor-pointer p-2 w-24 text-zinc-100 hover:text-zinc-300'}>
                    <BsFillCalendar2EventFill size={18} className='cursor-pointer m-auto'/>
                    <h4 className={'text-zinc-100 cursor-pointer text-center text-sm'}>Events</h4>
                </a>
                
                <a href='/profile' 
                className={profile ? 'p-2 cursor-pointer border-b-4 w-24 text-zinc-100 hover:text-zinc-100 border-[#f69400]' 
                : ' cursor-pointer w-24 p-2 text-zinc-100 hover:text-zinc-300'}>
                    <BsPersonCircle size={18} className='cursor-pointer m-auto'/>
                    <h4 className={'text-zinc-100 cursor-pointer text-center text-sm'}>Profile</h4>
                </a>

                <a href='/messages'
                className={messages ? 'cursor-pointer p-2 w-24 border-b-4 text-zinc-100 hover:text-zinc-100 border-[#f69400]' 
                : 'cursor-pointer w-24 p-2 text-zinc-100 hover:text-zinc-300'}>
                    <RiMessage2Fill size={18} className='cursor-pointer m-auto'/>
                    <h4 className={'text-zinc-100 cursor-pointer text-center text-sm'}>Messages</h4>
                </a>
            </div>
           
            
            <button type='button' onClick={logout}
             className='signOut my-auto pt-2 pr-2 pl-3 rounded-lg font-bold cursor-pointer flex justify-center h-10'>
                Sign Out
                <FiLogOut className='my-1 mx-2'/>
            </button>
        </div>
        </div>


        <button type='button' onClick={handleNav} className='absolute text-white right-6 top-2 md:hidden'>
                    <AiOutlineMenu size={25} className='cursor-pointer' />
        </button>

        {/* menu bar small screen */}
        <div className={nav ? 'md:hidden fixed right-0 top-0 w-full h-screen bg-black/70 ease-in duration-200' : ''}>
                <div className={nav 
                    ? 'fixed right-0 top-0 w-[60%] sm:w-[50%] md:w-[45%] h-screen bg-[#EDF2F6] p-10 ease-in duration-200' 
                    : 'fixed right-[-100%] top-0 p-10 h-screen ease-in duration-200'}>
                    <div>
                        <div className='flex flex-col w-full items-center justify-between mt-8 ease-in duration-100'>
                            <a className='m-2' href='/events'>
                                <FaHome className='hover:text-[#f69400]' size={50} />
                            </a>
                            <a href='/events' 
                            className='text-2xl m-4 hover:font-bold hover:text-[#f69400] ease-in duration-100'>
                                EVENTS
                            </a>
                            <a href='/profile' 
                            className='text-2xl m-4 hover:font-bold hover:text-[#f69400] ease-in duration-100'>
                                PROFILE
                            </a>
                            <a href='/messages'
                            className='text-2xl m-4 hover:font-bold hover:text-[#f69400] ease-in duration-100'>
                                MESSAGES
                            </a>
                            <button type='button' onClick={logout} 
                            className='w-24 cursor-pointer p-2 mx-2 mt-6 font-bold  hover:text-[#f69400]'>
                            Sign Out
                            </button>
                            <div onClick={handleNav} 
                            className='absolute top-4 right-6 rounded-full p-3 cursor-pointer hover:text-[#f69400]'>
                                <AiOutlineClose size={22} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </nav>
  )
}

export default Nav;
