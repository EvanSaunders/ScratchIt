// AuthContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Check browser storage or perform any other logic to restore authentication state
        const storedAuthState = localStorage.getItem('authState');
        if (storedAuthState) {
            setAuthenticated(JSON.parse(storedAuthState));
        }
    }, []);
    const login = () => {
        // Perform login logic (e.g., setting tokens, updating state)
        setAuthenticated(true);
        localStorage.setItem('authState', JSON.stringify(true));
    };

    const logout = () => {
        // Perform logout logic (e.g., clearing tokens, updating state)
        setAuthenticated(false);
        localStorage.removeItem('authState');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
