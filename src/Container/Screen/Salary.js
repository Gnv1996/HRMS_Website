import React from "react";

const Salary = () => {
  const salaryData = [
    { month: "January", totalSalary: 30000, deducted: 2000, paid: 28000 },
    { month: "February", totalSalary: 30000, deducted: 2500, paid: 27500 },
    { month: "March", totalSalary: 30000, deducted: 0, paid: 30000 },
    { month: "April", totalSalary: 30000, deducted: 0, paid: 30000 },
    { month: "May", totalSalary: 30000, deducted: 0, paid: 30000 },
    { month: "June", totalSalary: 30000, deducted: 0, paid: 30000 },
    { month: "July", totalSalary: 30000, deducted: 190, paid: 28100 },
    { month: "August", totalSalary: 30000, deducted: 0, paid: 27900 },
    { month: "September", totalSalary: 30000, deducted: 0, paid: 28000 },
    { month: "October", totalSalary: 30000, deducted: 0, paid: 28200 },
    { month: "November", totalSalary: 30000, deducted: 0, paid: 27500 },
    { month: "December", totalSalary: "---", deducted: "---", paid: "---" },
  ];

  const basicPay = 30000;
  const hra = 5000;
  const pf = 2000;
  const deducted = 2000;
  const holdingAmount = 1500;
  const netSalary = basicPay + hra - pf - deducted - holdingAmount;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
        Salary Overview
      </h1>

      {/* Salary Breakdown Summary */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-8">
        <h3 className="font-semibold mb-4 text-lg md:text-xl text-gray-800">
          Salary Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm md:text-base text-gray-600 border-separate border-spacing-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 md:px-6 py-2 text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-2 md:px-6 py-2 text-left font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 md:px-6 py-2 font-medium">Basic Pay</td>
                <td className="px-2 md:px-6 py-2 font-medium text-blue-600">
                  ₹{basicPay}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-2 md:px-6 py-2 font-medium">
                  HRA (House Rent Allowance)
                </td>
                <td className="px-2 md:px-6 py-2 font-medium text-blue-600">
                  ₹{hra}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-2 md:px-6 py-2 font-medium">
                  PF (Provident Fund)
                </td>
                <td className="px-2 md:px-6 py-2 font-medium text-blue-600">
                  ₹{pf}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-2 md:px-6 py-2 font-medium">Money Deducted</td>
                <td className="px-2 md:px-6 py-2 font-medium text-blue-600">
                  ₹{deducted}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-2 md:px-6 py-2 font-medium">Holding Amount</td>
                <td className="px-2 md:px-6 py-2 font-medium text-blue-600">
                  ₹{holdingAmount}
                </td>
              </tr>
              <tr className="border-b bg-green-50">
                <td className="px-2 md:px-6 py-2 font-medium">Net Salary</td>
                <td className="px-2 md:px-6 py-2 font-medium text-green-600">
                  ₹{netSalary}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Salary Breakdown Table */}
      <div className="overflow-x-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold mb-4 text-lg md:text-xl text-gray-800">
          Monthly Salary Breakdown for 2024
        </h3>
        <table className="min-w-full table-auto text-sm md:text-base text-gray-600 border-separate border-spacing-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 md:px-4 py-2 text-left font-semibold text-gray-700">
                Month
              </th>
              <th className="px-2 md:px-4 py-2 text-left font-semibold text-gray-700">
                Total Salary
              </th>
              <th className="px-2 md:px-4 py-2 text-left font-semibold text-gray-700">
                Deducted Money
              </th>
              <th className="px-2 md:px-4 py-2 text-left font-semibold text-gray-700">
                Paid Money
              </th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition ease-in-out duration-300"
              >
                <td className="px-2 md:px-4 py-2 font-medium">{salary.month}</td>
                <td className="px-2 md:px-4 py-2 font-medium">
                  ₹{salary.totalSalary}
                </td>
                <td className="px-2 md:px-4 py-2 font-medium">
                  ₹{salary.deducted}
                </td>
                <td className="px-2 md:px-4 py-2 font-medium">
                  ₹{salary.paid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;
