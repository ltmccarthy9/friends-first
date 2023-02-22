import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    //useNavigate for changing url
    const navigate = useNavigate();
    
    //input text state for register form
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ passwordCheck, setPasswordCheck] = useState('');
    const [ age, setAge ] = useState(18);
    const [ checked, setChecked ] = useState(false);

    //function to check if form is properly filled by user
    const checkForm = (e) => {
        e.preventDefault();
        if(!name || !email || !password || !passwordCheck) {
            alert('You must fill every part of the form.');
            return;
        } else if(password !== passwordCheck) {
            alert('Your password must match.');
            return;
        } else if(age < 18) {
            alert('You must be at least 18 years old to sign up.');
            return;
        }
        //if form is properly filled, run handleSubmit function
        handleSubmit();
    };


    //function for registering user
    const handleSubmit = async () => {
        
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
          alert(error);
          navigate('/');
        });
    } 
   
    //nav home function
    const navHome = () => {
       navigate('/')
    }

    return (
        <div  className="flex flex-col">
            <h1 className="title theme-dark font-black tracking-tight text-6xl cursor-pointer" 
            onClick={navHome} >Friends First.</h1>
            <div className="login-card mt-32 mx-auto pt-8 pb-12 px-8">
            <h2 className="theme-dark text-center my-4 font-extrabold tracking-tight text-3xl">Sign Up</h2>
                <form id="myForm">
                    <input placeholder="name" onKeyUp={(e) => setName(e.target.value)} 
                    type="name" className="form-control my-2 chat-input"
                    ></input>
                    <input placeholder="email" onKeyUp={(e) => setEmail(e.target.value)} 
                    type="email" className="form-control my-2 chat-input"
                    ></input>
                    <input placeholder="password" onKeyUp={(e) => setPassword(e.target.value)} 
                    type="password" className="form-control my-2 chat-input"
                    ></input>
                    <input placeholder="re-type password" onKeyUp={(e) => setPasswordCheck(e.target.value)} 
                    type="password" className="form-control chat-input"
                    ></input>
                    <label className="font-bold mt-2" htmlFor="userAge">Age</label>
                    <input defaultValue={(18)} placeholder="age" id="userAge" onChange={(e) => setAge(e.target.value)} 
                    type="number" className="my-2 form-control chat-input w-16"
                    ></input>
                    <div className="py-2 w-fit h-fit">
                        <input onChange={(e) => setChecked(e.target.checked)} checked={checked} 
                        type="checkbox" id="geolocation" name="geolocation" value="1" className="mr-2 w-5 h-5"
                        ></input>
                        <label for="geolocation">Allow geolocation?</label>
                    </div>

                    <button type="button" onClick={(e) => checkForm(e)} 
                    className="sign-up btn btn-light sub"
                    >Sign Up</button>
                </form>
            </div> 
        </div>
    );
}

export default Register;