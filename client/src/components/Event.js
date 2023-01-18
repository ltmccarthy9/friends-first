import { useState } from "react";
import axios from "axios";

const Event = ({ business, location, description, capacity, taken, category, id, date, time, attending }) => {

 // FUTURE: determine whether user has already joined event, don't default to false.
    // May create a prop and pass down value of joined and set useState() default to that value
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

    return (
        <div className="event">

            <div>
            <h3 className="event-location">{business}</h3>
            <p className="event-attribute">city: {location}</p>
            <p className="event-attribute">filled: {taken}/{capacity}</p>
            <p className="event-attribute">category: {category}</p>
            <p className="event-attribute">date: {date}</p>
            <p className="event-attribute">time: {time}</p>
            </div>

            
                <p className="event-description">{description}</p>
                {/* <Joinbutton key={id} id={id} attending={attending} /> */}
                
                <button onClick={() => joinEvent()} type={"button"} 
                className={joined ? "btn joined" : "btn join-button"}>
                {joined ? 'Joined' : 'Join'}
                </button>
                
           
        </div>
    );
}

export default Event;