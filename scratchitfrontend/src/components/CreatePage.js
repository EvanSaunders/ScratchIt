import React from 'react';
import Appbar from "./Appbar";
import UserFields from "./UserFields";
import { useAuth } from './AuthContext';

function AuthRequiredComponent() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect or show login component if not authenticated
        return <p>Please log in to access this content.</p>;
    }

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
