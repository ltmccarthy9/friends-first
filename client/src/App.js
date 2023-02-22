import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Events from "./pages/Events";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Past from "./pages/Past";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
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

  const [ showNav, setShowNav] = useState(true);

  useEffect(() => {
    if(window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register' ){
      setShowNav(false)
    } else {
      setShowNav(true);
    }
  }, [window.location.pathname])


  const isAuth = Boolean(useSelector((state) => state.token))
  
  return (
    
      <Router>
        <div>
        {showNav ? <Nav/> : <div></div>}
        <Routes>
          <Route path="/" element ={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={isAuth ? <Events/> : <Navigate to="/"/>} />
          <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>} />
          <Route path="/profile/past" element={isAuth ? <Past/> : <Navigate to="/"/>} />
          <Route path="/messages" element={isAuth ? <Messages/> : <Navigate to="/"/>} />
        </Routes>
        </div>
      </Router>
      
  );
}

export default App;
