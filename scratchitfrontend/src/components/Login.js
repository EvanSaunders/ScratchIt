import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        localStorage.setItem('jwtToken', response.credential)
        console.log(jwtDecode(localStorage.getItem('jwtToken')));
        document.getElementById("signInDiv").hidden = true;

        navigate("/");
    }



    useEffect(() => {

        const jwtToken = localStorage.getItem('jwtToken');
        if(!jwtToken){
            /* global google */
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCallbackResponse
            })

            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size:"large"}
            )
            google.accounts.id.prompt();

        }


    }, []);

    return (
        <div id="signInDiv"></div>
    );
};

export default Login;