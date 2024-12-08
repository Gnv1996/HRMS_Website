import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import '../../App.css';

const LeaveApply = () => {
  const [range, setRange] = useState({ from: null, to: null });
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [approval, setApproval] = useState(true);

  // Dummy data for leave allocation
  const leaveData = {
    allocated: 5, 
    used: 2,
  };
  leaveData.remaining = leaveData.allocated - leaveData.used;

  const pieData = [
    { name: 'Allocated Leaves', value: leaveData.allocated, color: '#2563EB' },
    { name: 'Used Leaves', value: leaveData.used, color: '#F87171' },
    { name: 'Remaining Leaves', value: leaveData.remaining, color: '#34D399' },
  ];

  const leaveDuration = range.from && range.to
    ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const handleSubmit = () => {
    if (!range.from || !range.to || !leaveType || !reason) {
      toast.error('Please fill all fields before submitting!');
      return;
    }

    const newLeave = {
      type: leaveType,
      reason,
      from: range.from.toLocaleDateString(),
      to: range.to.toLocaleDateString(),
      duration: leaveDuration,
      status: approval,
    };

    setLeaveHistory((prev) => [...prev, newLeave]);
    toast.success('Leave application submitted successfully!');
    // Reset form
    setRange({ from: null, to: null });
    setReason('');
    setLeaveType('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
      <ToastContainer />
      
      {/* Leave Summary Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
        <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            <span className="font-bold text-blue-700">Allocated:</span> {leaveData.allocated} days
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-red-500">Used:</span> {leaveData.used} days
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-green-500">Remaining:</span> {leaveData.remaining} days
          </p>
        </div>
      </div>

      {/* Calendar and Leave Form Section */}
      <div className="md:max-w-6xl md:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg mt-8">
        {/* Left - Calendar */}
        <div className="overflow-hidden">
          <h3 className="font-bold text-xl text-gray-800 mb-4">Select Leave Dates</h3>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            className="w-full rounded-lg border border-gray-300 shadow p-4"
            modifiersClassNames={{
              selected: 'bg-blue-600 text-white rounded-full',
              range_start: 'bg-blue-700 text-white rounded-full',
              range_end: 'bg-blue-700 text-white rounded-full',
              range_middle: 'bg-blue-100 rounded-full',
            }}
          />
          <div className="text-center mt-4 text-gray-600">
            <p>
              Start Date: {range.from ? range.from.toLocaleDateString() : 'Not Selected'}
            </p>
            <p>
              End Date: {range.to ? range.to.toLocaleDateString() : 'Not Selected'}
            </p>
            <p className="font-bold">
              Total Leave Days: {leaveDuration > 0 ? leaveDuration : '0'}
            </p>
          </div>
        </div>

        {/* Right - Leave Form */}
        <div>
          <h3 className="font-semibold mb-4 mt-10 md:mt-0 text-xl text-gray-800">Leave Details</h3>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Leave Type</option>
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="halfDay">Half Day</option>
              <option value="rh">RH (Restricted Holiday)</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">Reason for Leave</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for leave"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Submit Leave Application
          </button>
        </div>
      </div>

      {/* Leave History Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
        <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Application History</h3>
        {leaveHistory.length > 0 ? (
          <ul className="space-y-4">
            {leaveHistory.map((leave, index) => (
              <li
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <p>
                  <span className="font-bold">Leave Type:</span> {leave.type}
                </p>
                <p>
                  <span className="font-bold">From:</span> {leave.from}
                </p>
                <p>
                  <span className="font-bold">To:</span> {leave.to}
                </p>
                <p>
                  <span className="font-bold">Reason:</span> {leave.reason}
                </p>
                <p>
                  <span className="font-bold">Duration:</span> {leave.duration} days
                </p>
                <p>
                  <span className="font-bold">Status:</span> {leave.status ? 'Approved' : 'Pending'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No leave applications yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveApply;





///connect with Network



// import React, { useState, useEffect } from 'react';
// import { DayPicker } from 'react-day-picker';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios'; // Import axios for API calls
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-day-picker/dist/style.css';
// import '../../App.css';

// const LeaveApply = () => {
//   const [range, setRange] = useState({ from: null, to: null });
//   const [reason, setReason] = useState('');
//   const [leaveType, setLeaveType] = useState('');
//   const [leaveHistory, setLeaveHistory] = useState([]);
//   const [approval, setApproval] = useState(true);
//   const [leaveData, setLeaveData] = useState({
//     allocated: 0,
//     used: 0,
//     remaining: 0,
//   });

//   // Fetch leave data (allocated and used leave) and leave history from API
//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/leave-data');
//         setLeaveData(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch leave data.');
//       }
//     };

//     const fetchLeaveHistory = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/leave-history');
//         setLeaveHistory(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch leave history.');
//       }
//     };

//     fetchLeaveData();
//     fetchLeaveHistory();
//   }, []);

//   const pieData = [
//     { name: 'Allocated Leaves', value: leaveData.allocated, color: '#2563EB' },
//     { name: 'Used Leaves', value: leaveData.used, color: '#F87171' },
//     { name: 'Remaining Leaves', value: leaveData.remaining, color: '#34D399' },
//   ];

//   const leaveDuration = range.from && range.to
//     ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
//     : 0;

//   // Handle submit leave application
//   const handleSubmit = async () => {
//     if (!range.from || !range.to || !leaveType || !reason) {
//       toast.error('Please fill all fields before submitting!');
//       return;
//     }

//     const newLeave = {
//       type: leaveType,
//       reason,
//       from: range.from.toLocaleDateString(),
//       to: range.to.toLocaleDateString(),
//       duration: leaveDuration,
//       status: approval,
//     };

//     try {
//       await axios.post('https://api.example.com/submit-leave', newLeave);
//       setLeaveHistory((prev) => [...prev, newLeave]);
//       toast.success('Leave application submitted successfully!');
//       // Reset form
//       setRange({ from: null, to: null });
//       setReason('');
//       setLeaveType('');
//     } catch (error) {
//       toast.error('Failed to submit leave application.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
//       <ToastContainer />
      
//       {/* Leave Summary Section */}
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
//         <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Summary</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={50}
//               outerRadius={100}
//               fill="#8884d8"
//               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//         <div className="text-center mt-4">
//           <p className="text-gray-600">
//             <span className="font-bold text-blue-700">Allocated:</span> {leaveData.allocated} days
//           </p>
//           <p className="text-gray-600">
//             <span className="font-bold text-red-500">Used:</span> {leaveData.used} days
//           </p>
//           <p className="text-gray-600">
//             <span className="font-bold text-green-500">Remaining:</span> {leaveData.remaining} days
//           </p>
//         </div>
//       </div>

//       {/* Calendar and Leave Form Section */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg mt-8">
//         {/* Left - Calendar */}
//         <div>
//           <h3 className="font-bold text-xl text-gray-800 mb-4">Select Leave Dates</h3>
//           <DayPicker
//             mode="range"
//             selected={range}
//             onSelect={setRange}
//             className="p-6 rounded-lg border border-gray-300 shadow"
//             modifiersClassNames={{
//               selected: 'bg-blue-600 text-white rounded-full',
//               range_start: 'bg-blue-700 text-white rounded-full',
//               range_end: 'bg-blue-700 text-white rounded-full',
//               range_middle: 'bg-blue-100 rounded-full',
//             }}
//           />
//           <div className="text-center mt-4 text-gray-600">
//             <p>
//               Start Date: {range.from ? range.from.toLocaleDateString() : 'Not Selected'}
//             </p>
//             <p>
//               End Date: {range.to ? range.to.toLocaleDateString() : 'Not Selected'}
//             </p>
//             <p className="font-bold">
//               Total Leave Days: {leaveDuration > 0 ? leaveDuration : '0'}
//             </p>
//           </div>
//         </div>

//         {/* Right - Leave Form */}
//         <div>
//           <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Details</h3>
//           <div className="mb-6">
//             <label className="block text-gray-600 font-medium mb-2">Leave Type</label>
//             <select
//               value={leaveType}
//               onChange={(e) => setLeaveType(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Leave Type</option>
//               <option value="casual">Casual Leave</option>
//               <option value="sick">Sick Leave</option>
//               <option value="halfDay">Half Day</option>
//               <option value="rh">RH (Restricted Holiday)</option>
//             </select>
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-600 font-medium mb-2">Reason for Leave</label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               rows="4"
//               className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter reason for leave"
//             />
//           </div>
//           <button
//             onClick={handleSubmit}
//             className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
//           >
//             Submit Leave Application
//           </button>
//         </div>
//       </div>

//       {/* Leave History Section */}
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
//         <h3 className="font-semibold mb-4 text-xl text-gray-800">Leave Application History</h3>
//         {leaveHistory.length > 0 ? (
//           <ul className="space-y-4">
//             {leaveHistory.map((leave, index) => (
//               <li
//                 key={index}
//                 className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
//               >
//                 <p>
//                   <span className="font-bold">Leave Type:</span> {leave.type}
//                 </p>
//                 <p>
//                   <span className="font-bold">From:</span> {leave.from}
//                 </p>
//                 <p>
//                   <span className="font-bold">To:</span> {leave.to}
//                 </p>
//                 <p>
//                   <span className="font-bold">Reason:</span> {leave.reason}
//                 </p>
//                 <p>
//                   <span className="font-bold">Duration:</span> {leave.duration} days
//                 </p>
//                 <p>
//                   <span className="font-bold">Status:</span> {leave.status ? 'Approved' : 'Pending'}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No leave applications yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LeaveApply;


