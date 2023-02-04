import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Nav from "../components/Nav";


const Dashboard = () => {
    //useNavigate for changing pages
    const navigate = useNavigate();

    //if user is not logged in, navigate to home. 
    //This was the initial working version, I am going to consolidate so that we use jwt instead of localstorage.
    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])
    
    // alert if you try to access other routes without being loggedin
    const loginAlert = () => {
        alert("please login to continue");
    }

    return (
        <div>
            <Nav/>
            <div className="flex mb-4">
                <h2 className="theme-green tracking-tight text-2xl m-auto rounded-xl">Nearby Events</h2>
            </div>
        {/* body containing each event card */}
            <div>
                <Events /> 
            </div>
        </div> 
    );
};

export default Dashboard;