import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem('user') === null) {
            loginAlert();
            navigate("/")
        }
    }, [])
    
    const loginAlert = () => {
        alert("please login to continue");
    }

    const logout = () => {
        localStorage.removeItem('user');
        navigate("/")
    }
    return (
        <div>

        <h1>WELCOME TO DASHBOARD</h1>

        <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;