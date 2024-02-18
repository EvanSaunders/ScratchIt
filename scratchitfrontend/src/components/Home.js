import React, { useEffect, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import { gapi } from 'gapi-script';
import app from "../App";
import {Shift} from 'ambient-cbg'
import silogo from "../assets/scratchit-01.png";




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

        <div className="min-h-screen flex flex-col">
            <Appbar />
            <div className="flex-1 flex flex-col justify-center items-center text-white">
                <div className="mb-8">
                    <img src={silogo} className="w-64 h-auto mx-auto" alt="Logo"/>
                    <h1 className="text-7xl">ScratchIt!</h1>
                </div>
                <h1 className="text-2xl">Create and Distribute Scratch Off Cards</h1>
            </div>
            <Shift />
        </div>


    );
}

export default Home;
