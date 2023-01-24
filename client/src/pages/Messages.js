import React from 'react'
import Nav from '../components/Nav'
import ChatRoom from '../components/ChatRoom';


const Messages = () => {
  return (
    <div>
      <Nav/>
      <div className='h-screen flex justify-center'>
        <div className='h-3/5 w-2/12 bg-slate-100 mt-4 rounded-lg'>
            {/* Chats */}
        </div>
        <div className='h-3/5 w-6/12 mt-4 relative'>
            <ChatRoom/>
        </div>
      </div>
    </div>
  )
}

export default Messages
