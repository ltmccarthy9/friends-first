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
    <div className="flex flex-col">
      <h1 className="title font-extrabold tracking-tight text-6xl cursor-pointer" >Friends First.</h1>
        
      <div className="login-card mt-32 mx-auto pt-8 pb-12 px-8">
        <h1 className="theme-green text-center my-4 font-extrabold tracking-tight text-3xl">Sign in</h1>
          <form id="myForm">
            <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control my-3 chat-input"></input>
            <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control my-1 chat-input"></input>
            <button type="button" onClick={(e) => handleLog(e)} className="btn sub mx-2 mt-2 border-solid border-1 border-gray-200">Sign in</button>
            <p className="no-account mt-2 mb-1" >Don't have an account?</p>
            <button type="button" onClick={() => navigate("/register")} className="btn sign-up mx-2">Register</button>
          </form>
      </div>
    </div>
    );
}

export default Home;