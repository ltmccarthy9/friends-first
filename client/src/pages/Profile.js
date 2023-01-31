import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";
import Pastevents from "../components/Pastevents";

const Profile = () => {

    //useStates for switching between upcoming and past events on profile
    const [upcoming, setUpcoming] = useState(true);
    const [past, setPast] = useState(false)
    
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])

    //function for switching to upcoming events
    const switchUpcoming = () => {
        setPast(false);
        setUpcoming(true);
    }

    //function for switching to past events
    const switchPast = () => {
        setUpcoming(false);
        setPast(true);
    }
    
    const loginAlert = () => {
        alert("please login to continue");
    }

    return (
         <div className="flex-col">
            <Nav/>
            <div className="flex mb-4">
                <h2 onClick={() => switchUpcoming()} className={upcoming ? "bg-white p-2 rounded-lg tracking-tight text-lg font-bold cursor-pointer ml-auto profile-active"
                 : "tracking-tight text-lg cursor-pointer ml-auto font-bold bg-white p-2 rounded-lg profile-inactive"}>Upcoming Events</h2>
                
                <div className="tracking-tight text-xl mx-2"></div>
                
                <h2 onClick={() => switchPast()} className={past ? "bg-white p-2 rounded-lg font-bold tracking-tight text-lg cursor-pointer mr-auto profile-active" 
                 : "tracking-tight text-lg cursor-pointer mr-auto bg-white p-2 rounded-lg font-bold profile-inactive"}>Past Events</h2>
            </div>

            <div>
                {upcoming ? <Yourevents /> : <Pastevents/>} 
            </div>
        </div> 
    );
};

export default Profile;