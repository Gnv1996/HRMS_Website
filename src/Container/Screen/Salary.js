import React from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  Info, 
  ShieldCheck,
  Building2,
  ReceiptIndianRupee
} from "lucide-react";

const Salary = () => {
  const salaryData = [
    { month: "January", total: 30000, deducted: 2000, paid: 28000, status: "Paid" },
    { month: "February", total: 30000, deducted: 2500, paid: 27500, status: "Paid" },
    { month: "March", total: 30000, deducted: 0, paid: 30000, status: "Paid" },
    { month: "April", total: 30000, deducted: 0, paid: 30000, status: "Paid" },
    { month: "May", total: 30000, deducted: 0, paid: 30000, status: "Paid" },
    { month: "June", total: 30000, deducted: 0, paid: 30000, status: "Paid" },
    { month: "July", total: 30000, deducted: 190, paid: 28100, status: "Paid" },
    { month: "August", total: 30000, deducted: 0, paid: 27900, status: "Paid" },
    { month: "September", total: 30000, deducted: 0, paid: 28000, status: "Paid" },
    { month: "October", total: 30000, deducted: 0, paid: 28200, status: "Paid" },
    { month: "November", total: 30000, deducted: 0, paid: 27500, status: "Paid" },
    { month: "December", total: null, deducted: null, paid: null, status: "Scheduled" },
  ];

  const basicPay = 30000;
  const hra = 5000;
  const pf = 2000;
  const deducted = 2000;
  const holdingAmount = 1500;
  const netSalary = basicPay + hra - pf - deducted - holdingAmount;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-10 font-sans selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll & Earnings</h1>
            <p className="text-slate-500 font-medium mt-1">Financial Year: 2024-25 • Employee ID: #PH-305</p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95">
            <Download size={18} />
            Download YTD Statement
          </button>
        </div>

        {/* QUICK STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="In-Hand Net Salary" 
            amount={netSalary} 
            icon={<Wallet className="text-emerald-600" />} 
            color="bg-emerald-50" 
            trend="Settled Monthly"
          />
          <StatCard 
            label="Total Deductions" 
            amount={pf + deducted + holdingAmount} 
            icon={<ArrowDownRight className="text-rose-600" />} 
            color="bg-rose-50" 
            trend="Inc. PF & Holding"
          />
          <StatCard 
            label="Base CTC Package" 
            amount={basicPay + hra} 
            icon={<Building2 className="text-indigo-600" />} 
            color="bg-indigo-50" 
            trend="Yearly: ₹4.2L"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* BREAKDOWN SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ReceiptIndianRupee size={22} className="text-indigo-600" />
                Salary Structure
              </h3>
              
              <div className="space-y-4">
                <BreakdownItem label="Basic Pay" amount={basicPay} icon={<Info size={14}/>} />
                <BreakdownItem label="House Rent (HRA)" amount={hra} />
                <div className="h-px bg-slate-100 my-2" />
                <BreakdownItem label="Provident Fund (PF)" amount={-pf} isDeduction />
                <BreakdownItem label="Direct Deductions" amount={-deducted} isDeduction />
                <BreakdownItem label="Holding Security" amount={-holdingAmount} isDeduction />
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                <div className="flex justify-between items-center text-emerald-600">
                    <span className="font-bold">Take Home Pay</span>
                    <span className="text-2xl font-black">₹{netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
               <ShieldCheck className="text-indigo-400 mb-4" size={32} />
               <h4 className="text-lg font-bold">Tax Compliance</h4>
               <p className="text-slate-400 text-sm mt-1 leading-relaxed">Your professional tax and PF contributions are automatically calculated as per Govt. norms.</p>
            </div>
          </div>

          {/* MONTHLY HISTORY TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Transaction Ledger</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        <Calendar size={16} /> 2024 Cycle
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Month</th>
                                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Deductions</th>
                                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Net Paid</th>
                                <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {salaryData.map((salary, index) => (
                                <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <span className="font-bold text-slate-900">{salary.month}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-sm font-bold ${salary.deducted > 0 ? 'text-rose-500' : 'text-slate-300'}`}>
                                            {salary.deducted ? `-₹${salary.deducted}` : '₹0'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <span className="font-black text-slate-900">
                                            {salary.paid ? `₹${salary.paid.toLocaleString()}` : '--'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                            salary.status === 'Paid' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {salary.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// SUB-COMPONENTS
const StatCard = ({ label, amount, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-all">
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-3xl font-black text-slate-900 transition-colors group-hover:text-indigo-600">
        ₹{amount.toLocaleString()}
      </h2>
      <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-1">
        <ArrowUpRight size={12} className="text-emerald-500" /> {trend}
      </p>
    </div>
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
      {icon}
    </div>
  </div>
);

const BreakdownItem = ({ label, amount, isDeduction = false, icon }) => (
  <div className="flex justify-between items-center group">
    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
        {label} {icon}
    </div>
    <span className={`font-black ${isDeduction ? 'text-rose-500' : 'text-slate-900'}`}>
        {isDeduction ? '-' : ''}₹{Math.abs(amount).toLocaleString()}
    </span>
  </div>
);

export default Salary;