import React from 'react'
import Nav from '../components/Nav'
import ChatRoom from '../components/ChatRoom';
import Chats from '../components/Chats';
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setFriends } from '../state';

const Messages = () => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
  
  if(loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  const friends = data.friends;

  dispatch(setFriends({
    friends: data.friends.length
  }));

  

  return (
    <div className='h-screen mt-20'>
      <Nav/>
      <div className='flex justify-center pt-16'>
        <div className='chats-box-container flex-col px-2 py-3 chats-bar h-3/5 w-4/12 mt-4 sm:w-3/12 md:w-3/12 lg:w-2/12 xl:w-2/12 2xl:w-1/12'>
          {friends.map((friend, index) => {
              return <Chats key={index} index={index} user2Id={friend}/>;
          })}
        </div>
        <div className='h-3/5 w-7/12 mt-4 relative  sm:w-8/12 xl:w-7/12 2xl:w-6/12'>
            <ChatRoom/>
        </div>
      </div>
    </div>
  )
}

export default Messages
