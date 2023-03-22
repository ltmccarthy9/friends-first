import { useEffect, useState } from "react";
import Event from "../components/Event";
import useFetchEvents from "../hooks/useFetchEvents";
import useFetch from "../hooks/useFetch";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming, setPage, setFriends, setMessageWith, setUsername } from '../state';
import { useSelector } from "react-redux";

const Events = () => {
    const dispatch = useDispatch()
    
    //------STATE-------
    // state for event filtering
    const [query, setQuery] = useState('');
    const [ distanceFilter, setDistanceFilter ] = useState(10);
    const [filteredEvents, setFilteredEvents] = useState([]);
    // state that stores user latituge and longitude
    const [ userLat, setUserLat] = useState(null)
    const [ userLng, setUserLng] = useState(null)
    // boolean determining if data from useFetchEvents has been fully loaded
    const [ isDataLoaded, setIsDataLoaded] = useState(false)
    // refetch state
    const refetch = useSelector((state) => state.refetch);
    
    // get user id
    const userId = localStorage.getItem('id');
   
    // fetch events using custom useFetch hook
    const { data, loading, error } = useFetchEvents(`http://localhost:4000/api/events/future/${userId}`, refetch, userLat, userLng);

    // fetch user data and set friends + messagesWith state
    const { userData } = useFetch(`http://localhost:4000/api/users/${userId}`);
        if(userData) {
          dispatch(setFriends({
              friends: userData.friends.length
          }));
          dispatch(setMessageWith({
              messageWith: userData.friends[0]
          }))
          dispatch(setUsername({
            username: userData.name
          }))
      }
   
    // For styling of nav bar bottom border
    useEffect(() => {
        dispatch(setPast({
            past: false
        }));
        dispatch(setUpcoming({
            upcoming: true
        }));
        dispatch(setPage({
            page: 'events'
        }))
    }, [])

    // get the user's latitude and longitude
    useEffect(() => {
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

    // checking if data has been fully loaded
    useEffect(() => {
        setIsDataLoaded(!loading && !error);
      }, [loading, error]);

    // if the data is still loading, return this  
    if(loading) {
        return <p className="fixed top-[50%] right-[50%]">Loading...</p>;
    }

    // if there is an error return the error
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

    // for display type of date
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      };

      // Events header, search bar, and return event components
        return (
            <main className="flex flex-col h-screen mt-14 bg-slate-200 dark:bg-gray-600">
                <div className="w-full flex flex-col">
                    <div className="flex mx-auto mb-2 mt-12 text-gray-700 dark:text-gray-50">
                        <h2 className="text-xl mx-1">Showing events</h2>
                        <h2 className="text-xl theme-dark mx-1">within</h2>
                        <select defaultValue={10} onChange={(e) => setDistanceFilter(parseInt(e.target.value))} className="mx-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-50" name="miles" id="miles">
                           {miles.map((each) => {
                            return <option key={each} value={each}>{each}</option>
                           })}
                        </select>
                        <h2 className="text-xl font-bold theme-dark mx-1">miles</h2>
                    </div>
                    <input 
                    onChange={(e) => setQuery(e.target.value)} 
                    value={query} className="search-bar p-2 mx-auto bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-50" 
                    placeholder="Search..."
                    />
                </div>
                    <section className="grid max-w-6xl grid-cols-1 gap-2 mt-4 mx-auto w-5/6
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
                            date={event.eventDate.toLocaleDateString('en-US', options)}
                            time={event.time}
                            distance={event.distance}
                            refetch={refetch}
                            attending={event.attendees.includes(userId)} />
                        ))}
                    </section> 
                    </main> 
        );
    
};

export default Events;