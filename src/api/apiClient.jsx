import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// Handle global errors, like 401 Unauthorized for expired tokens
apiClient.interceptors.response.use(
    (response) => {
        // If the request was successful, just return the response
        return response;
    },
    (error) => {
        // Check if the error is a 401 Unauthorized
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log("Unauthorized request. Token might be expired. Logging out.");
            // Remove the expired token
            localStorage.removeItem('authToken');
            // Redirect to the login page
            window.location.href = '/login'; 
        }

        // For all other errors, just pass them along
        return Promise.reject(error);
    }
);

export default apiClient;