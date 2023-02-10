import { useState } from 'react';
import Attendees from './Attendees';
import useFetch from '../hooks/useFetch';


const Pastevent = ({ business, location, date, attending, likes }) => {
   
    // use token to grab userId instead of localstorage
    const userId = localStorage.getItem('id');

    
    return (
        <div className={"pastEvent p-2 w-9/12 h-fit m-auto justify-center mt-1 mb-2 md:w-6/12 lg:w-5/12 xl:w-3/12"}>

            <div className="w-full flex px-2 mt-3 justify-between">
                <h3 className="theme-green font-bold tracking-tight text-xl">{business}</h3>
                <p className="theme-green font-bold italic">{date}</p>
            </div>
            
            <div className="h-fit m-auto grid grid-cols-3">
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