import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  
  
    // State for user input for login/signup
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

   //useNavigate hook for changing react route
    const navigate = useNavigate();

      const handleLog = async (e) => {
        e.preventDefault();
         fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        }).then((response) => response.json())
        .then((data) => {
          console.log('Success', data);
          if(data.email === `${email}`){
            localStorage.setItem('user', 'loggedin');
            navigate("/dashboard")
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
      };

    
    return (
  <div>
    <h1 className="title" >Friends First.</h1>
        <div className="login-card">
           <h1 className="login-header">Sign in</h1>
            <form id="myForm">
                <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control email"></input>
                <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control pass"></input>
            
            
            <button style={{margin: "10px"}} type="button" onClick={(e) => handleLog(e)} className="btn btn-light sub">Sign in</button>
            <p className="no-account" >Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="btn sign-up">Register</button>
        </form>

        </div>
       
        </div>
    );
}

export default Home;