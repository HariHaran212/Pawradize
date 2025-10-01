import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminFooter() {
  return (
    <footer className="bg-ivory border-t border-accent mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center text-xs text-text-medium">
          <p>&copy; {new Date().getFullYear()} Pawradise Admin Panel. All Rights Reserved.</p>
          <Link to="/" className="hover:text-primary hover:underline">
            Back to Main Site
          </Link>
        </div>
      </div>
    </footer>
  );
}