import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


const Event = ({ business, location, description, capacity, taken, id, date, time, attending }) => {
   
    // state for event cards - updating spots taken and whether user joined or not
    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    const userId = localStorage.getItem('id');
    
    const eventId = id;

    const token = useSelector((state) => state.token);

    const joinEvent = async () => {
        if(!joined) {
            const response = await fetch(`http://localhost:4000/api/events/join/${eventId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            const data = await response.json();
            if(!data.error){
                setJoined(true)
                setFilled(filled + 1)
                console.log(data)
            }
            

        } else {
            if(window.confirm("Are you sure you want to leave this event?")) {
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
            if(!data.error) {
                setJoined(false)
                setFilled(filled - 1)
            }
            
                   
            }
        }
    }


    return (
        <div className="event w-10/12 h-44 m-auto justify-center p-2 mt-4 md:w-6/12 lg:w-4/12 ">

            {/* Top row */}
            <h3 className="w-full theme-green font-extrabold tracking-tight text-3xl p-1">{business}</h3>
            <div className="flex justify-between border-b-2 border-slate-500" >
            <p className="theme-green p-1 font-bold italic">{location}</p>
            <p className="theme-green p-1 font-bold italic">Filled: {filled}/{capacity}</p>
            <p className="theme-green p-1 font-bold italic">{date}</p>
            <p className="theme-green p-1 font-bold italic">{time}</p>
            </div>

            {/* middle row */}
            <div className="flex p-1">
                <div>
                <p className="theme-green text-s">{description}</p>
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