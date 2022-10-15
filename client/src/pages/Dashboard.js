import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";


const Dashboard = () => {
    const navigate = useNavigate();

    // const {data, loading, error } = useFetch("/events");

    // Check to see if the user is logged in
    useEffect(() => {
        if(localStorage.getItem('user') != 'loggedin') {
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
        navigate("/")
    }


    return (
        <div>

        <div className="nav">
        <h1 className="dash-title" >Friends First.</h1>
        <button className="btn btn-light logout" onClick={logout}>Logout</button>
        </div>

        <div className="dashboard-body">
            <h3>Nearby Events</h3>
        </div>

        </div>
    );
};

export default Dashboard;