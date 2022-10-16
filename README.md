# friends-first - (development)

## Description
Friends First is the best application for making friends and forming 
relationships.
 

## Technologies Used

* React & React Router
* MongoDB & Mongoose
* Google Oauth
* Nodejs
* Express
* Bootstrap

## Code

```JavaScript
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
```
Utilizing React Query useQuery hook to fetch events in the Events component.

```JavaScript
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
```
With the data we recieved from our fetch, we grab each event attribute
and send it down to our Event component as props.

## Demonstration Of Current State of Application

https://drive.google.com/file/d/1k2D33sbG12-gu9rU5L8alY4oDdoZWV8a/view

