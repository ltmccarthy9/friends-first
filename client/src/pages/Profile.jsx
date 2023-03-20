import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setUpcoming, setPast, setPage } from '../state';

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //redux states for future/past events styling on profile navigation bar
    const upcoming = useSelector((state) => state.upcoming);
    const past = useSelector((state) => state.past);

    //get user's username
    const username = useSelector((state) => state.username);

    // For nav bar border styling
    useEffect(() => {
        dispatch(setPage({
            page: 'profile'
        }))
    }, [])

    // function for switching to upcoming events
    const switchUpcoming = () => {
        dispatch(setPast({
        past: false
        }));
        dispatch(setUpcoming({
        upcoming: true
        }));
        navigate('/profile');
    }

    // function for switching to past events
    const switchPast = () => {
    dispatch(setUpcoming({
        upcoming: false
        }));
        dispatch(setPast({
        past: true
        }));
        navigate('/profile/past');
    }
    
    return (
         <main className="flex mt-14 mx-auto h-screen bg-slate-100 dark:bg-gray-600">
            <div className="flex flex-col w-full sm:justify-center sm:flex-row p-4">
                <section className="mt-8 flex flex-col rounded-md bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-50 
                mr-4 pt-2 h-fit w-full sm:w-48 sm:mx-8">
                <h2 className="theme-dark tracking-tight text-xl font-bold px-1 pt-2 pb-1">{username}'s</h2>
                    <button type="button" onClick={() => switchUpcoming()} 
                    className={upcoming ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer border-l-4 border-teal-500 bg-gray-200 dark:bg-gray-500"
                    : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 "}>Upcoming Events</button>
                    
                    <button type="button" onClick={() => switchPast()} 
                    className={past ? "text-left font-semibold px-1 py-2 tracking-tight text-lg cursor-pointer profile-active border-l-2 border-teal-500 bg-gray-200 dark:bg-gray-500" 
                    : "text-left tracking-tight text-lg cursor-pointer px-1 py-2 rounded-bl-md rounded-br-md hover:bg-gray-100 dark:hover:bg-gray-500"}>Past Events</button>
                </section>

                <section className="w-full sm:w-6/12 lg:w-5/12 xl:w-4/12">
                    <Yourevents />
                </section>
            </div>

        </main> 
    );
};

export default Profile;