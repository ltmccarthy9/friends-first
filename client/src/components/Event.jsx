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
            icon = <div className={expanded 
                ? "m-auto mt-1 text-indigo-600" 
                : "inline-block pt-1 ml-1 mr-auto text-indigo-600"}>
                    <BiDrink size={expanded? 25 : 18}/>
                    </div>
        } else if (category.includes('sport')) {
         icon = <div className={expanded 
            ? "m-auto mt-1 text-orange-700" 
            : "inline-block pt-1 ml-1 mr-auto text-orange-700"}>
                <GiBasketballBall size={expanded? 25 : 18}/>
                </div>
        } else if (category.includes('restaurant')) {
        icon = <div className={expanded 
            ? "m-auto mt-1 text-gray-800" 
            : "inline-block pt-1 ml-1 mr-auto text-gray-800"}>
                <GiKnifeFork size={expanded? 25 : 18}/>
                </div>
        }
        else {
        icon = <div className={expanded 
            ? "m-auto mt-1 text-green-600" 
            : "inline-block pt-1 ml-1 mr-auto text-green-600"}>
                <CgTrees size={expanded? 25 : 18}/>
                </div>
        }
    
    // text-indigo-600 text-gray-800 text-green-600

    return (
        <div onClick={expanded ? () => handleExpand() : null } 
        className={expanded ? "overlay" : 'overlaySmall'}>
            <button onClick={expanded ? null : () => handleExpand()} 
            type="button" 
            className={expanded ? 'eventExpanded bg-[#f4f7f7] relative text-center ml-auto pt-6 pb-2 px-2 max-w-xs sm:max-w-3xl' 
            : "event flex flex-col relative w-full h-48 mb-2 p-3 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-50"}>
                <div className={expanded ? "flex flex-col w-full mt-2" : "flex w-full"}>
                    <h3 className={expanded ? "font-extrabold text-2xl px-2 m-auto" 
                    : "bussiness-name-small font-extrabold text-xl whitespace-nowrap overflow-hidden text-gray-700 dark:text-gray-50"}
                    >{business}
                    </h3>
                    {icon}
                    <h3 className={expanded ? " absolute top-2 left-2 font-bold p-3 text-lg"
                    : "miles-indicator text-lg font-bold ml-auto inline-block text-gray-700 dark:text-gray-50"}
                    >{distance} mi
                    </h3>
                </div>
               
                <div className={expanded ? "flex w-full mt-2" : "flex w-full justify-between"}>
                    <p className={expanded ? "mx-auto font-bold text-lg" 
                        : "text-sm font-bold text-gray-700 dark:text-gray-50"}
                        >{date} - {time}
                    </p>
                    <p className={expanded ? "absolute bottom-2 left-2 p-3 font-bold text-lg" 
                        : "text-sm font-bold text-gray-700 dark:text-gray-50 "}
                        >{filled}/{capacity}
                    </p>
                </div>
                <p className={expanded ? "text-md p-2 overflow-scroll max-h-60" 
                    : "hidden"}>{description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quised do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quised do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quised do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                </p>  
            </button>
            
                <div className={expanded ? "event-wrapper max-w-xs sm:max-w-3xl" : ''}>
                <button type="button" className={expanded 
                    ? "absolute py-2 px-3 top-4 right-6 text-xl font-bold hover:bg-gray-200 rounded-full cursor-pointer" 
                    : "hidden"}>x</button>
                    {expanded ? joined ? <button onClick={() => joinEvent()} 
                    type="button" className="z-30 absolute bottom-0 right-0 text-xl font-bold px-4 py-2 m-4 leaveBtn"
                    >Leave</button>
                    : <button onClick={() => joinEvent()} type="button" 
                    className="z-30 absolute bottom-0 right-0 text-xl font-bold px-4 py-2 m-4 joinBtn"
                    >Join</button>   
                        : <p></p>}      
                </div>
        </div>
    );
}

export default Event;