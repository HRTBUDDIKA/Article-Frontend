import React from 'react';
import { Navigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const AdminRoute = ({ children }) => {
    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;