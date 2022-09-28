import { useState } from "react";


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [age, setAge] = useState();
    
    return (
        <div>
            <h1>Signup</h1>
            <form>
                <input 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                type="text" 
                placeholder="First Name" />
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                placeholder="Email" />
                <input 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number" 
                placeholder="age" />
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="Password" />
                <input 
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                type="password" 
                placeholder="confirm password" />
                <input type="button" value="Submit" />
            </form>
        </div>
    );
}

export default Signup;