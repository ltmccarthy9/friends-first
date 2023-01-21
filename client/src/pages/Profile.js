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
         <div className="flex-col">
            <Nav/>
            <div>
                <Yourevents /> 
            </div>
        </div> 
    );
};

export default Profile;