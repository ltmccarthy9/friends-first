import { useState } from "react";
import axios from "axios";
import {GiCheckMark} from 'react-icons/gi'

const Event = ({ business, location, description, capacity, taken, category, id, date, time, attending }) => {
   
    // state for event cards - updating spots taken and whether user joined or not
    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    const userId = localStorage.getItem('id');
    
    const eventId = id;


    const joinEvent = () => {
        if(!joined) {
            axios.patch(`http://localhost:4000/api/events/join/${eventId}`,
            { 
                userId: userId
            }).then(response => {
                console.log(response.data);
                setJoined(true);
                setFilled(filled + 1);
            }).catch(error => {
                console.log(error);
            });

        } else {
            if(window.confirm("Are you sure you want to leave this event?")) {
                axios.patch(`http://localhost:4000/api/events/leave/${eventId}`, 
                {
                    userId: userId,
                    remove: true
                }).then(response => {
                    console.log(response.data);
                    setJoined(false);
                    setFilled(filled - 1);
                }).catch(error => {
                    console.log(error);
                });
                   
            }
        }
    }

    return (
        <div className="event w-full m-6 h-64 ">

            {/* Top row */}
            <div className="flex justify-between" >
            <h3 className="w-3/12 font-extrabold tracking-tight text-lg">{business}</h3>
            <p className="p-4 ">{location}</p>
            <p className="p-4">Filled: {filled}/{capacity}</p>
            <p className="p-4">{date}</p>
            <p className="p-4">{time}</p>
            </div>

            {/* middle row */}
            <div className="flex m-4">
                <div>
                <p className="event-description">{description}</p>
                </div>
                <div>

                </div>
            </div>

            {/* Bottom row */}
            <button onClick={() => joinEvent()} type={"button"} 
                className={joined ? "btn joined mb-0"  : "btn join-button mb-0"}>
                {joined ? `Joined` : 'Join'}
            </button>
                
                
           
        </div>
    );
}

export default Event;