import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Appbar from './Appbar';

import { gapi } from 'gapi-script';
import app from "../App";




function Home() {
    const navigate = useNavigate();



    const handleNavigation = () => {
        // Correct way to navigate without full page reload
        navigate('/create-cards');
    };
    const handleNavigation2 = () => {
        // Correct way to navigate without full page reload
        navigate('/view-sent-cards');
    };

    return (

        <div className="Home">

            <Appbar/>
            <div id="signInDiv"></div>

            <button onClick={handleNavigation}>Navigate to Create Cards</button>
            <button onClick={handleNavigation2}>Navigate to View Cards</button>

        </div>
    );
}

export default Home;
