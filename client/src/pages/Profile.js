import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";
import Pastevents from "../components/Pastevents";

const Profile = () => {

    const [upcoming, setUpcoming] = useState(true);
    const [past, setPast] = useState(false)
    
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])

    const switchUpcoming = () => {
        setPast(false);
        setUpcoming(true);
    }

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
                <h2 onClick={() => switchUpcoming()} className={upcoming ? " tracking-tight text-lg cursor-pointer text-black ml-auto border-b-2 border-slate-900"
                 : "text-slate-400 tracking-tight text-lg cursor-pointer ml-auto hover:text-black"}>Upcoming Events</h2>
                
                <h2 className="tracking-tight text-xl mr-1 ml-1">|</h2>
                
                <h2 onClick={() => switchPast()} className={past ? "tracking-tight text-lg cursor-pointer mr-auto border-b-2 text-black border-slate-900" 
                 : "text-slate-400 tracking-tight text-lg cursor-pointer mr-auto hover:text-black"}>Past Events</h2>
            </div>

            <div>
                {upcoming ? <Yourevents /> : <Pastevents/>} 
            </div>
        </div> 
    );
};

export default Profile;