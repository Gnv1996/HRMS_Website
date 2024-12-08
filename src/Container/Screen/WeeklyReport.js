import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';

const WeeklyReport = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [image, setImage] = useState(null);
  const [submittedData, setSubmittedData] = useState([]); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !leaveType || !entryTime || !endTime || !reason) {
      toast.error('All fields are required!');
      return;
    }

    // Create a new report with dummy data
    const newReport = {
      leaveType,
      entryTime,
      endTime,
      reason,
      image,
      date: selectedDate.toLocaleDateString(),
      status: 'Wait for approval',
    };

    // Add the new report to the list
    setSubmittedData((prevData) => [...prevData, newReport]);
    toast.success('Report submitted successfully!');

    // Reset form fields and close modal
    setModalOpen(false);
    setEntryTime('');
    setEndTime('');
    setReason('');
    setLeaveType('');
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Weekly Report</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">Select Date</h3>
          <DayPicker
  selected={selectedDate}
  onDayClick={handleDateChange}
  className="border p-4 rounded-xl shadow-sm"
  dayClassName={(date) =>
    date.toDateString() === selectedDate?.toDateString()
      ? 'bg-blue-500 text-white rounded-full' // Apply styles to selected date
      : 'hover:bg-blue-100' // Apply hover effect for other dates
  }
/>

          <p className="mt-4 text-gray-600">
            <strong>Selected Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
          </p>
        </div>

        {/* Weekly Report Options */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">Submit Weekly Report</h3>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Leave Type</option>
              <option value="wfh">Work From Home (WFH)</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Weekly Report
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Leave Details</h2>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Entry Time</label>
              <input
                type="time"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {image && <img src={image} alt="Uploaded" className="mt-4 w-full h-48 object-cover rounded-lg shadow-md" />}
            </div>
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

      {/* Submitted Data */}
      <div className="mt-8 max-w-6xl mx-auto">
        {submittedData.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Submitted Reports</h3>
            <ul>
              {submittedData.map((data, index) => (
                <li key={index} className="mb-4 p-4 border rounded-lg shadow">
                  <p><strong>Leave Type:</strong> {data.leaveType}</p>
                  <p><strong>Date:</strong> {data.date}</p>
                  <p><strong>Entry Time:</strong> {data.entryTime}</p>
                  <p><strong>End Time:</strong> {data.endTime}</p>
                  <p><strong>Reason:</strong> {data.reason}</p>
                  <p><strong>Status:</strong> {data.status}</p>
                  {data.image && <img src={data.image} alt="Uploaded" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-600">No reports submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;



/// Connect with Network 



// import React, { useState } from 'react';
// import { DayPicker } from 'react-day-picker';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-day-picker/dist/style.css';
// import 'react-toastify/dist/ReactToastify.css';


// const WeeklyReport = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [leaveType, setLeaveType] = useState('');
//   const [entryTime, setEntryTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [reason, setReason] = useState('');
//   const [image, setImage] = useState(null);
//   const [submittedData, setSubmittedData] = useState([]); // Dummy data stored here

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedDate || !leaveType || !entryTime || !endTime || !reason) {
//       toast.error('All fields are required!');
//       return;
//     }

//     // Create the report data
//     const newReport = {
//       leaveType,
//       entryTime,
//       endTime,
//       reason,
//       image,
//       date: selectedDate.toLocaleDateString(),
//       status: 'Wait for approval',
//     };

//     // Call the API (example URL, replace with your actual API endpoint)
//     try {
//       const response = await fetch('https://your-api-endpoint.com/submitReport', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newReport),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         toast.success('Report submitted successfully!');
        
//         // Add the new report to the list
//         setSubmittedData((prevData) => [...prevData, result]);

//         // Reset form fields and close modal
//         setModalOpen(false);
//         setEntryTime('');
//         setEndTime('');
//         setReason('');
//         setLeaveType('');
//         setImage(null);
//       } else {
//         toast.error('Failed to submit report!');
//       }
//     } catch (error) {
//       toast.error('Error submitting report: ' + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 p-6">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Weekly Report</h1>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Calendar Section */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="font-semibold text-xl text-gray-800 mb-4">Select Date</h3>
//           <DayPicker
//             selected={selectedDate}
//             onDayClick={handleDateChange}
//             className="border p-4 rounded-xl shadow-sm"
//             dayClassName={(date) =>
//               date.toDateString() === selectedDate?.toDateString()
//                 ? 'bg-blue-500 text-white rounded-full' // Apply styles to selected date
//                 : 'hover:bg-blue-100' // Apply hover effect for other dates
//             }
//           />
//           <p className="mt-4 text-gray-600">
//             <strong>Selected Date:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
//           </p>
//         </div>

//         {/* Weekly Report Options */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="font-semibold text-xl text-gray-800 mb-4">Submit Weekly Report</h3>
//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
//             <select
//               value={leaveType}
//               onChange={(e) => setLeaveType(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Leave Type</option>
//               <option value="wfh">Work From Home (WFH)</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Comment input below Leave Type */}
//           <div className="mb-4">
//             <label className="block text-gray-600 font-medium mb-2">Comment</label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               rows="4"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your comments here"
//             />
//           </div>

//           <button
//             onClick={() => setModalOpen(true)}
//             className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Add Weekly Report
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Leave Details</h2>
//             <div className="mb-4">
//               <label className="block text-gray-600 font-medium mb-2">Entry Time</label>
//               <input
//                 type="time"
//                 value={entryTime}
//                 onChange={(e) => setEntryTime(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 font-medium mb-2">End Time</label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 font-medium mb-2">Reason</label>
//               <textarea
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 rows="4"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter reason for leave"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600 font-medium mb-2">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               {image && <img src={image} alt="Uploaded" className="mt-4 w-full h-48 object-cover rounded-lg shadow-md" />}
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={handleSubmit}
//                 className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Submitted Data */}
//       <div className="mt-8 max-w-6xl mx-auto">
//         {submittedData.length > 0 ? (
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="font-semibold text-xl text-gray-800 mb-4">Submitted Reports</h3>
//             <ul>
//               {submittedData.map((data, index) => (
//                 <li key={index} className="mb-4 p-4 border rounded-lg shadow">
//                   <p><strong>Leave Type:</strong> {data.leaveType}</p>
//                   <p><strong>Date:</strong> {data.date}</p>
//                   <p><strong>Entry Time:</strong> {data.entryTime}</p>
//                   <p><strong>End Time:</strong> {data.endTime}</p>
//                   <p><strong>Reason:</strong> {data.reason}</p>
//                   <p><strong>Status:</strong> {data.status}</p>
//                   {data.image && <img src={data.image} alt="Uploaded" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No reports submitted yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeeklyReport;

