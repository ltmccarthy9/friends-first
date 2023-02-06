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
    const [expand, setExpand] = useState(false);

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

    // our control expand functiod for each event card
    const controlExpand = () => {
        if(expand){
            setExpand(false);
        } else {
            setExpand(true);
        }
    }


    return (
        <div className={"event w-9/12 h-fit mx-auto justify-center mt-1 mb-3 md:w-6/12 lg:w-5/12 xl:w-4/12"}>

            {/* Top row */}
            <div className="w-full flex justify-between px-2 py-3">
                <h3 className="theme-green font-extrabold tracking-tight text-2xl p-2">{business}</h3>
                <div onClick={() => joinEvent()}
                    className={joined ? "m-2 p-1 flex joined"  : "m-2 p-1 flex join-button"}>
                    {joined ? <CgArrowLeftR size={20} className="m-auto"/> : <BsArrowRightSquare size={20} className="m-auto"/>}
                </div>
            </div>
            
            <div className="flex justify-between nav-bar px-3 border-slate-800" >
                <p className="theme-green font-semibold text-xl italic">{location}</p>
                <p className="theme-green">Filled: {filled}/{capacity} | {date} | {time}</p>
            </div>

            {/* middle row */}
            <div className={expand ? "h-fit w-11/12 m-auto" : "w-11/12 m-auto"}>
                <p className={expand ? "description-expanded theme-green text-s py-2" : "description theme-green text-s py-2"}>{description} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                 irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum."</p>
            </div>
                
            {/* Bottom row */}

            <div onClick={() => controlExpand()} className="expand-div z-10 cursor-pointer h-8 mx-auto my-2">
                <RiArrowDropDownLine style={expand ? {transform: 'rotate(180deg)' } : ""} onClick={() => controlExpand()} className="theme-green drop mx-auto" size={35}/>
            </div>
            
                
                
           
        </div>
    );
}

export default Event;