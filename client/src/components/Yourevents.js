import Yourevent from "./Yourevent";
import useFetch from "../hooks/useFetch";
import moment from 'moment';

const Yourevents = () => {

    const userId = localStorage.getItem('id');

    // use moment.js to filter out only relevent events (not in the past)
    const date = moment().format('MM-DD-YYYY');

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

    const filteredData = data.filter(event => event.date > date);

    // In this case we filter it again to only display events the user has joined
    const ourEvents = filteredData.filter(event => event.attendees.includes(userId));
    
    return (
        <div>
        {ourEvents.map((event) => (
            <Yourevent key={event._id}
            id={event._id} 
            business={event.business}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            taken={event.taken}
            category={event.category}
            date={event.date.substring(0,10)}
            time={event.time}
            attending={event.attendees.includes(userId)} />
        ))}
        </div>
    );

}

export default Yourevents;