import React from 'react';
import AdminNavbar from '../admin/components/AdminNavbar';
import AdminFooter from '../admin/components/AdminFooter';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
}