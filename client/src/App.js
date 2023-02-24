import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Past from "./pages/Past";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import Create from "./pages/Create";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyA72m43fcB8aq6RQqSchVzGzJvH6wFv0yw",
  authDomain: "friends-first-f7a67.firebaseapp.com",
  projectId: "friends-first-f7a67",
  storageBucket: "friends-first-f7a67.appspot.com",
  messagingSenderId: "1080194628090",
  appId: "1:1080194628090:web:d84bc8e6022e78d5b6cc43",
  measurementId: "G-8GJG7K6CVR"
});

const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  const [ userLat, setUserLat ] = useState(null)
  const [ userLng, setUserLng ] = useState(null);

  //FOR CONDITIONALLY DISPLAYING NAV
  const [ showNav, setShowNav] = useState(true);
  useEffect(() => {
    if(window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register' ){
      setShowNav(false)
    } else {
      setShowNav(true);
    }
  }, [window.location.pathname])

  // Get user lat and lng
    useEffect(() => {
        if (navigator.geolocation) {
            const location = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:10000});
           } else {
             alert('your browser does not support geolocation')
           }
     
           function successCallback(position) {
             const latitude = position.coords.latitude;
             const longitude = position.coords.longitude;
             setUserLat(latitude)
             setUserLng(longitude)
           }
     
           function errorCallback(error) {
             console.error(`Error retrieving location: ${error.message}`);
           }
    }, [])
    

    //Function to return distance from user to event, rounded to tenths place
    const getDistanceUserToEvent = async (userLat, userLng, eventLat, eventLng) => {
        const point1 = await new window.google.maps.LatLng(userLat, userLng);
        const point2 = await new window.google.maps.LatLng(eventLat, eventLng);

        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2)
        const distanceInMiles = Math.round((distanceInMeters * 0.000621371) * 10) / 10
        console.log(distanceInMiles, ' miles');
    }

    getDistanceUserToEvent(userLat, userLng, 41.889253, -87.635404)

  const isAuth = Boolean(useSelector((state) => state.token))
  
  return (
    
      <Router>
        <div>
        {showNav ? <Nav/> : <div></div>}
        <Routes>
          <Route path="/" element ={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={isAuth ? <Events userLat={userLat} userLng={userLng}/> : <Navigate to="/"/>} />
          <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>} />
          <Route path="/profile/past" element={isAuth ? <Past/> : <Navigate to="/"/>} />
          <Route path="/messages" element={isAuth ? <Messages/> : <Navigate to="/"/>} />
          <Route path="/create" element={isAuth ? <Create/> : <Navigate to="/"/>} />
        </Routes>
        </div>
      </Router>
      
  );
}

export default App;
