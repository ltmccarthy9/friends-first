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
            }).catch(error => {
                console.log(error);
            });

            setJoined(true);
            setFilled(filled + 1);
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
                   
            setJoined(false);
            setFilled(filled - 1);
            }
        }
    }

    return (
        <div className="event">

            <div>
            <h3 className="event-location">{business}</h3>
            <p className="event-attribute">city: {location}</p>
            <p className="event-attribute">filled: {filled}/{capacity}</p>
            <p className="event-attribute">category: {category}</p>
            <p className="event-attribute">date: {date}</p>
            <p className="event-attribute">time: {time}</p>
            </div>
            

            
                <p className="event-description">{description}</p>
                {/* <Joinbutton key={id} id={id} attending={attending} /> */}
                
                <button onClick={() => joinEvent()} type={"button"} 
                className={joined ? "btn joined"  : "btn join-button"}>
                {joined ? `Joined` : 'Join'}
                </button>
                
                
           
        </div>
    );
}

export default Event;