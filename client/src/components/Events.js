import { useQuery } from "react-query";
import Event from "./Event";

const Events = () => {
    // fetch our events
    const fetchEvents = async () => {
        const response = await fetch("http://localhost:4000/api/events")
        return response.json();
    };

    const { data, status } = useQuery('events', fetchEvents);
    
    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'error') {
        return <p>Error!</p>;
    }

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