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
     const navigate = useNavigate();
     
     const upcoming = useSelector((state) => state.upcoming);
     const past = useSelector((state) => state.past);
 
     const userId = localStorage.getItem('id');

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
     
     //Fetch user data
     const { userData, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
     
     if(loading) {
         return <p>Loading...</p>;
     }
 
     if (error) {
         return <p>Error: {error.message}</p>;
     }
 
     //array of user's liked (ids of other users)
     const userLikes = userData.liked;

  return (
    <div className="flex mt-14 mx-auto w-full h-screen bg-slate-100 dark:bg-gray-600">
        <div className="flex flex-col w-full sm:justify-center sm:flex-row p-4">
            <div className="mt-8 flex flex-col rounded-md mr-4 pt-2 h-fit w-full sm:w-48 sm:mx-8 bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-50">
                <h2 className="theme-dark tracking-tight text-xl font-bold px-1 pt-2 pb-1">{userData.name}'s</h2>
                <button type='button' onClick={() => switchUpcoming()} 
                className={upcoming ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer border-l-4 border-teal-500 bg-gray-200 dark:bg-gray-500"
                : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 "}>Upcoming Events</button>
                    
                <button type='button' onClick={() => switchPast()} 
                className={past ? "text-left font-semibold px-1 py-2 tracking-tight rounded-bl-md rounded-br-md text-lg cursor-pointer border-l-4 border-teal-500 bg-gray-200 dark:bg-gray-500" 
                : "text-left tracking-tight text-lg cursor-pointer rounded-lg px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 "}>Past Events</button>
            </div>

            <div className="w-full sm:w-6/12 lg:w-5/12 xl:w-4/12">
                <Pastevents likes={userLikes} />
            </div>
        </div>

</div> 
  )
}

export default Past
