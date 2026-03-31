import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Routes>
        
        {/* Login page (no sidebar) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Main App Layout */}
        <Route
          path="/*"
          element={
            <div className="flex bg-[#F8FAFC]">
              
              {/* ✅ Fixed Sidebar (Desktop only) */}
              <div className="hidden lg:block fixed top-0 left-0 h-screen w-72 z-50">
                <Sidebar />
              </div>

              {/* ✅ Main Content */}
              <main className="flex-1 w-full lg:ml-72 h-screen overflow-y-auto">
                <div className="p-0 md:p-2 lg:p-4">
                  <div className="min-h-[calc(100vh-2rem)] rounded-none md:rounded-[2.5rem]">

                    <Routes>
                      {/* Default Redirect */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />

                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/attendance" element={<AttendanceTracker />} />
                      <Route path="/weekly-report" element={<WeeklyReport />} />
                      <Route path="/salary" element={<Salary />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/leave-apply" element={<LeaveApply />} />
                    </Routes>

                  </div>
                </div>
              </main>

            </div>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;