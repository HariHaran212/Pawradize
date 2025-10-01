import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';

export default function UnauthorizedPage() {
  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4 text-lg text-text-medium">
          You do not have the necessary permissions to view this page.
        </p>
        <Link 
          to="/" 
          className="inline-block mt-6 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </PageContainer>
  );
}