import { createContext, useContext } from 'react';

// Create the context with a default value
export const RoleContext = createContext({ basePath: '/admin' });

// Create a custom hook for easy access to the context's value
export const useRole = () => {
  return useContext(RoleContext);
};