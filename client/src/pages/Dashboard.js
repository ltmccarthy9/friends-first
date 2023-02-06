import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/Event";
import Nav from "../components/Nav";
import moment from "moment";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])

    const userId = localStorage.getItem('id');
    const now = moment().toISOString();

    const { data, loading, error } = useFetch('http://localhost:4000/api/events');
    // fetch our events
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    // we map our data (each event)
    // send down props of each event attribute
    // render each event to events

    //filter out past events
    const futureEvents = data.filter(event => event.date >= now);
    
    //filter out events user has already joined
    const openEvents = futureEvents.filter(each => !each.attendees.includes(userId));

    const loginAlert = () => {
        alert("please login to continue");
    }

    return (
        <div>
            <Nav/>
            <div className="flex mb-4">
                <div className="m-auto flex">
                    <input className="search-bar px-2 pt-2 pb-1 m-2" placeholder="Search.."/>
                    <h2 className="mx-2 mt-3 theme-green tracking-tight text-2xl rounded-xl">Nearby Events</h2>
                </div>
            </div>
        {/* body containing each event card */}
            <div>
                <div>
                {openEvents.map((event) => (
                    <Event key={event._id}
                    id={event._id} 
                    business={event.business}
                    location={event.location}
                    description={event.description}
                    capacity={event.capacity}
                    taken={event.attendees.length}
                    category={event.category}
                    date={event.date.substring(0, 10)}
                    time={event.time}
                    attending={event.attendees.includes(userId)} />
                ))}
            </div> 
            </div>
        </div> 
    );
};

export default Dashboard;