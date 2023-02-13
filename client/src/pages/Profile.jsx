import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";
import Pastevents from "../components/Pastevents";
import useFetch from "../hooks/useFetch";

const Profile = () => {

    //useStates for switching between upcoming and past events on profile
    const [upcoming, setUpcoming] = useState(true);
    const [past, setPast] = useState(false)
    
    const navigate = useNavigate();

    const userId = localStorage.getItem('id');

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

    const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const userLikes = data.liked;

    return (
         <div className="flex-col justify-center  mt-24">
            <Nav/>
            <div className="flex mb-4">
            <h2 className="theme-green font-bold tracking-tight text-3xl ml-auto mr-2 px-3 pt-2 pb-1">{data.name}'s</h2>
                <button type="button" onClick={() => switchUpcoming()} className={upcoming ? "px-3 pt-1 pb-1 rounded-lg tracking-tight text-lg cursor-pointer ml-2 profile-active"
                 : "tracking-tight text-lg cursor-pointer ml-2 px-3 pt-1 pb-1 rounded-lg profile-inactive"}>Upcoming Events</button>
                
                <div className="tracking-tight text-xl mx-2"></div>
                
                <button type="button" onClick={() => switchPast()} className={past ? "px-3 pt-1 pb-1 rounded-lg tracking-tight text-lg cursor-pointer mr-auto profile-active" 
                 : "tracking-tight text-lg cursor-pointer mr-auto px-3 pt-1 pb-1 rounded-lg  profile-inactive"}>Past Events</button>
            </div>

            <div>
                {upcoming ? <Yourevents /> : <Pastevents likes={userLikes} />} 
            </div>
        </div> 
    );
};

export default Profile;