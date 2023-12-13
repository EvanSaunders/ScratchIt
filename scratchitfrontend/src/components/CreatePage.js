import React from 'react';
import Appbar from "./Appbar";
import UserFields from "./UserFields";
import { useAuth } from './AuthContext';

function AuthRequiredComponent() {


    return (
        <div>

            <UserFields/>
        </div>
    );
}

function CreatePage() {
    return (
        <div className="App">
            <Appbar/>

            <AuthRequiredComponent />
        </div>
    );
}

export default CreatePage;
