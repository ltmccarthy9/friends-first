

const Event = ({ business, location, description, capacity, taken, category }) => {
    return (
        <div className="event">

            <div>
            <h3 className="event-location">{business}</h3>
            <p className="event-attribute">city: {location}</p>
            <p className="event-attribute">filled: {taken}/{capacity}</p>
            <p className="event-attribute">category: {category}</p>
            </div>

            
                <p className="event-description">{description}</p>
                <button type="button" className="btn join-button">Join</button>
           
        </div>
    );
}

export default Event;