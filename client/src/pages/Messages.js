import React from 'react'
import Nav from '../components/Nav'
import ChatRoom from '../components/ChatRoom';


const Messages = () => {
  return (
    <div className='h-screen'>
      <Nav/>
      <div className='h-5/6 flex justify-center'>
        <div className='bg-slate-100 chats-bar h-3/5 w-4/12 mt-4 rounded-lg sm:w-3/12 md:w-3/12 lg:w-2/12 xl:w-2/12 2xl:w-1/12'>
            {/* Chats */}
        </div>
        <div className='h-3/5 w-7/12 mt-4 relative  sm:w-8/12 xl:w-7/12 2xl:w-6/12'>
            <ChatRoom/>
        </div>
      </div>
    </div>
  )
}

export default Messages
