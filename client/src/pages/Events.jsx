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
    const [ distanceFilter, setDistanceFilter ] = useState(10);
    const [ isDataLoaded, setIsDataLoaded] = useState(false)

    const refetch = useSelector((state) => state.refetch);
    const userId = localStorage.getItem('id');
    //UsEffect for properly handling profile conditional style
    
    // fetch events using custom useFetch hook
    const { data, loading, error } = useFetchEvents(`http://localhost:4000/api/events/future/${userId}`, refetch, userLat, userLng);
    
    // For styling of nav bar bottom border
    useEffect(() => {
        dispatch(setPast({
            past: false
        }));
        dispatch(setUpcoming({
            upcoming: true
        }));

    }, [])

    useEffect(() => {
        // Get user latitude and longitude
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

    // Search query and distance filter.
    useEffect(() => {
        //wait for data to load before returning filtered events
        if(isDataLoaded) {
            (async () => {
                if(!query){
                    setFilteredEvents(data.filter((ev) => ev.distance <= distanceFilter));
                } else {
                    setFilteredEvents(data?.filter((ev) => ev.distance < distanceFilter && (ev.description.toLowerCase().includes(query.toLocaleLowerCase())
                    || ev.category.toLowerCase().includes(query.toLowerCase()) || 
                    ev.business.toLowerCase().includes(query.toLowerCase()))));
                } 
            })
            ();
        }
    }, [query, distanceFilter, isDataLoaded, data]);

    useEffect(() => {
        setIsDataLoaded(!loading && !error);
      }, [loading, error]);


    if(loading) {
        return <p className="fixed top-[50%] right-[50%]">Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    //sort events by asscending date
    data.sort(function(a, b) {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
    });
    
    //for dropdown menu distanceFilter
    const miles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

        return (
            <div className="flex flex-col">
                <div className="w-full flex flex-col locationHeader">
                    <div className="flex mx-auto mb-3">
                        <h2 className="text-xl mx-1">Showing events for</h2>
                        <h2 className="text-xl font-bold theme-dark mx-1">Chicago, IL</h2>
                        <h2 className="text-xl theme-dark mx-1">within</h2>
                        <select defaultValue={10} onChange={(e) => setDistanceFilter(parseInt(e.target.value))} className="mx-1" name="miles" id="miles">
                           {miles.map((each) => {
                            return <option value={each}>{each}</option>
                           })}
                        </select>
                        <h2 className="text-xl font-bold theme-dark mx-1">miles</h2>
                    </div>
                    <input 
                    onChange={(e) => setQuery(e.target.value)} 
                    value={query} className="search-bar p-2 mx-auto" 
                    placeholder="Search by category, name, description..."
                    />
                </div>
                    <div className="grid max-w-6xl grid-cols-1 gap-2 mt-4 mx-auto w-5/6
                     sm:w-5/6 sm:grid-cols-2 md:w-4/6 lg:w-4/6
                     xl:w-4/6 xl:grid-cols-3">
                        {filteredEvents.map((event) => (
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
                        ))}
                    </div> 
                    </div> 
        );
    
};

export default Events;