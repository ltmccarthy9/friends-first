import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";

const Login = () => {
  
    // State for user text input
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    //dispatch for redux
    const dispatch = useDispatch();

   //useNavigate hook for changing react route
    const navigate = useNavigate();

    //function for handling user login
    const handleLog = async (e) => {
      //using a form and submit, so want to prevent defualt
      e.preventDefault();
        //use fetch POST to connect to our login route
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
        //if a jwt(token) is sent back, login the user using dispatch and redux
        if(data.token){
          dispatch(setLogin({
            user: data.user,
            token: data.token,
          }))
          localStorage.setItem('id', data.user._id)
          navigate("/events")
        }
      })
      .catch((error) => {
        //if the response is an error, alert with an error
        alert(error);
      });
    };

    // nav home function
      const navHome = () => {
        navigate('/')
     }

    
    return (
    <div className="flex flex-col">
      <h1 onClick={navHome} className="title theme-dark font-black tracking-tight text-6xl cursor-pointer" >Friends First.</h1>
        
      <div className="login-card mt-32 mx-auto pt-8 pb-12 px-8">
        <h2 className="theme-dark text-center my-4 font-extrabold tracking-tight text-3xl">Log in</h2>
          <form id="myForm">
            <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control my-3 chat-input"></input>
            <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control my-1 chat-input"></input>
            <button type="button" onClick={(e) => handleLog(e)} className="btn sub mx-2 mt-2 border-solid border-1 border-gray-200">Sign in</button>
            <p className="no-account mt-4 mb-1 text-black" >Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="btn sign-up mx-2">Register</button>
          </form>
      </div>
    </div>
    );
}

export default Login;