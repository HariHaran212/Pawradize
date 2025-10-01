import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// In a real app, you would get authentication status from a Context, Redux, etc.
const useAuth = () => {
  // For demonstration, we'll simulate a logged-in user.
  // Change to false to test the redirect.
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

export default function ProtectedRoute() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}