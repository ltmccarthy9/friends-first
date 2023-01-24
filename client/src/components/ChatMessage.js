import React from 'react'


const ChatMessage = (props) => {
  const { message, userId } = props.message;

  const currentUid = localStorage.getItem('id');

  const sender = userId === currentUid ? 'sent' : 'received';

  return (
    <div className={`message ${sender} rounded-lg p-2`}>
      <p>{message}</p>
    </div>
  )
}

export default ChatMessage;
