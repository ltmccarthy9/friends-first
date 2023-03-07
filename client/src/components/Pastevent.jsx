import { useState } from 'react';
import Attendees from './Attendees';
import useFetch from '../hooks/useFetch';
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useSelector } from "react-redux";

const Pastevent = ({ business, location, date, attending, likes, id }) => {
   
    const [ menu, setMenu ] = useState(false)

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
        <div className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-50 rounded-lg w-full p-1 h-fit justify-center mb-2m">

            <div className="flex px-2 mt-3 justify-between">
                <div className='flex '>
                    <h3 className="font-bold tracking-tight text-xl text-gray-700 dark:text-gray-50"
                    >{business}</h3>
                    <p className="italic ml-3 mt-1 text-gray-700 dark:text-gray-50"
                    >{date}</p>
                </div>
                <div type='button' onClick={() => setMenu(!menu)} className='relative mx-2 cursor-pointer hover:text-slate-500'>
                <AiOutlineEllipsis size={25}/>
                <button type='button' onClick={deletePastEvent} className={menu ? 'absolute top-8 right-2 p-2 rounded-md text-gray-700 dark:text-gray-50 bg-gray-50 dark:bg-gray-800' : 'hidden'}>Delete</button>
                </div>
            </div>
            
            <div className="h-fit m-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
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