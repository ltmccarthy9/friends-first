import { useEffect, useState } from "react";

const Register = () => {

    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ age, setAge ] = useState(18);

    const handleSubmit = async (e) => {
        fetch("http://localhost:4000/api/auth/register" , {
            method: "POST",

        })
    } 
   

    return (
        <div>
        <h1 className="title" >Friends First.</h1>
        <div className="login-card">
           <h1 className="login-header">Sign Up</h1>
            <div className="login-button" id="signIn"></div>
            <form id="myForm">
            <input placeholder="age" defaultValue={(18)} onChange={(e) => setAge(e.target.value)} type="number" className="form-control email"></input>
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