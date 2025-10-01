import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RoleBasedRoute({ allowedRoles }) {
  const { loggedIn, role } = useAuth();

  // 1. Check if the user is logged in at all
  if (!loggedIn) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // 2. Check if the user's role is in the list of allowed roles
  const isAuthorized = allowedRoles.includes(role);

  return isAuthorized ? (
    <Outlet /> // If authorized, render the child routes
  ) : (
    <Navigate to="/unauthorized" /> // If not authorized, redirect to an "Unauthorized" page
  );
}