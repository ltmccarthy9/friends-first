

const Event = ({ business, location, description, capacity, taken, category, id, date, time }) => {

    // Use event key to push to User array of events
    const logKey = () => {
        console.log(id)
    }

    return (
        <div className="event">

            <div>
            <h3 className="event-location">{business}</h3>
            <p className="event-attribute">city: {location}</p>
            <p className="event-attribute">filled: {taken}/{capacity}</p>
            <p className="event-attribute">category: {category}</p>
            <p className="event-attribute">date: {date}</p>
            <p className="event-attribute">time: {time}</p>
            </div>

            
                <p className="event-description">{description}</p>
                <button onClick={logKey} type="button" className="btn join-button">Join</button>
           
        </div>
    );
}

export default Event;