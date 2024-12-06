import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importing GoogleOAuthProvider and GoogleLogin
import { FaGoogle } from "react-icons/fa"; // For Google Icon
import { toast } from "react-toastify"; // For toast notifications

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handling form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Username and Password are required");
      return;
    }

    // Simulate login action (can be replaced with actual authentication logic)
    if (username === "user" && password === "password123") {
      toast.success("Logged in successfully");
      navigate("/dashboard"); // Navigate to dashboard after login
    } else {
      toast.error("Invalid Username or Password");
    }
  };

  // Google Login Success handler
  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    toast.success("Logged in with Google");
    navigate("/dashboard"); // Navigate after successful login
  };

  // Google Login Error handler
  const handleGoogleLoginFailure = (error) => {
    console.log(error);
    toast.error("Google Login failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Provide your Google Client ID here */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-80">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-sm text-blue-500 text-right mb-4">
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-4 text-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
              className="w-full flex items-center justify-center py-3 mt-4 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              <FaGoogle className="mr-2 text-xl" />
              Login with Google
            </GoogleLogin>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
