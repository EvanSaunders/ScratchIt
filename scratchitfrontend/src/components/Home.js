import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import Login from './Login';
import { gapi } from 'gapi-script';

const clientId = "282650218440-6vb2j84rru32vf15iuli4bddqdpkq61l.apps.googleusercontent.com";

function Home() {
    const navigate = useNavigate();



    const handleNavigation = () => {
        // Correct way to navigate without full page reload
        navigate('/create-cards');
    };

    return (

        <div className="Home">

            <Appbar />
            <div id="signInDiv"></div>

            <button onClick={handleNavigation}>Navigate to Create Cards</button>

        </div>
    );
}

export default Home;
