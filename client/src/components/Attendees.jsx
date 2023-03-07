import React, { useEffect } from 'react'
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { ImCheckmark } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../state';

const Attendees = (props) => {

    const dispatch = useDispatch();
    //grab jwt from state
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.friends)

    const id = props.user2Id
    const userId = localStorage.getItem('id');


    //set default state on "add friend" to whether that id is included in user's liked array
    const [added, setAdded ] = useState(props.likes.likes.includes(id));

    // fetch user data by using custom useFetch hook and id of attendee (other user)
    const { userData, loading, error } = useFetch(`http://localhost:4000/api/users/${id}`);
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    //function for liking another user
    const addFriend = async () => {
        const response = await fetch(`http://localhost:4000/api/users/add/${userId}/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            dispatch(setFriends({
                friends: (friends + 1)
            }))
            if(!data.error){
                alert(data)
                setAdded(true);
            }
    };

  return (
    <div className={added ? 'flex justify-between rounded-2xl m-1 p-1 bg-teal-300 text-gray-700' 
    : 'flex justify-between rounded-2xl m-1 p-1 dark:bg-gray-50 bg-gray-200 text-gray-700'}>
        {/* show picture of user here */}
       <p className={added ? ' text-gray-700 m-auto' : ' text-gray-700 m-auto'}>{userData.name}</p>
       <div className='flex'>
            {added ? <ImCheckmark size={27} className='mx-2 my-1 p-1'/>
            : <AiOutlineUserAdd onClick={addFriend} size={27} 
            className='mx-2 my-1 -1 hover:text-slate-400 cursor-pointer'/>}
       </div>
    </div>
  );
}

export default Attendees;
