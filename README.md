# friends-first - (development)

## Description
Friends First is the best application for making friends and forming 
relationships.
 

## Technologies Used

* React & React Router
* MongoDB & Mongoose
* Nodejs
* Express
* Tailwindcss
* Bootstrap

## Code

```JavaScript
    
    const { data, loading, error } = useFetch('http://localhost:4000/api/events');
    // fetch our events
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

```
Utilizing custom useFetch hook to fetch events in the Events component.

```JavaScript

    const filteredData = data.filter(event => event.date > date)

    return (
        <div>
        {filteredData.map((event) => (
            <Event key={event._id}
            id={event._id} 
            business={event.business}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            taken={event.attendees.length}
            category={event.category}
            date={event.date.substring(5,10)}
            time={event.time}
            attending={event.attendees.includes(userId)} />
        ))}
        </div>
    );
```
With the data recieved from useFetch, we filter only
future dates, then map through and grab each event attribute
and send it down to our Event component as props.

## Demonstration Of Current State of Application

https://drive.google.com/file/d/1janvooZxIk15fuhMbP-byOvF1bBVkIMW/view





## Old demonstrations

https://drive.google.com/file/d/1k2D33sbG12-gu9rU5L8alY4oDdoZWV8a/view

