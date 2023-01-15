import Joinbutton from "./Joinbutton";

const Event = ({ business, location, description, capacity, taken, category, id, date, time }) => {


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
                <Joinbutton id={id} />
                
           
        </div>
    );
}

export default Event;