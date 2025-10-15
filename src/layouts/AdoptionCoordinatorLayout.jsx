import React from 'react';
import { Outlet } from 'react-router-dom';
import AdoptionCoordinatorNavbar from '../adoption-coordinator/components/AdoptionCoordinatorNavbar';

export default function AdoptionCoordinatorLayout({ children }) {

  return (
    <div className="flex flex-col min-h-screen bg-ivory font-poppins">
      <AdoptionCoordinatorNavbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-8">
            {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}