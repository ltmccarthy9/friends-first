import React from 'react'


const ChatMessage = (props) => {
  const { message, userId, photoURL } = props.message;

  const currentUid = localStorage.getItem('id');

  const sender = userId === currentUid ? 'sent' : 'received';

  return (<>
    <div className={`message ${sender}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{message}</p>
    </div>
  </>)
}

export default ChatMessage;
