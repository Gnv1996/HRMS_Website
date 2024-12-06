import React, { useState } from "react";

const Attendance = () => {
  // Public holidays in December 2024 (example)
  const publicHolidays = [8, 25];

  // State for current month and year
  const [currentMonth, setCurrentMonth] = useState(11); // December is month 11 (0-based index)
  const [currentYear, setCurrentYear] = useState(2024);

  // State for attendance status
  const [attendance, setAttendance] = useState(Array(31).fill("unmarked"));

  // Total working hours in a month (based on 9 hours per day)
  const dailyWorkingHours = 9;
  const totalWorkingHoursInMonth = 240; // Assuming 240 working hours for the month

  // Get the number of days in the current month
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
    if (isSunday) return "bg-yellow-300"; // Sunday is always a holiday
    if (isHoliday) return "bg-yellow-300"; // Holiday
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

  // Calculate remaining working hours
  const remainingHours = totalWorkingHoursInMonth - calculateWorkedHours();

  // Get the first day of the month to align the days
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Total Working Hours Box */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">

        <div className="flex justify-end">

        <div className="border-r-2 border-l-2 p-3 border-gray-600">
            <h1 className=" font-bold">Total Working Hours <span> : 240 hours</span></h1>
            <h3 className=" text-green-600 font-medium">Completed Hours <span> : 219 hours</span></h3>  
            <h5 className=" text-red-600">Compansate Hours <span> {remainingHours}</span></h5> 
        
        
        </div>

        </div>
  
</div>


      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">
          Attendance - {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </h2>
        <div className="flex gap-4">
          <button onClick={prevMonth} className="text-xl text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={nextMonth} className="text-xl text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Header Row for Weekdays */}
      <div className="grid grid-cols-7 gap-4 text-center font-medium mb-2">
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

export default Attendance;
