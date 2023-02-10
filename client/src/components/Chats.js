import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { useDispatch } from "react-redux";
import { setMessageWith } from '../state';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Chats = (props) => {

    
    const user2Id = props.user2Id;
    const messenger = useSelector((state) => state.messageWith) === user2Id;

    const dispatch = useDispatch();

    const changeMessage = () => {
        dispatch(setMessageWith({
            messageWith: user2Id
        }));
    };
    
  const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${user2Id}`);
  
  if(loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  const name = data.name;
  const age = data.age;
    

  return (
    <div onClick={changeMessage} className={messenger ? 'chats-box-active mx-2 p-3 font-bold' : 'chats-box mx-2 p-3 cursor-pointer'}>
        <p>{name} | {age} </p>
    </div>
  )
};

export default Chats;
