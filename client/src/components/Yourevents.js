import Yourevent from "./Yourevent";

const Yourevents = () => {
    // First check if our user is a google account or not.
    // fetch our user.
    const fetchEvents = async () => {
        if (localStorage.getItem("user") === "loggedinG") {
            const response = await fetch("http://localhost:4000/api/users/google/:email")
            return response.json();
        } else {
            const response = await fetch("http://localhost:4000/api/users/:email")
            return response.json();
        }
    };

    //Use the IDs of the events in User model to populate with the correct events


    //react query useQuery Hook                 
    const { data, status } = useQuery('user', fetchUser);
    
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
            <Yourevent key={event._id}
            id={event._id} 
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

export default Yourevents;