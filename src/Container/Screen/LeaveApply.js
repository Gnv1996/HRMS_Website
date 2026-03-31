import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { 
  Calendar as CalendarIcon, 
  Info, 
  MessageSquare, 
  Send, 
  ArrowRight,
  Clock3,
  ChevronLeft
} from 'lucide-react';
import 'react-day-picker/dist/style.css'; 

const LeaveApply = () => {
  const [range, setRange] = useState({ from: null, to: null });
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState('');

  // Calculate Difference in Days
  const calculateDays = () => {
    if (range?.from && range?.to) {
      const diffTime = Math.abs(range.to - range.from);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return range?.from ? 1 : 0;
  };

  const totalDays = calculateDays();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Request Time Off</h1>
            <p className="text-slate-500 font-medium mt-1">Submit your leave application for manager approval</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Clock3 size={20} />
             </div>
             <div className="pr-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Available Balance</p>
                <p className="text-lg font-bold text-slate-900">14 Days</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: CALENDAR SELECTION */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CalendarIcon size={18} className="text-indigo-600" />
                Select Range
              </h3>
              <div className="flex justify-center leave-calendar">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  className="m-0 border-none"
                  showOutsideDays
                />
              </div>
            </div>

            {/* LIVE SUMMARY CARD */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-70">Request Summary</h4>
               <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold opacity-60">From</p>
                    <p className="text-xl font-black">{range?.from ? range.from.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '--'}</p>
                  </div>
                  <ArrowRight className="opacity-40" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold opacity-60">To</p>
                    <p className="text-xl font-black">{range?.to ? range.to.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '--'}</p>
                  </div>
               </div>
               <div className="pt-6 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <span className="text-4xl font-black">{totalDays}</span>
                    <span className="ml-2 font-bold opacity-80">{totalDays === 1 ? 'Day' : 'Days'}</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Calculated</div>
               </div>
            </div>
          </div>

          {/* RIGHT: FORM DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="mb-10">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Leave Specification</h3>
                 <p className="text-slate-500 font-medium">Please provide accurate details for HR processing</p>
              </div>

              <div className="space-y-6">
                {/* Leave Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <Info size={14} className="text-indigo-500" /> Category of Absence
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Casual Leave', 'Sick Leave', 'Half Day', 'Holiday (RH)'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setLeaveType(type)}
                        className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all border ${
                          leaveType === type 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-indigo-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reason Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                    <MessageSquare size={14} className="text-indigo-500" /> Explanation / Reason
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows="5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-5 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
                    placeholder="Briefly state why you're taking this leave..."
                  />
                </div>

                {/* Additional Metadata */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                    <Info size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">Submission Policy</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                      By submitting, you agree that your work handovers are completed. Leave approvals typically take 24-48 business hours.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  disabled={!range?.from || !leaveType || !reason}
                  className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 group"
                >
                  Confirm & Submit Application
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CUSTOM CALENDAR STYLING */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leave-calendar .rdp { --rdp-accent-color: #4f46e5; --rdp-background-color: #eef2ff; margin: 0; }
        .leave-calendar .rdp-day_selected { background-color: #4f46e5 !important; color: white !important; font-weight: 900; border-radius: 12px; }
        .leave-calendar .rdp-day_range_middle { background-color: #eef2ff !important; color: #4f46e5 !important; }
        .leave-calendar .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f1f5f9; border-radius: 12px; }
        .leave-calendar .rdp-head_cell { text-transform: uppercase; font-size: 10px; font-weight: 900; color: #94a3b8; padding-bottom: 20px; }
      `}} />
    </div>
  );
};

export default LeaveApply;