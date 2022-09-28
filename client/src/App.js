import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";


function App() {

  const [user, setUser] = useState({});
  
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "582905064760-5f6mbfblnm6ba3kc2vv03l6jq3m9rsuf.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signIn"),
      { theme: "outline", size: "large" }
    )
  }, [])

  
  return (
    <div>
      <div id="signIn"></div>
    </div>
  );
}

export default App;
