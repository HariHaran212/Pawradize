import React from 'react';
import { Outlet } from 'react-router-dom';
import StoreManagerNavbar from '../store-manager/components/StoreManagerNavbar';

export default function StoreManagerLayout({ children }) {
  
  return (
    <div className="flex flex-col min-h-screen bg-ivory font-poppins">
      <StoreManagerNavbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-8">
            {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}