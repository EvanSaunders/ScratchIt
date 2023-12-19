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

    return (

        <div className="Home">

            <Appbar />
            <div id="signInDiv"></div>
            {/* Do logout*/}
            {/*<button onClick={(e) =>handleSignOut(e)}>Sign Out</button>*/}
            <button onClick={handleNavigation}>Navigate to Create Cards</button>

        </div>
    );
}

export default Home;
