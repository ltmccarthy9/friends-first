import { useEffect, useState } from "react";
import Event from "../components/Event";
import useFetchEvents from "../hooks/useFetchEvents";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';
import { useSelector } from "react-redux";


const Events = () => {
    const dispatch = useDispatch()
    //state for filtering events with search bar
    const [query, setQuery] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [ userLat, setUserLat] = useState(null)
    const [ userLng, setUserLng] = useState(null)
    
    //UsEffect for properly handling profile conditional style
    useEffect(() => {
        dispatch(setPast({
            past: false
        }));
        dispatch(setUpcoming({
            upcoming: true
        }));

    }, [])

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(function (position) {
//           setUserLat(position.coords.latitude);
//           setUserLng(position.coords.longitude);
//         });
//   }, [])
    
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

    // Search filter in useEffect, calls every time query state changes(user types in search bar)
    useEffect(() => {
        (async () => {
            if(!query){
                return;
            } else {
                setFilteredEvents(openEvents?.filter((ev) => ev.description.toLowerCase().includes(query.toLocaleLowerCase())
                || ev.category.toLowerCase().includes(query.toLowerCase()) || 
                ev.business.toLowerCase().includes(query.toLowerCase())));
            } 
        })
        ();
    }, [query]);

    //grab user id
    const userId = localStorage.getItem('id');
    const refetch = useSelector((state) => state.refetch);
    
    // fetch events using custom useFetch hook
    const { data, loading, error } = useFetchEvents('http://localhost:4000/api/events', refetch, userLat, userLng);

    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const openEvents = data?.filter(each => !each.attendees.includes(userId));

    //sort events by asscending date
    openEvents.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
    });

    if(data){
        console.log(data)
        return (
            <div className="flex flex-col">
                <div className="w-full flex flex-col locationHeader">
                    <div className="flex mx-auto mb-3">
                        <h2 className="text-xl mr-1">Showing events for</h2>
                        <h2 className="text-xl font-bold theme-dark">Chicago, IL</h2>
                    </div>
                    <input 
                    onChange={(e) => setQuery(e.target.value)} 
                    value={query} className="search-bar p-2 mx-auto" 
                    placeholder="Search by category, name, description..."
                    />
                </div>
                    <div className="grid max-w-6xl grid-cols-2 gap-2 mt-8 mx-auto w-5/6
                     sm:w-5/6 sm:grid-cols-2 md:w-4/6 lg:w-4/6 lg:grid-cols-3 
                     xl:w-4/6 xl:grid-cols-4">
                        {query ? filteredEvents.map((event) => (
                            <Event key={event._id}
                            id={event._id} 
                            business={event.business}
                            address={event.address}
                            description={event.description}
                            capacity={event.capacity}
                            taken={event.attendees.length}
                            category={event.category}
                            date={event.date.substring(5, 10)}
                            time={event.time}
                            distance={event.distance}
                            refetch={refetch}
                            attending={event.attendees.includes(userId)} />
                        )) : openEvents.map((event) => (
                            <Event key={event._id}
                            id={event._id} 
                            business={event.business}
                            address={event.address}
                            description={event.description}
                            capacity={event.capacity}
                            taken={event.attendees.length}
                            category={event.category}
                            date={event.date.substring(5, 10)}
                            time={event.time}
                            distance={event.distance}
                            refetch={refetch}
                            attending={event.attendees.includes(userId)} />))}
                    </div> 
                    </div> 
        );
    }
    
};

export default Events;