import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/Event";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';

const Dashboard = () => {
    //useNavigate hook for changing pages
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    //Move user if they're not logged in
    useEffect(() => {
        dispatch(setPast({
            past: false
        }));
        dispatch(setUpcoming({
            upcoming: true
        }));
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
        <div className="flex flex-col">
            <Nav/>
            <div className="w-full flex flex-col locationHeader">
                <div className="flex mx-auto mb-3">
                    <h2 className="text-2xl mr-2">Showing events for</h2>
                    <h2 className="text-2xl font-bold">Chicago, IL</h2>
                </div>
                <input onChange={(e) => setQuery(e.target.value)} value={query} className="search-bar w-80 p-2 mx-auto" placeholder="Search by category, name, description..."/>
            </div>
                <div className="grid grid-cols-2 gap-2 mt-8 mx-auto w-5/6 sm:w-5/6 sm:grid-cols-2 md:w-4/6 lg:w-4/6 lg:grid-cols-3 xl:w-4/6 xl:grid-cols-4">
                    {query ? filteredEvents.map((event) => (
                        <Event key={event._id}
                        id={event._id} 
                        business={event.business}
                        location={event.location}
                        description={event.description}
                        capacity={event.capacity}
                        taken={event.attendees.length}
                        category={event.category}
                        date={event.date.substring(5, 10)}
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
                        date={event.date.substring(5, 10)}
                        time={event.time}
                        attending={event.attendees.includes(userId)} />))}
                </div> 
                </div> 
    );
};

export default Dashboard;