import React from 'react';

export default function PageContainer({ children }) {
  return (
    // This div sets the consistent theme, width, and padding for all pages.
    <div className="font-poppins text-text-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}