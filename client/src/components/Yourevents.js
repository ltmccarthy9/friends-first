import Yourevent from "./Yourevent";
import useFetch from "../hooks/useFetch";

const Yourevents = () => {
    // First check if our user is a google account or not.
    // fetch our user.
    
    const {data, loading, error} = useFetch('http://localhost:4000/api/users/:email');

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    
    // we map our data (each event)
    // send down props of each event attribute
    // render each event to events
    return (
        <div>
        {data.map((event) => (
            <Yourevent key={event._id}
            id={event._id} 
            business={event.business}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            taken={event.taken}
            category={event.category}
            date={event.date} />
        ))}
        </div>
    );
}

export default Yourevents;