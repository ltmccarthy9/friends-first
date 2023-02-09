import { useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsArrowRightSquare } from 'react-icons/bs';
import { CgArrowLeftR } from 'react-icons/cg';

const Event = ({ business, location, description, capacity, taken, id, date, time, attending }) => {
   
    // state for event cards - updating spots taken and whether user joined or not
    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    //state for expand button.  
    const [expanded, setExpanded] = useState(false);

    const userId = localStorage.getItem('id');
    const eventId = id;

    //grab our jwt from our state
    const token = useSelector((state) => state.token);

    //join event function.  We send the jwt for authorization so that the user can join the event
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
            //if there is no error, we set joined to true and fill is increased by 1
            if(!data.error){
                setJoined(true)
                setFilled(filled + 1)
                console.log(data)
            }
            
            // if the user has already joined, ask them for confirmation that they want to leave
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
            //Here we just do the opposite as shown above for the join functionality
            if(!data.error) {
                setJoined(false)
                setFilled(filled - 1)
            }
            }
        }
    }

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <div className={expanded && "overlay"}>
            <button onClick={handleExpand} type="button" className={expanded ? 'eventExpanded' :"event w-full h-48"}>
            <h3 className="mx-auto theme-green font-extrabold tracking-tight text-xl pt-3 px-3">{business}</h3>
            <h3 className="mx-auto theme-green font-semibold text-md italic">{location}</h3>
            <p className="mx-auto theme-green text-md mt-2">Filled: {filled}/{capacity} | {date} | {time}</p>
            {/* middle row */}
            <div className={"w-11/12 m-auto"}>
                <p className={expanded ? "description-expanded theme-green text-sm p-1" : "description theme-green text-sm p-1"}>{description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                 "</p>
            </div>
               
        </button>
        </div>
    );
}

export default Event;