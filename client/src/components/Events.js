import { useQuery } from "react-query";
import Event from "./Event";

const Events = () => {
    // fetch our events
    const fetchEvents = async () => {
        const response = await fetch("http://localhost:4000/api/events")
        return response.json();
    };

    //react query useQuery Hook                 
    const { data, status } = useQuery('events', fetchEvents);
    
    // if status of fetch is loading we return loading
    if (status === 'loading') {
        return <p>Loading...</p>
    }

    // if status is error we return an error
    // react query will refetch automatically for us a few times
    if (status === 'error') {
        return <p>Error!</p>;
    }

    // we map our data (each event)
    // send down props of each event attribute
    // render each event to events
    return (
        <div>
        {data.map((event) => (
            <Event key={event._id} 
            business={event.business}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            taken={event.taken}
            category={event.category} />
        ))}
        </div>
    );
}

export default Events;