import React from 'react'
import useFetch from '../hooks/useFetch';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineCancelPresentation } from 'react-icons/md'
const Attendees = (props) => {

    const id = props.user2Id
    
    // Here I use the custom useFetch hook and pass in the user id in
    const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${id}`);
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // NEED TWO FUNCTIONS, ONE FOR ADDING FRIEND ONE FOR A NO RESPONSE
        //PATCH ADD FRIEND
        //PATCH REMOVE FRIEND

    // Will add a friends object in user model, where the key is the user id and the value is a boolean.
        //if both users have eachother as a true value, a chat is created.


  return (
    <div className='flex justify-between bg-slate-100 rounded-lg p-2 m-1'>
        {/* show picture of user here */}
       <p className='m-1'>{data.name}</p>
       <div className=' flex'>
            <MdOutlineCancelPresentation size={27} className='mx-2 my-1 hover:text-red-600 cursor-pointer'/>
            <AiOutlineUserAdd size={27} className='mx-2 my-1 hover:text-slate-400 cursor-pointer'/>
       </div>
    </div>
  );
}

export default Attendees;
