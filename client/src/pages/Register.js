import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ age, setAge ] = useState(18);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`${age} ${name} ${email} ${password}`)
        fetch("http://localhost:4000/api/auth/register" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                age: age,
                name: name,
                email: email,
                password: password
              }),
        }).then((response) => response.json())
        .then((data) => {
          alert('Successfully registered!');
          navigate('/');
        })
        .catch((error) => {
          console.log('Error', error);
          alert(error);
          navigate('/');
        });
    } 
   
    // if user is logged in go to dashboard
    // if not, go back to login page
    const navHome = () => {
        if(localStorage.getItem('user') === 'loggedin'){
            navigate("/dashboard")
        } else {
            navigate("/") 
        }
    }

    return (
        <div>
        <h1 className="title font-extrabold tracking-tight text-6xl" onClick={navHome} >Friends First.</h1>
        <div className="login-card">
           <h1 className="login-header font-extrabold tracking-tight text-3xl">Sign Up</h1>
            <div className="login-button" id="signIn"></div>
            <form id="myForm">
            <label style={{fontWeight: "bolder"}} htmlFor="userAge">Age</label>
            <input style={{width: "20%"}} defaultValue={(18)} id="userAge" onChange={(e) => setAge(e.target.value)} type="number" className="form-control email"></input>
            <input placeholder="name" onKeyUp={(e) => setName(e.target.value)} type="name" className="form-control email"></input>
            <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control email"></input>
            <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control pass"></input>
            
            
            <button style={{margin: "10px"}} type="button" onClick={(e) => handleSubmit(e)} className="btn btn-light sub">Sign Up</button>
        </form>

        </div> 
        </div>
    );
}

export default Register;