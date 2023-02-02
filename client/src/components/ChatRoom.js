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

  // grab # of friends and the user we're messaging with from state
  // if 0 friends, display "no friends"
  var friends = (useSelector((state) => state.friends) > 0)
  var user = useSelector((state) => state.messageWith).trim();
  // grab current user
  const currentUserId = localStorage.getItem('id').trim();
  //initialize firestore connection
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('messages');
  //create query
  const query= messagesRef.orderBy('createdAt').limit(40);
  //useCollectionData hook.
  const [messages, loading, error ] = useCollectionData(query, {idField: 'id'});

  let filteredMessages;

  //I decided to filter on the front end instead filtering with the query for the 
  //time being. was running into a lot of problems with the query.
  //if messages have loaded, filter them based on the convo ids
  if(messages) {
   filteredMessages = messages.filter(m => m.members.includes(currentUserId && user));
  } 

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
        <div>
            <main className='chat-messages-box w-full py-4'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Loading...</span>}
            {/* map through message documents and dispay each using ChatMessage componenet */}
            {friends ? filteredMessages && filteredMessages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />) : <p>You have no friends</p>}

            <span ref={ref}></span>

            </main>

            <form className='chat-form' onSubmit={sendMessage}>

                <input className='chat-input p-2 h-10 w-11/12 rounded-lg mt-2' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message..." />

                <button className='submit-message font-bold transition-all cursor-pointer bg-white rounded-md ml-2 mt-2 p-2' type="submit" disabled={!formValue}>send</button>

            </form>
        </div>
        )
};

export default ChatRoom;
