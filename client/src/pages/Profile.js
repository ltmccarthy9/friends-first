import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Yourevents from "../components/Yourevents";
import Nav from "../components/Nav";

const Profile = () => {

    const navigate = useNavigate();

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
            <Nav/>
            <div className="dashboard-body">
                <h3 className="font-extrabold tracking-tight text-2xl">Your events</h3>
                <Yourevents /> 
            </div>
        </div> 
    );
};

export default Profile;