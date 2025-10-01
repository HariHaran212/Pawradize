// // src/hooks/useAuth.js

// // In a real application, this hook would connect to your authentication context
// // to get the real logged-in user's data.
// export const useAuth = () => {
//   // --- SIMULATED USER ---
//   // Change the role to test different access levels:
//   // 'Super Admin', 'Store Manager', 'Adoption Coordinator', 'User', or null
//   const user = {
//     loggedIn: true,
//     // role: 'Super Admin', 
//     role: 'Store Manager', 
//   };
  
//   return user;
// };

export const useAuth = () => {
  // --- SIMULATED USER ---
  // Change the role here to test the view for different users
  const role = 'Super Admin'; // Can be 'Super Admin', 'Store Manager', etc. Adoption Coordinator

  const userData = {
    'Super Admin': { name: 'Admin John', email: 'john.admin@pawradise.com', phone: '+919876543210', role: 'Super Admin' },
    'Store Manager': { name: 'Manager Priya', email: 'priya.manager@pawradise.com', phone: '+919876543211', role: 'Store Manager' },
    'Adoption Coordinator': { name: 'Coordinator Rohan', email: 'rohan.coordinator@pawradise.com', phone: '+919876543212', role: 'Adoption Coordinator' },
  }
  
  return {
    loggedIn: true,
    ...userData[role] // Return the full profile for the current role
  };
};