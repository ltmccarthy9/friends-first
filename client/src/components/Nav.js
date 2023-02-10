import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsFillCalendar2EventFill, BsPersonCircle } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setFriends, setMessageWith, setPage } from '../state';
import useFetch from '../hooks/useFetch';

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

    //fetch our user
    const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
  
    //set friends and current message so when messages page is opened it's correctly rendered
    if(data) {
        dispatch(setFriends({
            friends: data.friends.length
        }));
        dispatch(setMessageWith({
            messageWith: data.friends[0]
        }))
    }

    const handleNav = () => {
        setNav(!nav);
    };
    
    // Navigate to dashboard page
    const goDashboard = () => {
        dispatch(setPage({
            page: 'events'
        }))
    };

    //navigate to profile page
    const goProfile = () => {
        dispatch(setPage({
            page: 'profile'
        }))
    }

    //navigate to messages page
    const goMessages = () => {
        dispatch(setPage({
            page: 'messages'
        }))
    }

    //logout function
    const logout = () => {
        if(window.confirm("Are you sure you want to log out?")) {
            dispatch(setPage({
                page: 'events'
            }))
            dispatch(setLogout())
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            navigate("/")
        }
    }

    

  return (
      <div className="fixed top-0 w-full theme-dark navBar nav-bar-border h-fit flex justify-center z-20 mb-4">
        <a href='/dashboard' onClick={goDashboard} className="pt-1 font-extrabold tracking-tight hover:text-black text-4xl ml-4 mr-2 cursor-pointer sm:mr-22 md:mr-32 lg:mr-32 xl:mr-32 2xl:mr-32" >Friends First.</a>
        
        <div className='hidden md:flex'>
            <a href='/dashboard' onClick={goDashboard} className={events ? 'cursor-pointer border-b-4 w-24 text-black border-black px-2 pb-1 pt-2' : 'cursor-pointer w-24 px-2 pb-1 pt-2 hover:text-black'}>
                <BsFillCalendar2EventFill size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Events</h4>
            </a>
            
            <a href='/profile' onClick={goProfile} className={profile ? 'cursor-pointer border-b-4 w-24 text-black border-black px-2 pb-1 pt-2' : ' cursor-pointer w-24 px-2 pb-1 pt-2 hover:text-black'}>
                <BsPersonCircle size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Profile</h4>
            </a>

            <a href='/messages' onClick={goMessages} className={messages ? 'cursor-pointer w-24 border-b-4 text-black border-black px-3 pb-1 pt-2' : 'cursor-pointer w-24 px-3 pb-1 pt-2 hover:text-black'}>
                <RiMessage2Fill size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Messages</h4>
            </a>
            
            <button type='button' onClick={logout} className='signOut w-24 cursor-pointer my-2 ml-12 font-bold'>
                Sign Out
            </button>
        </div>


        <div onClick={handleNav} className='absolute right-6 top-2 md:hidden'>
                    <AiOutlineMenu size={25} className='cursor-pointer' />
        </div>

        {/* menu bar small screen */}
        <div className={nav ? 'md:hidden fixed right-0 top-0 w-full h-screen bg-black/70' : ''}>
                <div className={nav 
                    ? 'fixed right-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-200' 
                    : 'fixed right-[-100%] top-0 p-10 ease-in duration-500'}>
                    <div>
                        <div className='flex flex-col w-full items-center justify-between mt-8'>
                            <a className='m-2' href='/dashboard'>
                                <FaHome color='#536a74' size={50} />
                            </a>
                            <a className='text-2xl m-4 hover:font-bold hover:text-[#536a74]' href='/dashboard'>
                                EVENTS
                            </a>
                            <a className='text-2xl m-4 hover:font-bold hover:text-[#536a74]' href='/profile'>
                                PROFILE
                            </a>
                            <a className='text-2xl m-4 hover:font-bold hover:text-[#536a74]' href='/messages'>
                                MESSAGES
                            </a>
                            <button type='button' onClick={logout} className='signOut w-24 cursor-pointer p-2 mx-2 mt-6'>
                            Sign Out
                            </button>
                            <div onClick={handleNav} className='absolute top-4 right-6 rounded-full shadow-md shadow-gray-400 p-3 cursor-pointer'>
                                <AiOutlineClose />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
  )
}

export default Nav;
