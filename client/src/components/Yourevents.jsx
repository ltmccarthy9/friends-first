import useFetch from "../hooks/useFetch";
import moment from 'moment';
import Event from "./Event";

const Yourevents = () => {

    const userId = localStorage.getItem('id');

    // use moment.js to filter out only relevent events (not in the past)
    const now = moment().toISOString();

    const { data, loading, error } = useFetch('http://localhost:4000/api/events');
    // fetch our events
    
    if(loading) {
        return <p className="m-auto">Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // we map our data (each event)
    // send down props of each event attribute
    // render each event to events

    const filteredData = data.filter(event => event.date >= now);

    // In this case we filter it again to only display events the user has joined
    const ourEvents = filteredData.filter(event => event.attendees.includes(userId));
    

    return (
        <div className="flex flex-col mt-8 w-full">
        {ourEvents.map((event) => (
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
        ))}
        </div>
    );

}

export default Yourevents;