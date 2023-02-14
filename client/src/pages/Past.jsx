import React from 'react'
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";
import Pastevents from "../components/Pastevents";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setPast, setUpcoming } from '../state';

const Past = () => {

     //useStates for switching between upcoming and past events on profile
     const dispatch = useDispatch();
     
     const upcoming = useSelector((state) => state.upcoming);
     const past = useSelector((state) => state.past);

     const navigate = useNavigate();
 
     const userId = localStorage.getItem('id');
 
     console.log('upcoming', upcoming);
    console.log('past', past);
    
     useEffect(() => {
         if(localStorage.getItem('user') !== 'loggedin') {
             loginAlert();
             navigate("/")
         }
     }, [])
 
     //function for switching to upcoming events
     const switchUpcoming = () => {
         dispatch(setPast({
            past: false
         }));
        dispatch(setUpcoming({
            upcoming: true
         }));
         navigate('/profile');
     }
 
     //function for switching to past events
     const switchPast = () => {
        dispatch(setUpcoming({
            upcoming: false
         }));
         dispatch(setPast({
            past: true
         }));
         navigate('/profile/past');
     }
     
     const loginAlert = () => {
         alert("please login to continue");
     }
 
     const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
     
     if(loading) {
         return <p>Loading...</p>;
     }
 
     if (error) {
         return <p>Error: {error.message}</p>;
     }
 
     const userLikes = data.liked;

  return (
    <div className="flex mt-24 mx-auto">
        <Nav/>
        <div className="flex w-full justify-center">
            <div className="profileBar mt-8 flex flex-col rounded-lg bg-white mr-4 pt-2 h-80 w-22 sm:w-48">
                <h2 className="theme-green font-bold tracking-tight text-3xl px-1 pt-2 pb-1">{data.name}'s</h2>
                <button type='button' onClick={() => switchUpcoming()} className={upcoming ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer profile-active"
                : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 profile-inactive"}>Upcoming Events</button>
                    
                <button type='button' onClick={() => switchPast()} className={past ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer profile-active" 
                : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 profile-inactive"}>Past Events</button>
            </div>

            <div className="w-64 lg:w-3/12">
                <Pastevents likes={userLikes} />
            </div>
        </div>

</div> 
  )
}

export default Past
