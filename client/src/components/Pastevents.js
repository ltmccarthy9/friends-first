import React from 'react'
import useFetch from "../hooks/useFetch";
import moment from 'moment';
import Pastevent from './Pastevent';

const Pastevents = (likes) => {
    const userId = localStorage.getItem('id');

    // get current time using moment so we can compare events in our database
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
    
    //return past events in descending order so we have most recent event first
    ourPastEvents.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
    });

    return (
        <div className="flex-col">
        {ourPastEvents.map((event) => (
            <Pastevent key={event._id}
            business={event.business}
            location={event.location}
            date={event.date.substring(0, 10)}
            attending={event.attendees} 
            likes={likes}/>
        ))}
        </div>
    );
}

export default Pastevents
