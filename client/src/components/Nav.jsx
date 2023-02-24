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
            navigate("/login")
        }
    }

    

  return (
      <div className="fixed justify-between top-0 w-full theme-dark navBar
       h-14 flex z-20 pt-1 mb-4 md:justify-between lg:justify-center">
        
        <a href='/events' 
        onClick={goDashboard} 
        className=" pt-2 font-extrabold tracking-tight text-[#536a74] hover:text-[#628797] text-3xl ml-4 mr-2
         cursor-pointer md:mr-32 lg:mr-32 xl:mr-32 2xl:mr-32"
         >Friends First.
        </a>
        
        <div className='hidden ml-auto md:flex lg:ml-44'>
            <a href='/events' onClick={goDashboard} 
            className={events ? ' cursor-pointer border-b-4 w-24 text-[#4b5b5b] border-[#f69400] hover:text-[#6f8585] px-2 pb-1 pt-2' 
            : ' cursor-pointer w-24 px-2 pb-1 pt-2 hover:text-[#6f8585]'}>
                <BsFillCalendar2EventFill size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Events</h4>
            </a>
            
            <a href='/profile' onClick={goProfile} 
            className={profile ? ' cursor-pointer border-b-4 w-24 text-[#4b5b5b] border-[#f69400] hover:text-[#6f8585] px-2 pb-1 pt-2' 
            : ' cursor-pointer w-24 px-2 pb-1 pt-2 hover:text-[#6f8585]'}>
                <BsPersonCircle size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Profile</h4>
            </a>

            <a href='/messages' onClick={goMessages} 
            className={messages ? ' cursor-pointer w-24 border-b-4 text-[#4b5b5b] border-[#f69400] hover:text-[#6f8585] px-3 pb-1 pt-2' 
            : 'cursor-pointer w-24 px-3 pb-1 pt-2 hover:text-[#6f8585]'}>
                <RiMessage2Fill size={18} className='cursor-pointer m-auto'/>
                <h4 className={'theme-dark cursor-pointer text-center text-sm'}>Messages</h4>
            </a>
            
            <button type='button' onClick={logout} className='signOut w-20 cursor-pointer my-2 ml-4 mr-1 font-bold'>
                Sign Out
            </button>
        </div>


        <button type='button' onClick={handleNav} className='absolute hover:text-black right-6 top-4 md:hidden'>
                    <AiOutlineMenu size={25} className='cursor-pointer' />
        </button>

        {/* menu bar small screen */}
        <div className={nav ? 'md:hidden fixed right-0 top-0 w-full h-screen bg-black/70 ease-in duration-200' : ''}>
                <div className={nav 
                    ? 'fixed right-0 top-0 w-[75%] sm:w-[50%] md:w-[45%] h-screen bg-white p-10 ease-in duration-200' 
                    : 'fixed right-[-100%] top-0 p-10 h-screen ease-in duration-200'}>
                    <div>
                        <div className='flex flex-col w-full items-center justify-between mt-8'>
                            <a onClick={goDashboard} className='m-2' href='/events'>
                                <FaHome color='#536a74' size={50} />
                            </a>
                            <a  onClick={goDashboard} href='/events' 
                            className='text-2xl m-4 hover:font-bold hover:text-[#536a74]'>
                                EVENTS
                            </a>
                            <a onClick={goProfile} href='/profile' 
                            className='text-2xl m-4 hover:font-bold hover:text-[#536a74]'>
                                PROFILE
                            </a>
                            <a onClick={goMessages} href='/messages'
                            className='text-2xl m-4 hover:font-bold hover:text-[#536a74]'>
                                MESSAGES
                            </a>
                            <button type='button' onClick={logout} 
                            className='signOut w-24 cursor-pointer p-2 mx-2 mt-6'>
                            Sign Out
                            </button>
                            <div onClick={handleNav} 
                            className='absolute top-4 right-6 rounded-full p-3 cursor-pointer hover:text-black'>
                                <AiOutlineClose size={22} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
  )
}

export default Nav;
