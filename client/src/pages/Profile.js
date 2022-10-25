import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    // Navigate to dashboard page
    const goDashboard = () => {
        navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem('user');
        navigate("/")
    }
    return (
        <div>

        <div className="nav">
            <h1 className="dash-title" >Profile page.</h1>
            <button className="btn btn-light profile-button" onClick={goDashboard}>Dashboard</button>
            <button className="btn btn-light logout" onClick={logout}>Logout</button>
        </div>
        <div className="dashboard-body">
            <h3>Your events</h3>
        </div>

        </div>
    );
};

export default Profile;