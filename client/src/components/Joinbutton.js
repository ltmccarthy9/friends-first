import useFetch from "../hooks/useFetch";
import { useState } from "react";

const Joinbutton = (id) => {
    const [ joined, setJoined ] = useState(false)

    const email = localStorage.getItem('email');
    const eventId = id.id;
    console.log(eventId)

    const joinEvent = (e) => {
        if(!joined) {
            fetch('http://localhost:4000/api/events/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    eventId: eventId
                })
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

            setJoined(true)
        } else {
            if(window.confirm("Are you sure you want to leave this event?")) {
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
