import useFetchEvents from "../hooks/useFetchEvents";
import moment from 'moment';
import Event from "./Event";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Yourevents = () => {

    const userId = localStorage.getItem('id');

    // use moment.js to filter out only relevent events (not in the past)
    const now = moment().toISOString();
    const refetch = useSelector((state) => state.refetch);
    const [ userLat, setUserLat] = useState(null)
    const [ userLng, setUserLng] = useState(null)
    
    useEffect(() => {
        // Get user lat and lng
        async function getLocation(){
            if (navigator.geolocation) {
              const location = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:10000});
          } else {
               alert('your browser does not support geolocation')
             }
       
             async function successCallback(position) {
               const latitude = await position.coords.latitude;
               const longitude = await position.coords.longitude
               setUserLat(latitude)
               setUserLng(longitude)
             }
       
             function errorCallback(error) {
               console.error(`Error retrieving location: ${error.message}`);
             }
          }
          getLocation()
    })

    const { data, loading, error } = useFetchEvents(`http://localhost:4000/api/events/future/yourevents/${userId}`, refetch, userLat, userLng);
    // fetch our events
    
    if(loading) {
        return <p className="m-auto">Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    //get only our future events
    const filteredData = data.filter(event => event.date >= now);

    // In this case we filter it again to only display events the user has joined
    const ourEvents = filteredData.filter(event => event.attendees.includes(userId));
    
     //sort events by asscending date
     ourEvents.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
    });

    //date options
    const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      };


    return (
        <div className="grid grid-cols-1 gap-2 mt-8 w-full">
        {ourEvents.length > 0 ? (ourEvents.map((event) => (
            <Event key={event._id}
            id={event._id} 
            business={event.business}
            location={event.location}
            description={event.description}
            capacity={event.capacity}
            taken={event.attendees.length}
            category={event.category}
            date={event.eventDate.toLocaleDateString('en-US', options)}
            time={event.time}
            distance={event.distance}
            refetch={refetch}
            attending={event.attendees.includes(userId)} />
        ))) : (<h2 className="pt-12 font-bold m-auto text-gray-700 dark:text-gray-50">You haven't joined any events!</h2>)}
        </div>
    );

}

export default Yourevents;