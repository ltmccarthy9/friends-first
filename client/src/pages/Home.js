import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
    
   //useNavigate hook for changing react route
    const navigate = useNavigate();

    // handles object response from google and sets user to logged in.
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        localStorage.setItem('user', 'loggedin');
        navigate("/dashboard");
        // fetch("/users", {
        //     method: "GET",
        //     
        // })
      }
      // ADD FACEBOOK LOGIN OPTION
      //need state management for credentials to generate the correct profile.

      // generate google button and google login
      useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "582905064760-5f6mbfblnm6ba3kc2vv03l6jq3m9rsuf.apps.googleusercontent.com",
          callback: handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
          document.getElementById("signIn"),
          { theme: "outline", size: "medium" }
        )
      }, [])
    
    return (
        <div style={{margin: "0 auto", boxShadow: "1px 0px 8px #252525", 
        width: "300px", height: "400px", 
        position: "relative", padding: "10px", top: "20em",
        backgroundColor: "white", borderRadius: ".5em"}}>

            <h1 style={{margin: "0 auto", width: "200px", 
            height: "auto", padding: "10px", 
            position: "relative", fontWeight: "lighter", textAlign: "center"}} >Friends First</h1>

            <div style={{margin: "0 auto", width: "175px", 
            height: "auto", padding: "10px", 
            position: "relative"}} id="signIn"></div>
        </div>
       
    );
}

export default Home;