import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

const WeeklyReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [submittedData, setSubmittedData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a local URL for the image
    }
  };

  const handleSubmit = () => {
    // Simulate saving the data
    const newData = {
      leaveType,
      entryTime,
      endTime,
      reason,
      image,
      date: selectedDate ? selectedDate.toLocaleDateString() : 'Not selected',
      status: 'Wait for approval',
    };
    
    // Add the new data to the list of submitted data
    setSubmittedData([...submittedData, newData]);

    // Close the modal after submitting
    setModalOpen(false);

    // Clear the form fields
    setEntryTime('');
    setEndTime('');
    setReason('');
    setLeaveType('');
    setImage(null); // Clear image after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Weekly Report</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Calendar and Selected Date */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">Select Date</h3>
          <DayPicker
  selected={selectedDate}
  onDayClick={handleDateChange}
  className="border p-4 rounded-xl shadow-sm hover:shadow-md"
  dayClassName={(date) => 
    date.toDateString() === selectedDate.toDateString() 
    ? 'bg-blue-500 text-white rounded-full' 
    : ''
  }
/>

          <p className="mt-4 text-gray-600">
            <strong>Selected Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
          </p>
        </div>

        {/* Right Side - Weekly Report Options */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">Week of December 1, 2024</h3>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
            >
              <option value="">Select Leave Type</option>
              <option value="wfh">Work From Home (WFH)</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Button to open modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Weekly Report
          </button>
        </div>
      </div>

      {/* Modal for data entry */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Leave Details</h2>

            {/* Entry Time */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Entry Time</label>
              <input
                type="time"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Time */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason for leave"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Display uploaded image */}
            {image && (
              <div className="mb-4">
                <img src={image} alt="Uploaded" className="w-full h-48 object-cover rounded-lg shadow-md" />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Submitted Data */}
      <div className="mt-8">
        {submittedData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Submitted Data</h3>
            <ul>
              {submittedData.map((data, index) => (
                <li key={index} className="mb-4">
                  <p><strong>Leave Type:</strong> {data.leaveType}</p>
                  <p><strong>Entry Time:</strong> {data.entryTime}</p>
                  <p><strong>End Time:</strong> {data.endTime}</p>
                  <p><strong>Reason:</strong> {data.reason}</p>
                  <p><strong>Date:</strong> {data.date}</p>
                  <p className="text-gray-600"><strong>Status:</strong> {data.status}</p>
                  {data.image && (
                    <div className="mt-2">
                      <img src={data.image} alt="Uploaded" className="w-48 h-48 object-cover rounded-lg shadow-md" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;
