import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-date-picker'

const Register = () => {
    const navigate = useNavigate();

    //input text state for register form
    const [ name, setName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ passwordCheck, setPasswordCheck] = useState('');
    const [ checked, setChecked ] = useState(false);
    const [ birth, setBirth] = useState(new Date())
   
    //function to check if form is properly filled by user
    const checkForm = (e) => {
        e.preventDefault();
        if(!name || !email || !password || !passwordCheck) {
            alert('You must fill every part of the form.');
            return;
        } 
        // else if(password !== passwordCheck) {
        //     alert('Your password must match.');
        //     return;
        // }
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
                name: name,
                email: email,
                password: password,
                password2: passwordCheck,
                birthdate: birth,
                uselocation: checked
              }),
        }).then((response) => response.json())
        .then((data) => {
            //(these won't be caught by catch, they are mongodb validation errors)
          if(data.error){
            console.log(data.status)
            //loop through object keys and alert user of each error
            let errors = data.error
            const keys = Object.keys(errors);
            keys.forEach((key, index) => {
                alert(`${key}: ${errors[key]}`);
            })
          } else if (data.status === 200) {
            alert("Successfully registered")
            navigate('/login');
          } else {
            alert(`${data.message}`)
          }
        })
        .catch((error) => {
            console.log("there is error", error)
            alert(error.message || error);
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
                    <p className="font-bold mt-2 text-black">Birth date</p>
                    <div>
                        <DatePicker className="h-10" onChange={setBirth} value={birth}/>
                    </div>
                    <div className="py-2 w-fit h-fit">
                        <input onChange={(e) => setChecked(e.target.checked)} checked={checked} 
                        type="checkbox" id="geolocation" name="geolocation" value="1" className="mr-2 w-5 h-5"
                        ></input>
                        <label htmlFor="geolocation">Can we use your location?</label>
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