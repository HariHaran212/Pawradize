import React from 'react';
import { Outlet } from 'react-router-dom';
import AdoptionCoordinatorNavbar from '../adoption-coordinator/components/AdoptionCoordinatorNavbar';
import { RoleContext } from '../context/RoleContext';


export default function AdoptionCoordinatorLayout({ children }) {
  const roleContextValue = { basePath: '/adoption' };

  return (
    <RoleContext.Provider value={roleContextValue}>
      <div className="flex flex-col min-h-screen bg-ivory font-poppins">
        <AdoptionCoordinatorNavbar />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-6 py-8">
              {children || <Outlet />}
          </div>
        </main>
      </div>
    </RoleContext.Provider>
  );
}