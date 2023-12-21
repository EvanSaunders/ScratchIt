import React, {useEffect} from 'react';
import Appbar from "./Appbar";
import UserFields from "./UserFields";
import { useAuth } from './AuthContext';
import {useNavigate} from "react-router-dom";



function CreatePage() {
    const navigate = useNavigate();
    useEffect(() => {

        const jwtToken = localStorage.getItem('jwtToken');
        if(!jwtToken){
            navigate('/login');
        }


    }, []);

    return (
        <div className="App">
            <Appbar/>
            <UserFields/>

        </div>
    );
}

export default CreatePage;
