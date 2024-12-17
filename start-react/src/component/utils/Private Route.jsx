import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = ApiService.isAuthenticated();

    if (!isAuthenticated) {
        // Redirect to login page, with the current location state
        // This allows redirecting back to the intended page after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;