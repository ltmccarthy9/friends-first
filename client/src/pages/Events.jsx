import { useEffect, useState } from "react";
import Event from "../components/Event";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from "react-redux";

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

    //const options = { month: 'short', day: 'numeric', ordinal: 'numeric' }
    //grab user id
    const userId = localStorage.getItem('id');
    const refetch = useSelector((state) => state.refetch);
    
    // fetch events using custom useFetch hook
    const { data, loading, error } = useFetch('http://localhost:4000/api/events/future', refetch);

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
            <div className="w-full flex flex-col locationHeader">
                <div className="flex mx-auto mb-3">
                    <h2 className="text-xl mr-1">Showing events for</h2>
                    <h2 className="text-xl font-bold theme-dark">Chicago, IL</h2>
                </div>
                <input 
                onChange={(e) => setQuery(e.target.value)} 
                value={query} className="search-bar py-1 px-2 mx-auto" 
                placeholder="Search by category, name, description..."
                />
            </div>
                <div className="grid max-w-6xl grid-cols-2 gap-2 mt-8 mx-auto w-5/6
                 sm:w-5/6 sm:grid-cols-2 md:w-4/6 lg:w-4/6 lg:grid-cols-3 
                 xl:w-4/6 xl:grid-cols-4">
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
                        refetch={refetch}
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
                        refetch={refetch}
                        attending={event.attendees.includes(userId)} />))}
                </div> 
                </div> 
    );
};

export default Events;