import React from 'react'
import { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'



const ChatRoom = () => {

    const firestore = firebase.firestore();

    const currentUserId = localStorage.getItem('id');

    const ref = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(20);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
  
      await messagesRef.add({
        message: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: "",
        userId: currentUserId
      })
  
      setFormValue('');
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (
        <div className='chat-form w-full'>
            <main>
            
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

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
