import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Container/Navigation/SideBar";

// Import your pages
import Dashboard from "./Container/Screen/Dashboard";
import Profile from "./Container/Screen/Profile";
import AttendanceTracker from "./Container/Screen/Attaindance";
import WeeklyReport from "./Container/Screen/WeeklyReport";
import Salary from "./Container/Screen/Salary";
import Documents from "./Container/Screen/Documents";
import LeaveApply from "./Container/Screen/LeaveApply";
import LoginPage from "./Container/Screen/LoginPage";
import InventoryDetail from "./Container/Screen/InventoryDetail";

const App = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true); // State to control visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume a flag for authentication

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoginVisible(false); // Hide the login page after 2 seconds
    }, 4000);
    
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* Conditionally render login page or main app content */}
      {isLoginVisible ? (
        // Show the login page in full-screen initially
        <div className="">
          <LoginPage />
        </div>
      ) : (
        <div className="flex bg-gray-100 min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 md:ml-64 md:px-2">
          <Routes>
            {/* If user is not authenticated, redirect to login */}
            <Route path="/" element={<Dashboard /> } />
            <Route path="/profile" element={<Profile /> } />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/weekly-report" element={<WeeklyReport /> } />
            <Route path="/salary" element={<Salary /> } />
            <Route path="/documents" element={<Documents/>} />
            <Route path="/leave-apply" element={<LeaveApply /> } />
            <Route path="/inventory" element={<InventoryDetail /> } />
          </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
