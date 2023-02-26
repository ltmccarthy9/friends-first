import React from 'react'
import useFetch from "../hooks/useFetch";
import moment from 'moment';
import Pastevent from './Pastevent';

const Pastevents = (likes) => {
    const userId = localStorage.getItem('id');

    const { data, loading, error } = useFetch('http://localhost:4000/api/events/past');
    // fetch our events
    
    if(loading) {
        return <p className='m-auto'>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const ourPastEvents = data.filter(event => event.attendees.includes(userId));
    
    //return past events in descending order so we have most recent event first
    ourPastEvents.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
    });

    return (
        <div className="grid grid-cols-1 gap-2 mt-8 w-full">
        {ourPastEvents.map((event) => (
            <Pastevent key={event._id}
            id={event._id}
            business={event.business}
            location={event.location}
            date={event.date.substring(5, 10)}
            attending={event.attendees} 
            likes={likes}/>
        ))}
        </div>
    );
}

export default Pastevents
