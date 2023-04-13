import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/auth'

const Login = () => {
  
    // State for user text input
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
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
          console.log(data);
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('successfully logged in firebase user ', user)
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("something went wrong logging in firebase user ", errorCode, errorMessage)
          });
          dispatch(setLogin({
            user: data.user,
            token: data.token,
          }))
          localStorage.setItem('id', data.user._id)
          navigate("/events")
        } else {
          alert(data.error)
        }
      })
      .catch((error) => {
        //if the response is an error, alert with an error
        alert('error', error);
      });
    };

    // nav home function
      const navHome = () => {
        navigate('/')
     }

    
    return (
    <main className="flex flex-col">
      <h1 onClick={navHome} 
      className="font-black tracking-tight text-center text-gray-700 text-6xl cursor-pointer mt-10 sm:mt-32 "
      >Friends First.</h1>
        
      <section className="login-card bg-gray-50 mt-10 sm:mt-32 mx-auto pt-8 pb-12 px-8">
        <h2 className="theme-dark text-center my-4 font-extrabold tracking-tight text-3xl">Log in</h2>
          <form id="myForm">
            <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} 
            type="email" className="form-control my-3 chat-input"
            required></input>
            <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} 
            type="password" className="form-control my-1 chat-input"
            required></input>
            <button type="button" onClick={(e) => handleLog(e)} 
            className="btn font-bold mt-3 border-solid border-1 bg-teal-300 hover:bg-teal-400 w-full"
            >Sign in</button>
            <p className="no-account mt-4 mb-1 text-black" >Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} 
            className="btn bg-gray-700 text-gray-50 hover:bg-gray-800 hover:text-gray-50 w-full"
            >Register</button>
          </form>
      </section>
    </main>
    );
}

export default Login;