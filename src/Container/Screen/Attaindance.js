import React, { useState } from "react";
import { FiMenu, FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';

const AttendanceTracker = () => {

  const publicHolidays = [8, 25];


  const [currentMonth, setCurrentMonth] = useState(11); // December is month 11 (0-based index)
  const [currentYear, setCurrentYear] = useState(2024);


  const [attendance, setAttendance] = useState(Array(31).fill("unmarked"));


  const dailyWorkingHours = 9;
  const totalWorkingHoursInMonth = 240; // Assuming 240 working hours for the month


  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Mark attendance as 'marked'
  const markAttendance = (index) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index] = updatedAttendance[index] === "unmarked" ? "marked" : "unmarked";
    setAttendance(updatedAttendance);
  };

  // Calculate total marked working hours
  const calculateWorkedHours = () => {
    return attendance.filter((status) => status === "marked").length * dailyWorkingHours;
  };

  // Determine color for each day's box
  const getStatusColor = (day, status) => {
    const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
    const isHoliday = publicHolidays.includes(day);
    if (isSunday || isHoliday) return "bg-yellow-300"; // Sunday or Holiday
    if (status === "marked") return "bg-green-300"; // Marked attendance
    return "bg-blue-300"; // Unmarked attendance
  };

  // Go to the next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January (0-based index)
      setCurrentYear(currentYear + 1); // Move to next year
    } else {
      setCurrentMonth(currentMonth + 1); // Move to next month
    }
    setAttendance(Array(getDaysInMonth(currentMonth + 1, currentYear)).fill("unmarked"));
  };

  // Go to the previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December (0-based index)
      setCurrentYear(currentYear - 1); // Move to previous year
    } else {
      setCurrentMonth(currentMonth - 1); // Move to previous month
    }
    setAttendance(Array(getDaysInMonth(currentMonth - 1, currentYear)).fill("unmarked"));
  };




  // Get the first day of the month to align the days
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Total Working Hours Box */}

      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <button className="p-2 lg:hidden"><FiMenu /></button>
          <h1 className="text-lg font-medium">My Attendance</h1>
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-medium">
          GK
        </div>
      </header>


  {/* Header */}
  <div className="flex justify-between  items-center mb-6 bg-[#00A3FF] text-white p-4 rounded">
  <button className="p-2">
    <FiChevronLeft className="h-6 w-6" onClick={prevMonth} />
  </button>
  <h2 className="text-xl font-medium">
    {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
  </h2>
  <button className="p-2">
    <FiChevronRight className="h-6 w-6" onClick={nextMonth} />
  </button>
</div>
     

      {/* Profile Section */}
      <div className=" grid grid-cols-1 md:grid-cols-3 mb-10 gap-4 ">
  {/* Column 1: Profile Section */}
  <div className="rounded-lg bg-white flex flex-col sm:flex-row gap-4 p-4">
    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center font-medium">
      GK
    </div>
    <div>
      <h3 className="text-lg font-medium">Gautam Vashisth</h3>
      <p className="text-gray-600">Sr. React && React-Native Developer</p>
    </div>
  </div>

  {/* Column 2: Progress Bars */}
  <div className=" bg-white rounded-lg  p-4 space-y-4">
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Completed
        </span>
        <span className="h-2 w-2 rounded-full bg-red-500"></span>
        
        <span>Pending</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-full bg-green-500 rounded" style={{ width: '15%' }}></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500"></span>
          <span>26 Hrs 32 Mins</span>
        </span>
        <span>+180 Hrs 27 Mins {totalWorkingHoursInMonth}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-full bg-red-500 rounded" style={{ width: '85%' }}></div>
      </div>
    </div>
  </div>

  {/* Column 3: Header */}
  <div className="bg-white rounded-lg  p-4 space-y-4">
  <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2">
                
                Time to be Compansate
              </span>
              <span>4.57 %</span>
            </div>
            <div className="h-2 bg-gray-200 rounded">
        <div className="h-full bg-red-500 rounded" style={{ width: '85%' }}></div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-sm">
            <span className="flex items-center gap-1"><FiClock /> 9h : 27m</span>
            <span className="text-gray-600">Total Working</span>
            <span>207 Hrs 0 Mins</span>
          </div>
            
  </div>
</div>


      {/* Legend */}
      <div className="grid grid-cols-2 mb-9 sm:grid-cols-3 md:grid-cols-5 gap-2 ">
        
        <div className="bg-gray-300 p-2 text-center rounded">
          <div className="text-2xl">23 {calculateWorkedHours}</div>
          <div className="text-xs">WORKING DAY</div>
        </div>
        <div className="bg-yellow-300 p-2 text-center rounded">
          <div className="text-2xl">8</div>
          <div className="text-xs">NON WORKING DAY</div>
        </div>
        <div className="bg-red-500 p-2 text-center rounded text-white">
          <div className="text-2xl">0</div>
          <div className="text-xs">LEAVE DAY</div>
        </div>
        <div className="bg-pink-200 p-2 text-center rounded">
          <div className="text-2xl">0</div>
          <div className="text-xs">HALF DAY</div>
        </div>
        <div className="bg-blue-600 p-2 text-center rounded text-white">
          <div className="text-2xl">*</div>
          <div className="text-xs">ALERT</div>
        </div>
      </div>

     

    


      {/* Header Row for Weekdays */}
      <div className="grid grid-cols-7 gap-4 bg-white p-4 text-center font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="uppercase text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Attendance Boxes */}
      <div className="grid grid-cols-7 gap-4">
        {/* Empty spaces before the first day of the month */}
        {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, idx) => (
          <div key={idx} className="p-4 py-8"></div>
        ))}

        {/* Attendance days */}
        {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, index) => {
          const day = index + 1;
          const status = attendance[index];
          return (
            <div
              key={day}
              className={`p-4 py-8 rounded shadow text-center cursor-pointer ${getStatusColor(
                day,
                status
              )}`}
              onClick={() => markAttendance(index)}
            >
              <p className="font-bold">{day}</p>
              <p className="text-sm">{status === "marked" ? "Marked" : ""}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTracker;

