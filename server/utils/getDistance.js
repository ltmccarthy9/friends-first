

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

export default getDistanceUserToEvent;