import React from 'react'
import ChatRoom from '../components/ChatRoom';
import Chats from '../components/Chats';
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming, setPage } from '../state';
import { useEffect } from 'react';


const Messages = () => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');

  //UseEffect for properly handling profile conditional style
  useEffect(() => {
    dispatch(setPast({
        past: false
    }));
    dispatch(setUpcoming({
        upcoming: true
    }));
    dispatch(setPage({
      page: 'messages'
  }))
  }, []);

  //fetch user data using useFetch custom hook
  const { userData, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
  
  if(loading) {
      return <p className='text-gray-700 dark:text-gray-50'>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  //array of user's friend's Ids
  const friends = userData.friends;

  return (
    <main className='mt-14 h-screen bg-slate-200 dark:bg-gray-600'>
      <div className='flex justify-center pt-16 w-full m-auto md:w-10/12 xl:w-9/12 2xl:w-8/12'>
        <section className='chats-box-container bg-gray-50  dark:bg-gray-700 flex-col w-4/12 sm:w-3/12 2xl:w-2/12'>
          <h2 className='text-gray-700 dark:text-gray-50 tracking-tight text-2xl m-2'>Chats</h2>
          {/* Map through friends array and return a chat component within the chats-box-container */}
          {friends.map((friend, index) => {
              return <Chats key={index} index={index} user2Id={friend}/>;
          })}
        </section>
        <section className='w-7/12 relative  sm:w-8/12 xl:w-7/12 2xl:w-6/12'>
            <ChatRoom/>
        </section>
      </div>
    </main>
  )
}

export default Messages
