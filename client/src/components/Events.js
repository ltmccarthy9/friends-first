import Event from "./Event";
import useFetch from "../hooks/useFetch";
import moment from 'moment';


const Events = () => {

    const userId = localStorage.getItem('id');

    // use moment.js to filter out only relevent events (not in the past)
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
    const filteredEvent = futureEvents.filter(each => !each.attendees.includes(userId));

    console.log(filteredEvent);

    return (
        <div>
        {filteredEvent.map((event) => (
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

export default Events;