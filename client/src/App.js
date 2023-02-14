import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Past from "./pages/Past";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

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
  
  return (
    
      <Router>
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/past" element={<Past/>} />
          <Route path="/messages" element={<Messages/>} />
        </Routes>
        </div>
      </Router>
      
  );
}

export default App;
