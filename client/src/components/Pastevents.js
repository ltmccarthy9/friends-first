import React from 'react'
import useFetch from "../hooks/useFetch";
import moment from 'moment';
import Pastevent from './Pastevent';

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
            <Pastevent key={event._id}
            business={event.business}
            location={event.location}
            date={event.date.substring(0, 10)}
            attending={event.attendees.includes(userId)} />
        ))}
        </div>
    );
}

export default Pastevents
