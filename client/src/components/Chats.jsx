import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { useDispatch } from "react-redux";
import { setMessageWith } from '../state';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';

const Chats = (props) => {

    const userId = localStorage.getItem('id');
    const user2Id = props.user2Id;
    const messenger = useSelector((state) => state.messageWith) === user2Id;

    const token = useSelector((state) => state.token);
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
    
  const deleteFriend = async () => {
    if(window.confirm("Are you sure you want to delete this friend?")){
        const response = await fetch(`http://localhost:4000/api/users/remove/${userId}/${user2Id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
        const data = await response.json();
        window.location.reload();
        if(!data.error){
            console.log(data)
        }
    }
  }

  return (
    <div onClick={changeMessage} className={messenger ? 'flex chats-box-active mx-2 p-3 font-bold' : 'flex chats-box mx-2 p-3 cursor-pointer'}>
        <p>{name} | {age} </p>
        <RiDeleteBinLine onClick={() => deleteFriend()} className={messenger ? 'mt-1 ml-auto text-white cursor-pointer' : 'mt-1 ml-auto cursor-pointer'}/>
    </div>
  )
};

export default Chats;
