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

        <div>

            <Appbar/>
            <div className="flex flex-col items-center  h-screen mt-10">
            <div >
            <button onClick={handleNavigation} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mb-8">Navigate to Create Cards</button>
            </div>
            <div>
            <button onClick={handleNavigation2} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded" >Navigate to View Cards</button>
            </div>
            </div>
        </div>
    );
}

export default Home;
