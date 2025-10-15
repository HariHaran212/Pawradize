import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

export default function RoleBasedRoute({ allowedRoles }) {
    const { isAuthenticated, user } = useUser();

  // 1. Check if the user is logged in at all
  if (!isAuthenticated || !user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // 2. Check if the user's role is in the list of allowed roles
  const isAuthorized = user && allowedRoles.includes(user.role);

  return isAuthorized ? (
    <Outlet /> // If authorized, render the child routes
  ) : (
    <Navigate to="/unauthorized" /> // If not authorized, redirect to an "Unauthorized" page
  );
}