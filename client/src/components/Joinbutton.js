import useFetch from "../hooks/useFetch";
import { useState } from "react";
import axios from "axios";

const Joinbutton = (id) => {
    // FUTURE: determine whether user has already joined event, don't default to false.
    // May create a prop and pass down value of joined and set useState() default to that value
    const [ joined, setJoined ] = useState(false)

    const userId = localStorage.getItem('id');
    //Here I was running into an error because I was passing in an object instead of a string which was
    //slightly confusing because of the double id name.
    //To fix this I simply had to access only the value on id -> (id.id)
    const eventId = id.id;

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
    <button onClick={() => joinEvent()} type={"button"} 
        className={joined ? "btn joined" : "btn join-button"}>
        {joined ? 'Joined' : 'Join'}
    </button>
  )
}

export default Joinbutton;
