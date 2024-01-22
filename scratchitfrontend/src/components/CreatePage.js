import React, {useEffect} from 'react';
import Appbar from "./Appbar";
import UserFields from "./UserFields";
import { useAuth } from './AuthContext';
import {useNavigate} from "react-router-dom";



function CreatePage() {
    const navigate = useNavigate();
    useEffect(() => {

        const jwtToken = localStorage.getItem('jwtToken');
        console.log(jwtToken);
        if(!jwtToken ){
            navigate('/login');
        }


    }, []);

    return (
        <div className="dark:bg-gray-800">
            <Appbar/>
            <UserFields/>

        </div>
    );
}

export default CreatePage;
