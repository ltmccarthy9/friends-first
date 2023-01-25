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

    //connect to our message documents
    const messagesRef = firestore.collection('messages');
    // our query of our firebase data so that we order by most recent and only pull the 20 latest
    // will modify this to only pull the proper people for a given conversation
    // Will do this by passing in id of useer and 2nd user in conversation. (message documents with both user id and user2 id)
    const query = messagesRef.orderBy('createdAt').limit(20);
    //const query = messagesRef.where("includes", "array-contains-all", [`${userId}`, `${user2Id}]).orderBy('createdAt').limit(25);

    // grab messages from database with query parameters and grab message id
    const [messages] = useCollectionData(query, { idField: 'id' });
    //form value for sending messages
    const [formValue, setFormValue] = useState('');
  

    //function for sending message
    const sendMessage = async (e) => {
      e.preventDefault();
  
  
      // add a new message document using form value for the message, timestamp of doc creation, userId,
      //will add photo url later
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
            {/* map through message documents and dispay each using ChatMessage componenet */}
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
