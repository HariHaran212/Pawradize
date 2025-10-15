import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getBasePathForRole } from '../utils/helper';

export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    const handleLogin = async () => {
      // Extract the token (and any errors) from the URL query parameters
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (token) {
        // If a token is present, save it to localStorage
        localStorage.setItem('authToken', token);
        
        const loggedInUser = await login(token);
        
        if (loggedInUser) {
            const path = getBasePathForRole(loggedInUser.role);
            navigate(path, { replace: true });
        } else {
            navigate('/'); // Fallback to homepage
        }
      } else if (error) {
        // If there's an error, log it and redirect to the login page with an alert
        console.error("OAuth2 Error:", error);
        alert(`Login failed: ${error}`);
        navigate('/login');
      } else {
          // If no token or error is found, it's an unexpected state
          alert("Could not find token. Returning to login page.");
          navigate('/login');
      }
    }

    handleLogin();

    // This effect should only run once on component mount
  }, [searchParams, navigate, login]);

  // Render a loading indicator while processing
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Loading, please wait...</p>
    </div>
  );
}