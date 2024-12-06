import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  FaHome, 
  FaUserCircle, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaCreditCard, 
  FaClipboardList, 
  FaSignInAlt ,
  FaSignOutAlt
} from 'react-icons/fa'; 


const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed z-50 inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-gradient-to-b from-blue-600 to-blue-500 text-white w-64 p-6 transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64`} style={{position:'fixed'}}>
        <h2 className="text-3xl font-bold text-center text-white mb-8">HRMS</h2>
        <nav>
          <Link 
            to="/dashboard" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaHome className="w-6 h-6 mr-3" /> Dashboard
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaUserCircle className="w-6 h-6 mr-3" /> Profile
          </Link>
          <Link 
            to="/attendance" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaCalendarAlt className="w-6 h-6 mr-3" /> Attendance
          </Link>
          <Link 
            to="/weekly-report" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaClipboardList className="w-6 h-6 mr-3" /> Weekly Report
          </Link>
          <Link 
            to="/salary" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaCreditCard className="w-6 h-6 mr-3" /> Salary
          </Link>
          <Link 
            to="/documents" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaFileAlt className="w-6 h-6 mr-3" /> Documents
          </Link>
          <Link 
            to="/leave-apply" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaSignInAlt className="w-6 h-6 mr-3" /> Leave Apply
          </Link>

          <Link 
            to="/login" 
            className="flex items-center py-3 px-4 mb-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
            onClick={closeSidebar}
          >
            <FaSignOutAlt className="w-6 h-6 mr-3" /> Logout
          </Link>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <header className="bg-blue-600 text-white p-4 lg:hidden">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>
    </>
  );
};

export default Sidebar;
