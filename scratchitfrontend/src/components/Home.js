import Appbar from "./Appbar";
import UserFields from "./UserFields";
import {Link, useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    return (
        <div className="Home">
            <Appbar/>
            <button onClick={() => navigate("/createCards")}>Create Cards</button>
        </div>

    );
}

export default Home;