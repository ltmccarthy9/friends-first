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
import 'firebase/auth'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

firebase.initializeApp({
  apiKey: "AIzaSyA72m43fcB8aq6RQqSchVzGzJvH6wFv0yw",
  authDomain: "friends-first-f7a67.firebaseapp.com",
  projectId: "friends-first-f7a67",
  storageBucket: "friends-first-f7a67.appspot.com",
  messagingSenderId: "1080194628090",
  appId: "1:1080194628090:web:d84bc8e6022e78d5b6cc43",
  measurementId: "G-8GJG7K6CVR"
});

function App() {

  //For conditionally displaying navbar
  const [ showNav, setShowNav] = useState(true);

  //Is the user logged in?
  const isAuth = Boolean(useSelector((state) => state.token))

  // state for determining display of moon or sun icon(light/dark theme)
  const [ dark, setDark ] = useState(false)

  //If user is on dark theme, set to dark
  useEffect(() => {
    if(localStorage.getItem("dark")){
      document.documentElement.classList.add('dark');
    }
  }, [])

  //Make sure not to show nav on landing/login/register pages
  useEffect(() => {
    if(window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/register' ){
      setShowNav(false)
    } else {
      setShowNav(true);
    }
  }, [window.location.pathname])

  return (
      <Router>
        <div>
        {showNav ? <Nav dark={dark} setDark={setDark}/> : <div></div>}
        <Routes>
          <Route path="/" element ={isAuth ? <Navigate to="/events"/> : <Landing/>} />
          <Route path="/login" element={isAuth ? <Navigate to="/events"/> : <Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={isAuth ? <Events /> : <Navigate to="/"/>} />
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
