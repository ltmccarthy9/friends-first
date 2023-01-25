import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const Home = () => {
  
  
    // State for user input for login/signup
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

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
          console.log(data);
          if(data.token){
            dispatch(setLogin({
              user: data.user,
              token: data.token,
            }))
            localStorage.setItem('user', 'loggedin');
            localStorage.setItem('id', data.user._id)
            console.log(data.user._id)
            navigate("/dashboard")
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
      };

    
    return (
  <div>
    <h1 className="title font-extrabold tracking-tight text-6xl" >Friends First.</h1>
        <div className="login-card">
           <h1 className="login-header font-extrabold tracking-tight text-3xl">Sign in</h1>
            <form id="myForm">
                <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control email"></input>
                <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control pass"></input>
            
            
            <button style={{margin: "10px"}} type="button" onClick={(e) => handleLog(e)} className="btn btn-light sub">Sign in</button>
            <p className="no-account m-2" >Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="btn sign-up">Register</button>
        </form>

        </div>
       
        </div>
    );
}

export default Home;