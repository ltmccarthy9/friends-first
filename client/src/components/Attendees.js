import React from 'react'
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { useSelector } from "react-redux";
import { ImCheckmark } from 'react-icons/im';

const Attendees = (props) => {

    const [added, setAdded ] = useState(false);

     //grab our jwt from our state
     const token = useSelector((state) => state.token);

    const id = props.user2Id
    const userId = localStorage.getItem('id');

    // Here I use the custom useFetch hook and pass in the user id in
    const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${id}`);
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const addFriend = async () => {
        const response = await fetch(`http://localhost:4000/api/users/add/${userId}/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if(!data.error){
                console.log(data)
                setAdded(true);
            }
    };

  return (
    <div className='flex justify-between bg-slate-100 rounded-lg p-2 m-1'>
        {/* show picture of user here */}
       <p className='m-1'>{data.name}</p>
       <div className=' flex'>
            <MdOutlineCancelPresentation size={27} className='mx-2 my-1 hover:text-red-600 cursor-pointer'/>
            
            {added ? <ImCheckmark onClick={addFriend} size={27} className='mx-2 my-1 hover:text-slate-400 cursor-pointer'/>
            : <AiOutlineUserAdd onClick={addFriend} size={27} className='mx-2 my-1 hover:text-slate-400 cursor-pointer'/>}
       </div>
    </div>
  );
}

export default Attendees;
