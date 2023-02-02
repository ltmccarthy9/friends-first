import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';


const ChatRoom = () => {
  
  const [formValue, setFormValue] = useState('');
  
  const ref = useRef();

  var user = useSelector((state) => state.messageWith).trim();
  const currentUserId = localStorage.getItem('id').trim();
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('messages');
  const query= messagesRef.orderBy('createdAt').limit(20);
  const [messages, loading, error ] = useCollectionData(query, {idField: 'id'});

  let filteredMessages;

  if(messages) {
   filteredMessages = messages.filter(m => m.members.includes(currentUserId && user));
  } 

  console.log(user);
  console.log(filteredMessages)
  
  
  // const filteredMessages = messages.filter(obj => obj.members.includes(currentUserId && user2));
  // console.log(filteredMessages);

  //function for sending message
  const sendMessage = async (e) => {
    e.preventDefault();
    // add a new message document
    await messagesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      members: [currentUserId, user],
      message: formValue,
      photoURL: "",
      senderID: currentUserId,
    })
    setFormValue('');
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

    return (
        <div className='chat-form w-full'>
            <main>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>}
            {/* map through message documents and dispay each using ChatMessage componenet */}
            {filteredMessages && filteredMessages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />)}

            <span ref={ref}></span>

            </main>

            <form className='w-full m-2 flex' onSubmit={sendMessage}>

                <input className='p-2 h-10 w-11/12 rounded-lg mt-2' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message..." />

                <button className='font-bold hover:bg-slate-200 transition-all cursor-pointer bg-slate-100 rounded-md ml-2 mt-2 p-2' type="submit" disabled={!formValue}>send</button>

            </form>
        </div>
        )
};

export default ChatRoom;
