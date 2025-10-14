import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const token = localStorage.getItem('authToken');

    // If there's a token, redirect away from the public page. Otherwise, show it.
    return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;