import { useState, useEffect } from "react";
import axios from 'axios';

export default function useFetchEvents(url, refetch, lat, lng) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.get(url);
                const updatedEvents = await Promise.all(
                    response.data.map(async (event) => {
                        const distance = await getDistanceUserToEvent(lat, lng, event.lat, event.lng)
                        console.log(lat, lng, event.lat, event.lng)
                        return {...event, distance}
                    })
                );
                setData(updatedEvents);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, refetch, lat, lng]);


    //Function to return distance from user to event, rounded to tenths place
    const getDistanceUserToEvent = async (userLat, userLng, eventLat, eventLng) => {
        try {
            const point1 = await new window.google.maps.LatLng(userLat, userLng);
            const point2 = await new window.google.maps.LatLng(eventLat, eventLng);

            const distanceInMeters = await window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2)
            const distanceInMiles = Math.round((distanceInMeters * 0.000621371) * 10) / 10
            return distanceInMiles;
        } catch(error) {
            console.log(error)
        }
    }

    return { data, loading, error };
}