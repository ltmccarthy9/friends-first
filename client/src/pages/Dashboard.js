import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/Event";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";


const Dashboard = () => {
    //useNavigate hook for changing pages
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    //Move user if they're not logged in
    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])

    // Search filter
    useEffect(() => {
        (async () => {
            if(!query){
                return;
            } else {
                setFilteredEvents(openEvents.filter((ev) => ev.description.toLowerCase().includes(query.toLocaleLowerCase())
                || ev.category.toLowerCase().includes(query.toLowerCase()) || 
                ev.business.toLowerCase().includes(query.toLowerCase())));
            } 
        })
        ();
    }, [query]);

    const loginAlert = () => {
        alert("please login to continue");
    }

    //grab user id
    const userId = localStorage.getItem('id');
    
    // fetch events
    const { data, loading, error } = useFetch('http://localhost:4000/api/events/future');

    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const openEvents = data.filter(each => !each.attendees.includes(userId));
    
    //filter out events user has already joined

    return (
        <div>
            <Nav/>
                <div className="flex-col mt-24">
                <input onChange={(e) => setQuery(e.target.value)} value={query} className="search-bar px-2 pt-2 pb-1 mx-auto mb-4 w-80 flex" placeholder="Search by category, name, description..."/>
                    {query ? filteredEvents.map((event) => (
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
                    )) : openEvents.map((event) => (
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
                        attending={event.attendees.includes(userId)} />))}
                </div> 
                </div> 
    );
};

export default Dashboard;