// src/Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome to HRMS</h2>
        <p className="text-gray-700">Here you can see an overview of the HRMS system.</p>
      </div>

      {/* Rules and Regulations Section */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Company Rules and Regulations</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-700">All employees must be punctual and adhere to working hours.</li>
          <li className="text-gray-700">Absence without prior notice will be subject to penalties.</li>
          <li className="text-gray-700">Employees are expected to maintain a professional code of conduct at all times.</li>
          <li className="text-gray-700">All leaves must be requested at least 24 hours in advance.</li>
          <li className="text-gray-700">Respect and confidentiality are essential in all work-related matters.</li>
          <li className="text-gray-700">Personal mobile phones should be kept on silent during work hours.</li>
          <li className="text-gray-700">Workplace safety and hygiene standards must be followed by everyone.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
