import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { RiUser2Fill } from 'react-icons/ri';


const ChatRoom = () => {

  const [formValue, setFormValue] = useState('');
  const ref = useRef()

   // grab # of friends and the user we're messaging with from state
  // if 0 friends, display "no friends"
  let friends = (useSelector((state) => state.friends))
  const user = useSelector((state) => state.messageWith);
  console.log(friends)
  // grab current user
  const currentUserId = localStorage.getItem('id');
  
  // would use this if I wanted to wrap functionality
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if(user) {
  //     console.log(user);
  //     console.log(firebase.auth().user)
  //     var uid = user.uid
  //     user.getIdToken().then(function(idToken) {
  //       console.log(idToken)
  //     })

  //   } else {
  //     alert('user not authenticated')
  //   }
  // })
  
  //initialize firestore connection
  const firestore = firebase.firestore();
  const messagesRef = firestore.collection('messages')
  //create query and grab all messages that contain current user.
  const query = messagesRef.where("members", 'array-contains', currentUserId).orderBy('createdAt').limit(1000);
  //useCollectionData hook.
  const [messages, loading, error ] = useCollectionData(query, {idField: 'id'});
  let filteredMessages;

  if(error){
    console.log(error);
  }
  
  //filter messages for each message partner
  if(messages) {
   filteredMessages = messages.filter(m => m.members.includes(currentUserId) && m.members.includes(user));
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
            {friends ? filteredMessages && filteredMessages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />) 
            : <p className='font-light m-4 text-2xl relative'>Uh Oh! You have no friends.</p>}

            <span ref={ref}></span>

            </main>

            {friends ? <form className='chat-form mt-2' onSubmit={sendMessage}>

            <div className='flex'>
                <input className='chat-input bg-[#fbfcfc] p-2 h-10 w-11/12 rounded-lg mt-2' value={formValue} 
                onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message..." />

                <button className='font-bold transition-all cursor-pointer bg-[#fbfcfc] rounded-md ml-2 mt-2 p-2' 
                type="submit" disabled={!formValue}>send</button>
            </div>
            </form> : <div></div>}
        </div>
        )
};

export default ChatRoom;
