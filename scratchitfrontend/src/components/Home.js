import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import Login from './Login';
import { gapi } from 'gapi-script';

const clientId = "282650218440-6vb2j84rru32vf15iuli4bddqdpkq61l.apps.googleusercontent.com";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        function loadGoogleApi() {
            gapi.load('client', {
                callback: initializeGoogleApi,
                onerror: () => console.error('Failed to load Google API client'),
                timeout: 10000, // Set a timeout to handle potential loading issues
                ontimeout: () => console.error('Timeout loading Google API client'),
            });
        }

        function initializeGoogleApi() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            }).then(() => {
                console.log('Google API client initialized successfully');
            }).catch((error) => {
                console.error('Error initializing Google API client', error);
            });
        }

        // Call the loadGoogleApi function to load and initialize the Google API client
        loadGoogleApi();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleNavigation = () => {
        // Correct way to navigate without full page reload
        navigate('/create-cards');
    };

    return (
        <div className="Home">
            <Appbar />
            <Link to="/create-cards">Link to Create Cards</Link>
            <button onClick={handleNavigation}>Navigate to Create Cards</button>
            <Login />
        </div>
    );
}

export default Home;
