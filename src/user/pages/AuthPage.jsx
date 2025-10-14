import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaApple } from "react-icons/fa"; // Optional other logins
import { useUser } from "../../context/UserContext";
import apiClient from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_BASE_URL;


export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useUser();

  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State for handling errors and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 1. Handler for Manual Login/Registration ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError("");
    setLoading(true);

    const url = isLogin 
      ? `/api/auth/login` 
      : `/api/auth/register`;

    const payload = isLogin
      ? { email: email, password: password } // Backend expects 'email' for login
      : { firstName: firstName, lastName: lastName, email: email, password: password };

    try {
      const response = await apiClient.post(url, payload);
      
      // console.log("Success:", response.data);

      if (isLogin) {
        // --- On successful login, save the token ---
        const token = response.data.data.token;
        localStorage.setItem("authToken", token); // Save token to local storage
        // console.log(response);
        
        await login(token);

        navigate("/");
      } else {
        // On successful registration, switch to the login tab
        alert("Registration successful! Please log in.");
        setIsLogin(true);
      }

    } catch (err) {
      // Handle errors from the backend
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Authentication error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handler for Google Login ---
  const handleGoogleLogin = () => {
    // This is not an API call. It's a full page redirect to the backend's OAuth2 endpoint.
    console.log("Redirecting to Google OAuth2...");
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Tabs */}
        <div className="flex justify-between mb-6 border-b">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 font-semibold ${
              isLogin ? "text-primary border-b-2 border-primary" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 font-semibold ${
              !isLogin ? "text-primary border-b-2 border-primary" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none"
                  placeholder="Enter your First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none"
                  placeholder="Enter your Last name"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none"
              placeholder="********"
            />
          </div>

          {/* Display error message if it exists */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary outline-none"
                placeholder="********"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-lightgreen transition"
          >
            {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        {/* Forgot Password */}
        {isLogin && (
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        )}

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button 
            onClick={handleGoogleLogin} // Attach Google handler
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-50 transition">
            <FcGoogle size={22} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-50 transition">
            <FaApple size={22} />
            <span className="text-sm font-medium">Continue with Apple</span>
          </button>
        </div>

        {/* Switch Login/Signup */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
