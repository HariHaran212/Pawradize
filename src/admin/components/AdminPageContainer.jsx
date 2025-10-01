import React from 'react';

export default function AdminPageContainer({ children }) {
  return (
    <div className="font-poppins text-text-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}