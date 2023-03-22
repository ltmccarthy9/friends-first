import React from 'react'
import useFetch from '../hooks/useFetch';
import { useDispatch } from "react-redux";
import { setMessageWith, setFriends } from '../state';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineEllipsis } from 'react-icons/ai';

const Chats = (props) => {
    const [ menu, setMenu ] = useState(false)
    const userId = localStorage.getItem('id');
    const user2Id = props.user2Id;
    const messenger = useSelector((state) => state.messageWith) === user2Id;
    const friends = useSelector((state) => state.friends)
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const changeMessage = () => {
        dispatch(setMessageWith({
            messageWith: user2Id
        }));
    };
    
  const { userData, loading, error } = useFetch(`http://localhost:4000/api/users/${user2Id}`);
  
  if(loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }
  
  const getUserBirthdate = (birth) => {
    const currentDate = new Date()
    const birthdate = new Date(birth)
    let age = currentDate.getFullYear() - birthdate.getFullYear();
    const months = currentDate.getMonth() - birthdate.getMonth();
    if(months < 0 || (months === 0 && currentDate.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
  }
    
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
        dispatch((setFriends({
            friends: (friends - 1)
        })))
        window.location.reload();
        if(!data.error){
            console.log(data)
        }
    }
  }

  if(userData){
    return (
        <div onClick={changeMessage} 
        className={messenger ? 'flex bg-teal-300 dark:bg-teal-500 p-3 font-bold' 
        : 'flex chats-box hover:bg-gray-200 dark:hover:bg-gray-500 p-3 cursor-pointer'}>
            <p className={messenger ? 'text-gray-700 dark:text-gray-50' : 'text-gray-700 dark:text-gray-50'}>{userData.name} | {getUserBirthdate(userData.birthdate)}</p>
            <div onClick={() => setMenu(!menu)} 
            className='relative mt-1 ml-auto cursor-pointer hover:text-slate-500 ease-in duration-75'>
                <AiOutlineEllipsis className='dark:text-white' size={20} />
                <button type='button' onClick={deleteFriend} className={menu ? 'absolute top-5 right-2 p-2 rounded-md bg-slate-100 hover:bg-gray-400 text-gray-700 hover:text-gray-50' : 'hidden'}>Delete</button>
            </div>
          
        </div>
      )
  }
};

export default Chats;
