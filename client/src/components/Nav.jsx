import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi'
import { FaHome } from 'react-icons/fa';
import Theme from './Theme';
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPage } from '../state';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/auth'

const Nav = ({dark, setDark}) => {

    //This is the boolean state for opening and closing popout navigation menu
    const [nav, setNav] = useState(false);
    
    //useNavigate for changing pages
    const navigate = useNavigate();
    
    //useDispatch hook for logging out user
    const dispatch = useDispatch();
    
    //this is for nav styling depending on current page
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
      <nav className="bg-gray-50 dark:bg-[#343c48] text-gray-700 dark:text-gray-50 flex justify-center fixed top-0 w-full h-14 z-20 pt-2 mb-4 px-4">
        <div className='flex justify-between h-full w-full max-w-7xl'>
        <section className='flex flex-grow my-auto'>
            <a href='/events' 
            className="font-extrabold text-2xl
            cursor-pointer mb-2 hover:text-gray-500 dark:hover:text-gray-300"
            >Friends First.
            </a>
        </section>
        
        <section className='hidden h-full flex-grow-0 md:flex md:justify-end lg:ml-44'>
            <div className='flex md:mr-12 h-full' >
                <a href='/events'
                className={events ? 'h-full pt-1 px-2 cursor-pointer border-b-4 w-24  hover:text-gray-500 dark:hover:text-gray-300 border-teal-500' 
                : ' cursor-pointer pt-1 px-2  w-24 hover:text-gray-500 dark:hover:text-gray-300'}>
                    <BsFillCalendar2EventFill size={18} className='cursor-pointer m-auto'/>
                    <h4 className={' cursor-pointer text-center text-sm'}>Events</h4>
                </a>
                
                <a href='/profile' 
                className={profile ? 'pt-1 px-2  cursor-pointer border-b-4 w-24  hover:text-gray-500 dark:hover:text-gray-300 border-teal-500' 
                : ' cursor-pointer w-24 pt-1 px-2 hover:text-gray-500 dark:hover:text-gray-300'}>
                    <BsPersonCircle size={18} className='cursor-pointer m-auto'/>
                    <h4 className={' cursor-pointer text-center text-sm'}>Profile</h4>
                </a>

                <a href='/messages'
                className={messages ? 'cursor-pointer pt-1 px-2  w-24 border-b-4  hover:text-gray-500 dark:hover:text-gray-300 border-teal-500' 
                : 'cursor-pointer w-24 pt-1 px-2 hover:text-gray-500 dark:hover:text-gray-300'}>
                    <RiMessage2Fill size={18} className='cursor-pointer m-auto'/>
                    <h4 className={' cursor-pointer text-center text-sm'}>Messages</h4>
                </a>
                <Theme dark={dark} setDark={setDark}/>
            </div>

                <button type='button' onClick={logout}
                className='h-10 flex my-auto mb-2 pt-2 p-2 bg-teal-500 hover:bg-teal-600 text-gray-50 rounded-lg font-bold cursor-pointer ease-in duration-100'>
                    <FiLogOut className='my-1 mx-2'/>
                </button>
            
            
        </section>
        </div>


        <button type='button' onClick={handleNav} className='absolute text-gray-700 dark:text-gray-50 right-6 top-4 md:hidden'>
                    <AiOutlineMenu size={25} className='cursor-pointer' />
        </button>

        {/* menu bar small screen */}
        <div className={nav ? 'md:hidden fixed right-0 top-0 w-full h-screen bg-black/70 ease-in duration-200' : ''}>
                <div className={nav 
                    ? 'fixed right-0 top-0 w-[60%] sm:w-[50%] md:w-[45%] h-screen bg-gray-50 dark:bg-gray-700 p-10 ease-in duration-200' 
                    : 'fixed right-[-100%] top-0 p-10 h-screen ease-in duration-200'}>
                    <div>
                        <section className='flex flex-col w-full items-center justify-between mt-8 ease-in duration-100'>
                            <a className='m-2' href='/events'>
                                <FaHome className='hover:scale-105 hover:text-teal-600 ease-in duration-100' size={50} />
                            </a>
                            <a href='/events' 
                            className='text-lg w-full my-2 p-2 rounded-lg text-center hover:text-gray-800 hover:bg-[#d5d9dc] ease-in duration-100'>
                                Events
                            </a>
                            <a href='/profile' 
                            className='text-lg w-full my-2 p-2 rounded-lg text-center hover:text-gray-800 hover:bg-[#d5d9dc] ease-in duration-100'>
                                Profile
                            </a>
                            <a href='/messages'
                            className='text-lg w-full my-2 p-2 rounded-lg text-center hover:text-gray-800 hover:bg-[#d5d9dc] ease-in duration-100'>
                                Messages
                            </a>
                            <button type='button' onClick={logout} 
                            className='text-lg w-full my-8 p-2 rounded-lg text-center hover:text-gray-800 hover:bg-[#d5d9dc] ease-in duration-100 '>
                            Sign Out
                            </button>
                            <Theme dark={dark} setDark={setDark}/>
                            <button type='button' onClick={handleNav} 
                            className='absolute top-4 right-6 rounded-full p-2 cursor-pointer hover:text-gray-900 hover:bg-gray-300 ease-in duration-100 '>
                                <AiOutlineClose size={22} />
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        
        </nav>
  )
}

export default Nav;
