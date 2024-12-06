import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import '../../App.css'; // Ensure this is properly imported if needed

const LeaveApply = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('');

  // Custom day rendering for blue background
  const modifiers = {
    selected: [startDate, endDate], // Highlight both start and end dates
  };

  const handleDateChange = (date, isStart) => {
    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r p-6 from-blue-50 via-blue-100 to-blue-200 rounded-lg ">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center mt-6 mb-8 py-4">Apply for Leave</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Date Pickers */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300">
          <h3 className="font-semibold mb-4 text-xl text-gray-800">Select Leave Dates</h3>

          {/* Start Date Picker */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Start Date</label>
            <DayPicker
              selected={startDate}
              onDayClick={(date) => handleDateChange(date, true)}
              modifiers={modifiers}
              className="text-center  rounded-xl border p-4 border-gray-300 shadow-sm transition hover:shadow-md"
              dayClassName={(date) =>
                date === startDate || date === endDate
                  ? 'bg-blue-500 text-white rounded-full' // Apply blue background for selected dates
                  : ''
              }
            />
          </div>

          {/* End Date Picker */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">End Date</label>
            <DayPicker
              selected={endDate}
              onDayClick={(date) => handleDateChange(date, false)}
              modifiers={modifiers}
              className="text-center p-4 rounded-xl border border-gray-300 shadow-sm transition hover:shadow-md"
              dayClassName={(date) =>
                date === startDate || date === endDate
                  ? 'bg-blue-500 text-white rounded-full' // Apply blue background for selected dates
                  : ''
              }
            />
          </div>
        </div>

        {/* Right Side - Leave Application Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition transform hover:scale-105 duration-300">
          <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Details</h3>

          {/* Display selected leave dates (only day numbers) */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">No. of Day Leave apply</label>
            <input value={endDate ? endDate.getDate() : 'Not selected'} className="p-3 border rounded-lg w-full" />
          </div>

          {/* Leave Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            >
              <option value="">Select Leave Type</option>
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="halfDay">Half Day</option>
              <option value="rh">RH (Restricted Holiday)</option>
            </select>
          </div>

          {/* Reason input field */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Reason for Leave</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
              placeholder="Enter reason for leave"
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Submit Leave Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApply;
