import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const goLogin = (e) => {
        e.preventDefault();
        navigate("/login")
    }

    return(
        <div>
            <button type="button" onClick={goLogin}>Login</button>
        </div>
    );
};

export default Home;