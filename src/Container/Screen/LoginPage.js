import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { FaUserAlt, FaLock, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    navigate("/dashboard");
  
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {

      const payload = {userName: username, password, client: 'b2b'};
      const response = await fetch(`${BASE_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      navigate("/dashboard");
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Login Successful ✅");
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.log("Login Error:", error);
  
      if (error.response) {
        toast.error(error.response.data?.message || "Login failed");
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
        {/* Background Decorative Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl" />

        <div className="relative bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4 transform -rotate-6">
               <FaLock className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mt-2 font-medium">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-1.5">Username</label>
              <div className="relative flex items-center">
                <FaUserAlt className="absolute left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  placeholder="john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 ml-1 mb-1.5">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-1 px-1">
               <div className="flex items-center">
                  <input type="checkbox" id="remember" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer">Remember me</label>
               </div>
               <a href="/forgot" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group"
            >
              Sign In
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-4 bg-white text-sm font-bold text-gray-400 uppercase tracking-widest">Or Continue With</span>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center">
            <div className="w-full transform hover:scale-[1.01] transition-transform">
                <GoogleLogin
                onSuccess={(res) => { toast.success("Google linked!"); navigate("/dashboard"); }}
                onError={() => toast.error("Social login failed")}
                useOneTap
                theme="outline"
                size="large"
                width="100%"
                shape="pill"
                />
            </div>
          </div>

          <p className="mt-8 text-center text-gray-500 font-medium">
            Don't have an account? <a href="/signup" className="text-indigo-600 font-bold hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;