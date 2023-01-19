import { useState } from "react";
import axios from "axios";

const Yourevent = ({ business, location, description, capacity, taken, category, id, date, time, attending }) => {

    const [ joined, setJoined ] = useState(attending)

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
            }).catch(error => {
                console.log(error);
            });

            setJoined(true)
        } else {
            if(window.confirm("Are you sure you want to leave this event?")) {
                axios.patch(`http://localhost:4000/api/events/leave/${eventId}`, 
                {
                    userId: userId,
                    remove: true
                }).then(response => {
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                });
                   
            setJoined(false)
            }
        }
    }

    // each event card
    return (
        <div className="event">
            <div className="event-card-top justify-between">
            <h3 className="w-6/12">{business}</h3>
            <p className="m-2">city: {location}</p>
            <p className="m-2">filled: {taken}/{capacity}</p>
            <p className="m-2">category: {category}</p>
            <p className="m-2">date: {date}</p>
            <p className="m-2">time: {time}</p>
            </div>

            
                <p className="event-description">{description}</p>
                
                
                <button onClick={() => joinEvent()} type={"button"} 
                className={joined ? "btn joined" : "btn join-button"}>
                {joined ? 'Joined' : 'Join'}
                </button>
                
           
        </div>
    );
}

export default Yourevent;