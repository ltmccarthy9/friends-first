import { useState } from 'react';
import Attendees from './Attendees';
import useFetch from '../hooks/useFetch';


const Pastevent = ({ business, location, date, attending, likes }) => {
   
    // use token to grab userId instead of localstorage
    const userId = localStorage.getItem('id');

    
    return (
        <div className={"event w-9/12 h-fit m-auto justify-center p-3 mt-1 mb-4 md:w-6/12 lg:w-5/12 xl:w-3/12"}>

            {/* Top row */}
            <div className="w-full flex p-2 justify-between">
                <h3 className="theme-green font-extrabold tracking-tight text-2xl">{business}</h3>
                <p className="theme-green font-bold italic p-1">{date}</p>
            </div>

            <p className='m-auto p-2'>Stay in contact with your new friends!</p>
            
            <div className="h-fit w-11/12 m-auto">
                {/* map through attendees and return them as attendee component (other than user) */}
                    {attending.map((attendee, index) => {
                        if(attendee !== userId){
                            return <Attendees key={index} user2Id={attendee} likes={likes}/>;
                        }
                    })}
                </div>
                <div className='mt-4'>

                </div>
        </div>
    );
}

export default Pastevent;