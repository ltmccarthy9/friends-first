import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


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
        fetch(`http://localhost:4000/api/users/google/${userEmail}`, {
          method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(data){
            navigate("/dashboard");
          } else {
            const userAge = prompt("What is your age?")
            //modal ask for age input since google account doesn't supply age.
            fetch(`http://localhost:4000/api/auth/google`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: userObject.given_name,
                email: userObject.email,
                age: userAge
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
  <div>
    <h1 className="title" >Friends First.</h1>
        <div className="login-card">
           <h1 className="login-header">Login</h1>
            <div className="login-button" id="signIn"></div>
            <h2 className="login-header">or</h2>
            <form id="myForm">
                <input placeholder="email" type="name" className="form-control email"></input>
                <input placeholder="password" type="password" className="form-control name"></input>
            
            
            <button style={{margin: "10px"}} type="submit" className="btn btn-light sub">Sign in</button>
        </form>

        </div>
       
        </div>
    );
}

export default Home;