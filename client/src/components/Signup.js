import { useState } from "react";
import useAxios from "../hooks/useAxios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const { data, loading, error } = useAxios("")
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleFormSubmit}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="Password" />
                <input 
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                type="password" 
                placeholder="confirm password" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Signup;