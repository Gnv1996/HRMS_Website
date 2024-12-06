import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Container/Navigation/SideBar";

// Import your pages
import Dashboard from "./Container/Screen/Dashboard";
import Profile from "./Container/Screen/Profile";
// import Attendance from "./Container/Screen/Attaindance";
import AttendanceTracker from "./Container/Screen/Attaindance";
import WeeklyReport from "./Container/Screen/WeeklyReport";
import Salary from "./Container/Screen/Salary";
import Documents from "./Container/Screen/Documents";
import LeaveApply from "./Container/Screen/LeaveApply";
import LoginPage from "./Container/Screen/LoginPage";

const App = () => {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1  md:ml-64  md:px-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/weekly-report" element={<WeeklyReport />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/leave-apply" element={<LeaveApply />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
