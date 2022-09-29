import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"

const Home = () => {
    
    const navigate = useNavigate();

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        //const userObject = jwt_decode(response.credential);
        localStorage.setItem('user', JSON.stringify(response.credential));
        navigate("/dashboard");
      }

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
        <div style={{margin: "0 auto", boxShadow: "1px 0px 8px black", 
        width: "300px", height: "300px", 
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