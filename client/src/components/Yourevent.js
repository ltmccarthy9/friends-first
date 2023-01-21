import { useState } from "react";
import axios from "axios";

const Yourevent = ({ business, location, description, capacity, taken, category, id, date, time, attending }) => {

    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    const userId = localStorage.getItem('id');
    //Here I was running into an error because I was passing in an object instead of a string which was
    //slightly confusing because of the double id name.
    //To fix this I simply had to access only the value on id -> (id.id)
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
                    setFilled(filled + 1);
                }).catch(error => {
                    console.log(error);
                });
            
            }
        }
    }

    // each event card
    return (
        <div className="event w-10/12 h-96 m-auto justify-center p-2 mt-4 md:w-6/12 lg:w-4/12 ">

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

export default Yourevent;