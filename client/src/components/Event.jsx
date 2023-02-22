import { useState } from "react";
import { useSelector } from "react-redux";
import { setRefetch } from "../state";
import { useDispatch } from "react-redux";


const Event = ({ business, location, description, capacity, taken, id, date, time, attending, refetch }) => {
   
    // state for event cards - updating spots taken and whether user joined or not
    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    //state for expand button.  
    const [expanded, setExpanded] = useState(false);

    const userId = localStorage.getItem('id');
    const eventId = id;

    //grab our jwt from our state
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();

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
            dispatch(setRefetch({
                refetch: (!refetch)
            }))
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
            dispatch(setRefetch({
                refetch: (!refetch)
            }))
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
        <div onClick={expanded ? () => handleExpand() : null } 
        className={expanded ? "overlay" : 'overlaySmall'}>
            <button onClick={expanded ? null : () => handleExpand()} 
            type="button" 
            className={expanded ? 'eventExpanded max-w-xs sm:max-w-3xl' : "event relative w-full h-48 mb-3"}>
                <h2 className={expanded ? " font-extrabold tracking-tight text-4xl px-2" 
                : " mx-auto theme-dark font-extrabold tracking-tight text-3xl px-3"}
                >{business}</h2>
                <h3 className={expanded ? "text-white absolute top-0 right-0 p-3 font-bold tracking-tight text-xl"
                : "theme-dark absolute top-0 right-0 p-3 font-bold tracking-tight text-xl"}
                >{filled}/{capacity}</h3>
                <p className={expanded ? "mx-auto font-semibold text-lg mt-2" 
                : "mx-auto font-normal theme-green text-md mt-2"}
                >{date} | {time}</p>
            
                <p className={expanded ? "description-expanded text-md p-2" 
                : "hidden"}>{description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    "</p>
                
                <div className="absolute bottom-0 right-0">
                    {expanded ? joined ? <button onClick={() => joinEvent()} 
                    type="button" className="theme-green text-xl font-bold px-4 py-2 m-4 leaveBtn"
                    >Leave</button>
                    : <button onClick={() => joinEvent()} type="button" 
                    className="theme-green text-xl font-bold px-4 py-2 m-4 joinBtn"
                    >Join</button>   
                        : <p></p>}      
                </div>
            </button>
        </div>
    );
}

export default Event;