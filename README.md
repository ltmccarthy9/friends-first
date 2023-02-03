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
* Firebase
* Redux/Redux Toolkit

## Demonstration Of Current State of Application
Be sure to enable sound! 
https://drive.google.com/file/d/1C0qo9XFHPtCVVrfLqk8YcSdZmup5g4Qw/view


## Updates 
I'm currently working on fully implementing a chat feature.  I am using firebase for this feature
and currently the chat is pulling all message documents.  My next goal is to complete a "stay connected" feature that the user can find in their past events section on their profile.  The chat
bar will be populated with their matches and there you can chat with other users you met at an event.


## Old demonstrations

1.) (oldest)
https://drive.google.com/file/d/1janvooZxIk15fuhMbP-byOvF1bBVkIMW/view

2.)
https://drive.google.com/file/d/1xQscWSkKpkTcRvAW5FcLo5GfPkgqcP7I/view

3.)
https://drive.google.com/file/d/1GHkIAzEgsSw9Uj2cTsFRN3P88daxA3lY/view

4.) 
https://drive.google.com/file/d/1taImDVGhV74cYG2sZzC32pJDaMHtfUcY/view

5.)
https://drive.google.com/file/d/12-Q-GOwGbQkl_hXrqYoYF3Z1nEnRZT_N/view

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

    const filteredData = data.filter(event => event.date > now)

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


