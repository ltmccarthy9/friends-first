import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    
   //useNavigate hook for changing react route
    const navigate = useNavigate();

    // After successfully logging in through google, google sends us a JWT with
    // The users details.  We then decode it and have access to their information.
    // We want to create an account, so we check if there is an existing account 
    // with that email, if there is -> redirect to dashboard.
    // if there is no account, we ask for their age first and then register the user
    // using the email and name provided by the JWT from google, then redirect to dashboard.
    
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const userObject = jwt_decode(response.credential);
        localStorage.setItem('user', 'loggedin');
        console.log(userObject);
        const userEmail = userObject.email;
        fetch(`/users/${userEmail}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success', data);
          if(data.email){
            navigate("/dashboard");
          } else {
            //modal ask for age input since google account doesn't supply age.
            fetch(`/google`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: userObject.given_name,
                email: userEmail,
                age: age
              }),
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success', data);
            })
            .catch((error) => {
              console.error('Error', error);
            })
          }
        })
        .catch((error) => {
          console.error('Error', error);
        });
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