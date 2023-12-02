import Appbar from "./Appbar";
import UserFields from "./UserFields";
import {Link, useNavigate } from 'react-router-dom';
import Card from "./Card";
import Scratchcardpage from "./Scratchcardpage";



function Home() {
    const navigate = useNavigate();
    return (
        <div className="Home">
            <Appbar/>
            <button onClick={() => navigate("/create-cards")}>Create Cards</button>

        </div>


    );
}

export default Home;