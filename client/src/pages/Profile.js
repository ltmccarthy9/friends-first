import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    const goDashboard = () => {
        navigate("/dashboard");
    }
    return (
        <div>
            Welcome to your profile page.
            <button onClick={goDashboard}>Dashboard</button>
        </div>
    );
};

export default Profile;