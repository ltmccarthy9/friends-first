import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ passwordCheck, setPasswordCheck] = useState('');
    const [ age, setAge ] = useState(18);

    const checkForm = (e) => {
        e.preventDefault();
        if(!name || !email || !password || !passwordCheck) {
            alert('You must fill every part of the form')
            return;
        } else if(password !== passwordCheck) {
            alert('Your password must match');
            return;
        }

        handleSubmit();
    };


    const handleSubmit = async () => {
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
          navigate('/events');
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
       navigate('/')
    }

    return (
        <div  className="flex flex-col">
            <h1 className="title theme-green font-extrabold tracking-tight text-6xl cursor-pointer" onClick={navHome} >Friends First.</h1>
            <div className="login-card mt-32 mx-auto pt-8 pb-12 px-8">
            <h1 className="theme-green text-center my-4 font-extrabold tracking-tight text-3xl">Sign Up</h1>
                <form id="myForm">
                    <input placeholder="name" onKeyUp={(e) => setName(e.target.value)} type="name" className="form-control my-2 chat-input"></input>
                    <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} type="email" className="form-control my-2 chat-input"></input>
                    <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} type="password" className="form-control my-2 chat-input"></input>
                    <input placeholder="re-type password" onKeyUp={(e) => setPasswordCheck(e.target.value)} type="password" className="form-control chat-input"></input>
                    <label className="font-bold mt-2" htmlFor="userAge">Age</label>
                    <input defaultValue={(18)} placeholder="age" id="userAge" onChange={(e) => setAge(e.target.value)} type="number" className="my-2 form-control chat-input w-16"></input>

                    <button type="button" onClick={(e) => checkForm(e)} className="btn btn-light sub">Sign Up</button>
                </form>

            </div> 
        </div>
    );
}

export default Register;