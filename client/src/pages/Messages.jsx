import React from 'react'
import Nav from '../components/Nav'
import ChatRoom from '../components/ChatRoom';
import Chats from '../components/Chats';
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Messages = () => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');

  //UsEffect for properly handling profile conditional style
  useEffect(() => {
    dispatch(setPast({
        past: false
    }));
    dispatch(setUpcoming({
        upcoming: true
    }));
  }, []);

  //fetch user data using useFetch custom hook
  const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
  
  if(loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  //array of user's friends (other user ids)
  const friends = data.friends;

  return (
    <div className='h-screen mt-20'>
      <Nav/>
      <div className='flex justify-center pt-16 w-full m-auto md:w-10/12 xl:w-9/12 2xl:w-8/12'>
        <div className='chats-box-container flex-col h-3/5 w-4/12 sm:w-3/12 2xl:w-2/12'>
          <h2 className='theme-dark tracking-tight text-3xl m-2'>Chats</h2>
          {/* Map through friends array and return a chat component within the chats-box-container */}
          {friends.map((friend, index) => {
              return <Chats key={index} index={index} user2Id={friend}/>;
          })}
        </div>
        <div className='h-3/5 w-7/12 relative  sm:w-8/12 xl:w-7/12 2xl:w-6/12'>
            <ChatRoom/>
        </div>
      </div>
    </div>
  )
}

export default Messages
