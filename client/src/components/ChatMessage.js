import React from 'react'


const ChatMessage = (props) => {
  //id of other user and chat message passed as props
  const { message, senderID } = props.message;

  //local user id
  const currentUid = localStorage.getItem('id');

  //determine whether the current user is the sender of the message or not for proper styling of messages
  const sender = senderID === currentUid ? 'sent' : 'received';

  return (
    <div className={`message ${sender} rounded-lg p-2`}>
      <p>{message}</p>
    </div>
  )
}

export default ChatMessage;
