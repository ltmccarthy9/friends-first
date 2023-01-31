import React from 'react'
import useFetch from '../hooks/useFetch';
import { useState } from 'react';

const Chats = (props) => {

    const user2Id = props.user2Id

    
  const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${user2Id}`);
  // fetch our events
  
  if(loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  const name = data.name;

  const age = data.age;
    

  return (
    <div className=' rounded-lg bg-stone-300 p-2 m-2 cursor-pointer hover:bg-stone-400'>
        <p>{name} | {age} </p>
    </div>
  )
};

export default Chats;
