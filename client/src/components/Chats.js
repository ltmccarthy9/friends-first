import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { useDispatch } from "react-redux";
import { setMessageWith } from '../state';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Chats = (props) => {

    let messenger = useSelector((state) => state.messageWith);
    const user2Id = props.user2Id;

    const [active, setActive] = useState(false);

    useEffect(() => {
        if(user2Id === messenger) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [messenger])

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
    <div onClick={changeMessage} className={active ? 'chats-box-active p-2 mb-2 font-extrabold' : 'chats-box p-2 my-1 cursor-pointer'}>
        <p>{name} | {age} </p>
    </div>
  )
};

export default Chats;
