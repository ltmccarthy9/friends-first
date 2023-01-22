import { useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsArrowRightSquare } from 'react-icons/bs';
import { CgArrowLeftR } from 'react-icons/cg';

const Event = ({ business, location, description, capacity, taken, id, date, time, attending }) => {
   
    // state for event cards - updating spots taken and whether user joined or not
    const [filled, setFilled] = useState(taken);
    const [ joined, setJoined ] = useState(attending);

    const [expand, setExpand] = useState(false);

    const userId = localStorage.getItem('id');
    const eventId = id;

    const token = useSelector((state) => state.token);

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
            if(!data.error){
                setJoined(true)
                setFilled(filled + 1)
                console.log(data)
            }
            

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
            if(!data.error) {
                setJoined(false)
                setFilled(filled - 1)
            }
            
                   
            }
        }
    }

    const controlExpand = () => {
        if(expand){
            setExpand(false);
        } else {
            setExpand(true);
        }
    }


    return (
        <div className={"event w-9/12 h-fit m-auto justify-center p-2 mt-3 md:w-6/12 lg:w-5/12 xl:w-3/12"}>

            {/* Top row */}
            <div className="w-full flex justify-between mb-4 pt-2">
                <h3 className="theme-green font-extrabold tracking-tight text-2xl p-1">{business}</h3>
                <div onClick={() => joinEvent()}
                    className={joined ? "flex btn joined"  : "flex btn join-button"}>
                    {/* <p className="mt-1">{joined ? `Joined` : 'Join'}</p> */}
                    {joined ? <CgArrowLeftR size={20} className="m-auto"/> : <BsArrowRightSquare size={20} className="m-auto"/>}
                </div>
            </div>
            
            <div className="flex justify-between nav-bar border-slate-800" >
                <p className="theme-green font-bold p-1 text-xl italic">{location}</p>
                <p className="theme-green p-2 font-bold italic">Filled: {filled}/{capacity}</p>
                <p className="theme-green p-2 font-bold italic">{date}</p>
                <p className="theme-green p-2 font-bold italic">{time}</p>
            </div>

            {/* middle row */}
            <div className={expand ? "h-fit w-11/12 m-auto" : "w-11/12 m-auto"}>
                <p className={expand ? "description-expanded theme-green text-s pt-2" : "description theme-green text-s pt-2"}>{description} LoremepsumLoremeps umLoremepsumLorem psumLoremepsumLoreme sumLoremepsumLoremepsumLoremepsumLo remepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsumLoremepsum</p>
            </div>
                
            {/* Bottom row */}

            <div className="z-10">
                <RiArrowDropDownLine style={expand ? {transform: 'rotate(180deg)' } : ""} onClick={() => controlExpand()} className="theme-green drop mx-auto mb-0 mt-2" size={55}/>
            </div>
            
                
                
           
        </div>
    );
}

export default Event;