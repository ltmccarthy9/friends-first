import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";


const Dashboard = () => {
    const navigate = useNavigate();

    const {data, loading, error } = useFetch("");

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

        <h1>WELCOME TO DASHBOARD</h1>

        <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;