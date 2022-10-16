import { useQuery } from "react-query";

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
        <ul>
        {data.map((event) => (
            <li key={event.id}>{event.business}</li>
        ))}
        </ul>
    );
}

export default Events;