// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element, ...props }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default PrivateRoute;
