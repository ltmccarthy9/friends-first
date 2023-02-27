import { useState } from "react";
import { useSelector } from "react-redux";
import { setRefetch } from "../state";
import { useDispatch } from "react-redux";
import { BiDrink } from 'react-icons/bi'
import { GiBasketballBall, GiKnifeFork } from 'react-icons/gi';
import { CgTrees } from 'react-icons/cg'


const Event = ({ business, address, description, capacity, taken, category, id, date, time, attending, refetch, distance}) => {
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

    
    // icons for event category
        let icon;
        if(category.includes('bar')) {
            icon = <div className="flex pt-1 ml-1 mr-auto text-indigo-600"><BiDrink size={18}/></div>
        } else if (category.includes('sport')) {
         icon = <div className="pt-1 ml-1 mr-auto text-orange-700"><GiBasketballBall size={18}/></div>
        } else if (category.includes('restaurant')) {
        icon = <div className="pt-1 ml-1 mr-auto text-gray-800"><GiKnifeFork size={18}/></div>
        }
        else {
        icon = <div className="pt-1 ml-1 mr-auto text-green-600"><CgTrees size={18}/></div>
        }
    
    

    return (
        <div onClick={expanded ? () => handleExpand() : null } 
        className={expanded ? "overlay" : 'overlaySmall'}>
            <button onClick={expanded ? null : () => handleExpand()} 
            type="button" 
            className={expanded ? 'eventExpanded max-w-xs sm:max-w-3xl pt-6 pb-2 px-2 relative text-center ml-auto' 
            : "event w-full h-48 mb-2 flex flex-col p-3 relative justify-between"}>
                <p className={expanded ? "absolute py-2 px-3 top-4 right-6 text-xl font-bold hover:bg-gray-200 rounded-full" : "hidden"}>x</p>
                <div className={expanded ? "flex w-full mt-2" : "flex w-full"}>
                    <h3 className={expanded ? "font-extrabold text-3xl px-2 ml-auto" 
                    : " theme-dark font-extrabold whitespace-pre-line text-xl"}
                    >{business}</h3>
                    {icon}
                    <h3 className={expanded ? " absolute top-2 left-2 font-bold p-3 text-lg"
                    : " text-lg font-bold ml-auto"}
                    >{distance} mi</h3>
                </div>
               
                <div className={expanded ? "flex w-full mt-2" : "flex w-full justify-between"}>
                    <p className={expanded ? "mx-auto font-bold text-lg mt-2" 
                        : "text-md "}
                        >{date} - {time}</p>
                    <p className={expanded ? "absolute bottom-2 left-2 p-3 font-bold text-lg" 
                        : "text-md "}
                        >{filled}/{capacity}</p>
                </div>
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