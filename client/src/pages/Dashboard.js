import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Events from "../components/Events";



const Dashboard = () => {
    const navigate = useNavigate();

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

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        navigate("/")
    }
    
    const goProfile = () => {
        navigate("/profile");
    }


    return (
        <div>

        {/*Replace this with nav component*/}
        <div className="nav">
        <h1 className="dash-title" >Friends First.</h1>
        <button className="btn btn-light profile-button" onClick={goProfile}>Profile</button>
        <button className="btn btn-light logout" onClick={logout}>Logout</button>
        </div>

        {/* body containing each event card */}
        <div className="dashboard-body">
            <h3>Nearby Events</h3>
            <Events /> 
        </div>

        </div> 
    );
};

export default Dashboard;