import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";
import Pastevents from "../components/Pastevents";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setUpcoming, setPast } from '../state';

const Profile = () => {

    const dispatch = useDispatch();

    //redux states for future/past events styling on profile navigation bar
    const upcoming = useSelector((state) => state.upcoming);
    const past = useSelector((state) => state.past);

    const navigate = useNavigate();

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

    //fetch the user data
    const { data, loading, error } = useFetch(`http://localhost:4000/api/users/${userId}`);
    
    if(loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
         <div className="flex mt-24 mx-auto">
            <div className="flex flex-col w-full justify-center sm:flex-row p-4">
                <div className="mt-8 flex flex-col rounded-lg bg-white 
                mr-4 pt-2 h-fit w-full sm:w-48 sm:mx-8">
                <h2 className="theme-dark tracking-tight text-3xl px-1 pt-2 pb-1">{data.name}'s</h2>
                    <button type="button" onClick={() => switchUpcoming()} 
                    className={upcoming ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer profile-active"
                    : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 profile-inactive"}>Upcoming Events</button>
                    
                    <button type="button" onClick={() => switchPast()} 
                    className={past ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer profile-active" 
                    : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 profile-inactive"}>Past Events</button>
                </div>

                <div className="w-full sm:w-6/12 lg:w-5/12 xl:w-4/12">
                    <Yourevents />
                </div>
            </div>

        </div> 
    );
};

export default Profile;