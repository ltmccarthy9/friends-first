import React from 'react'
import useFetch from '../hooks/useFetch';

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


  return (
    <div className=' bg-slate-200 rounded-lg p-2 hover:bg-slate-300 m-1'>
        {/* show picture of user here */}
       <p>{data.name}</p>

    </div>
  );
}

export default Attendees;
