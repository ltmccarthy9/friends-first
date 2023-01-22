import React from 'react'
import useFetch from "../hooks/useFetch";
import moment from 'moment';
import Event from "./Event";

const Pastevents = () => {
    const userId = localStorage.getItem('id');

    
    const now = moment().toISOString();

    const { data, loading, error } = useFetch('http://localhost:4000/api/events');
    // fetch our events
    
    if(loading) {
        return <p className='m-auto'>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    
    //Here we only want past events, so we filter only those that are prior to now.
    const filteredData = data.filter(event => now > event.date);

    const ourPastEvents = filteredData.filter(event => event.attendees.includes(userId));
    
    return (
        <div className="flex-col">
        {ourPastEvents.map((event) => (
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
    );
}

export default Pastevents
