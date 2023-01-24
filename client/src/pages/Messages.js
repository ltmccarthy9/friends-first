import React from 'react'
import Nav from '../components/Nav'
import ChatRoom from '../components/ChatRoom';


const Messages = () => {
  return (
    <div>
      <Nav/>
      <div className='h-screen flex justify-center'>
        <div className='h-3/5 w-2/12 border-2 mt-4'>
            {/* Chats */}
        </div>
        <div className='h-3/5 border-2 w-6/12 mt-4'>
            <ChatRoom/>
        </div>
      </div>
    </div>
  )
}

export default Messages
