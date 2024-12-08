import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Importing GoogleOAuthProvider and GoogleLogin
import { FaGoogle } from "react-icons/fa"; // For Google Icon
import { toast } from "react-toastify"; // For toast notifications
import { ClipLoader } from "react-spinners"; // Importing a loader spinner (react-spinners)

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  
  // Handling form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Username and Password are required");
      return;
    }

    // Simulate login action (can be replaced with actual authentication logic)
    if (username === "gnv1996" && password === "Gautam123") {
      toast.success("Logged in successfully");

      
      navigate("/");
    } else {
      toast.error("Invalid Username or Password");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login response:", response);
  
    // Make sure the response has the credential
    if (response && response.credential) {
      
      toast.success("Logged in with Google");

    } else {
      toast.error("Google login failed. Please try again.");
    }
  };
  
  // Google Login Error handler
  const handleGoogleLoginFailure = (error) => {
    console.log(error);
    toast.error("Google Login failed");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Provide your Google Client ID here */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center p-8  sm:p-8 lg:p-24">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row w-full max-w-4xl">
          {/* Left Column: Login Form */}
          <div className="w-full sm:w-1/2 px-4 mt-8 sm:mt-0">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Welcome to HRMS</h1>
            <p className="text-lg text-center text-gray-600 mb-8">
              Human Resource Management System
            </p>

            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
              Login
            </h2>
            <form onSubmit={handleLogin}>
              {/* Username Field */}
              <div className="mb-5">
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
              <div className="mb-5">
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
              <div className="text-sm text-blue-500 text-right mb-5">
                <Link to="/">Forgot Password?</Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <ClipLoader size={20} color={"#fff"} />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Google Login Button */}
            <div className="mt-6 text-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                useOneTap
                className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                <FaGoogle className="mr-3 text-xl" />
                Login with Google
              </GoogleLogin>
            </div>
          </div>

          {/* Right Column: About & Features (Visible only on larger screens) */}
          <div className="w-full sm:w-1/2 px-4 mt-8 sm:mt-0 sm:block">
            <div className="text-gray-700">
              {/* About Section */}
              <h3 className="text-xl font-semibold text-blue-600 mb-4">About JNGR HRMS</h3>
              <p className="text-sm mb-6">
                Say goodbye to cluttered spreadsheets. From attendance to timesheets and performance, run HR on the cloud. Get more done with a simple user interface, effortless automation, and efficient processing.
              </p>

              {/* Key Features Section */}
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Core HR: Attendance, Leaves & Timesheets</li>
                <li>Manage Employee & Maintain Employee Life Cycle</li>
                <li>Salary Management</li>
                <li>Mail Templates & Variables</li>
                <li>Employee Document Management</li>
                <li>Auditing and Inventory Management</li>
                <li>Team Management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
