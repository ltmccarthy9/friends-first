import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";

const Profile = () => {

    const navigate = useNavigate();

    // Navigate to dashboard page
    const goDashboard = () => {
        navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        navigate("/")
    }

    useEffect(() => {
        if(localStorage.getItem('user') !== 'loggedin') {
            loginAlert();
            navigate("/")
        }
    }, [])

    const loginAlert = () => {
        alert("please login to continue");
    }

    return (
         <div>

        <div className="nav">
        <h1 className="dash-title font-extrabold tracking-tight text-3xl" >Friends First.</h1>
        <button className="btn btn-light profile-button" onClick={goDashboard}>Dashboard</button>
        <button className="btn btn-light logout" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-body">
            <h3 className="font-extrabold tracking-tight text-2xl">Your events</h3>
            <Yourevents /> 
        </div>

        </div> 
    );
};

export default Profile;