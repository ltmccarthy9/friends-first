import { useContext, useState } from "react"

import axios from "axios";

const Login = () => {
 
    
    return (
        <div className="login">
            <div className="logincontainer">
                <input
                type="email" 
                placeholder="email" 
                id="email" 
                className="input"
                />
                <input 
                type="password" 
                placeholder="password" 
                id="password" 
                className="input"
                />
                <button className="loginbutton">Login</button>
            </div>
        </div>
    )
}

export default Login;