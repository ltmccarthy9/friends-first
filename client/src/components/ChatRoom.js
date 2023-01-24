import React from 'react'
import { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'



const ChatRoom = () => {

    const firestore = firebase.firestore();

    const currentUserId = localStorage.getItem('id');

    const dummy = useRef();
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
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (
        <div className=' mt-28'>
            <main>
            
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}></span>

            </main>

            <form className='bottom-0' onSubmit={sendMessage}>

                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                <button className='cursor-pointer' type="submit" disabled={!formValue}>send</button>

            </form>
        </div>
        )
};

export default ChatRoom;
