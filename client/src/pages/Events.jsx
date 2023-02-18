import { useEffect, useState } from "react";
import Event from "../components/Event";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';

const Events = () => {
    const dispatch = useDispatch();

    if (navigator.geolocation) {
       const location = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:10000});
      } else {
        alert('your browser does not support geolocation')
      }

      function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      }

      function errorCallback(error) {
        console.error(`Error retrieving location: ${error.message}`);
      }

    //state for filtering events with search bar
    const [query, setQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    //Move user if they're not logged in
    
    //UsEffect for properly handling profile conditional style
    useEffect(() => {
        dispatch(setPast({
            past: false
        }));
        dispatch(setUpcoming({
            upcoming: true
        }));
    }, [])

    // Search filter in useEffect, calls every time query state changes(user types in search bar)
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

    //grab user id
    const userId = localStorage.getItem('id');
    
    // fetch events using custom useFetch hook
    const { data, loading, error } = useFetch('http://localhost:4000/api/events/future');

    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // only return events that haven't been joined by user
    const openEvents = data.filter(each => !each.attendees.includes(userId));

    return (
        <div className="flex flex-col">
            <Nav/>
            <div className="w-full flex flex-col locationHeader">
                <div className="flex mx-auto mb-3">
                    <h2 className="text-2xl mr-2">Showing events for</h2>
                    <h2 className="text-2xl font-bold theme-dark">Chicago, IL</h2>
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

export default Events;