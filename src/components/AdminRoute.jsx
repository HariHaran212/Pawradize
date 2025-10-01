import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// In a real app, you would check the user's role.
const useAdminAuth = () => {
  // For demonstration, we'll simulate an admin user.
  const user = { role: 'admin' };
  return user && user.role === 'admin';
};

export default function AdminRoute() {
  const isAdmin = useAdminAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}