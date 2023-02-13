import { useState } from 'react';
import Attendees from './Attendees';
import useFetch from '../hooks/useFetch';
import { AiFillDelete } from 'react-icons/ai'
import { useSelector } from "react-redux";

const Pastevent = ({ business, location, date, attending, likes, id }) => {
   
    const token = useSelector((state) => state.token);

    // use token to grab userId instead of localstorage

    const userId = localStorage.getItem('id');

    const eventId = id;

    const deletePastEvent = async () => {
        if(window.confirm("Are you sure you sure you want to delete this past event?")){
            const response = await fetch(`http://localhost:4000/api/events/leave/${eventId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify ({
                    userId: userId
                })
            });
            const data = await response.json();
            console.log(data)
            window.location.reload();
        }
    }
    
    return (
        <div className={"pastEvent p-2 w-10/12 h-fit m-auto justify-center mt-1 mb-2 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12"}>

            <div className="w-full flex px-2 mt-3 justify-between">
                <div className='flex'>
                    <h3 className="theme-green font-bold tracking-tight text-xl">{business}</h3>
                    <p className="theme-green italic ml-3 mt-1">{date}</p>
                </div>
                <AiFillDelete onClick={deletePastEvent} className='cursor-pointer hover:text-slate-500' size={25}/>
            </div>
            
            <div className="h-fit m-auto grid grid-cols-4 lg:grid-cols-5">
                {/* map through attendees and return them as attendee component (other than user) */}
                    {attending.map((attendee, index) => {
                        if(attendee !== userId){
                            return <Attendees key={index} user2Id={attendee} likes={likes}/>;
                        }
                    })}
            </div>
            
            <div className='mt-3'>

            </div>
        </div>
    );
}

export default Pastevent;