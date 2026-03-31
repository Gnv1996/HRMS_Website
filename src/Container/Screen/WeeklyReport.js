import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  Image as ImageIcon, 
  Send, 
  X, 
  AlertCircle,
  Plus
} from 'lucide-react';
import 'react-day-picker/dist/style.css'; // Ensure styles are imported

const WeeklyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [image, setImage] = useState(null);
  const [submittedData, setSubmittedData] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const newData = {
      leaveType,
      entryTime,
      endTime,
      reason,
      image,
      date: selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not selected',
      status: 'Wait for approval',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSubmittedData([newData, ...submittedData]);
    setModalOpen(false);
    setEntryTime('');
    setEndTime('');
    setReason('');
    setLeaveType('');
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Weekly Performance</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <CalendarIcon size={16} /> Reporting Period: March 21 - March 31, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-widest">Efficiency</span>
            <span className="text-lg font-bold text-indigo-600">92.4%</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1: CALENDAR WIDGET */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                <CalendarIcon size={18} />
              </div>
              Schedule Picker
            </h3>
            <div className="flex justify-center calendar-custom">
               <DayPicker 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="m-0"
              />
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
            <CalendarIcon className="mb-4 opacity-40" size={32} />
            <h4 className="text-xl font-bold">Selected View</h4>
            <p className="text-indigo-100 mt-1">
               {selectedDate ? selectedDate.toDateString() : "Please pick a date"}
            </p>
          </div>
        </div>

        {/* COLUMN 2 & 3: REPORTING AREA */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16" />
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">Update Weekly Report</h3>
            <p className="text-slate-500 mb-8 font-medium">Define your activity for the selected timestamp.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-semibold text-slate-600 appearance-none"
                >
                  <option value="">Choose Type...</option>
                  <option value="wfh">🏠 Work From Home (WFH)</option>
                  <option value="other">☕ Casual / Others</option>
                </select>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                disabled={!leaveType}
                className="flex items-center justify-center gap-3 w-full py-4 bg-indigo-600 text-white rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:grayscale font-bold"
              >
                <Plus size={20} /> Record Details
              </button>
            </div>
          </div>

          {/* SUBMITTED FEED */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-900 tracking-wide uppercase px-2">Activity Timeline</h3>
            {submittedData.length === 0 ? (
              <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                 <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                 <p className="text-slate-500 font-bold">No reports logged for this week</p>
              </div>
            ) : (
                <div className="space-y-4">
                  {submittedData.map((data, index) => (
                    <div key={index} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:border-indigo-200 transition-all group">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                              {data.leaveType === 'wfh' ? '🏠' : '☕'}
                            </div>
                            <div>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{data.date}</span>
                                <h4 className="font-bold text-slate-900">{data.leaveType === 'wfh' ? 'Work From Home' : 'Other Activity'}</h4>
                            </div>
                          </div>
                          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <AlertCircle size={12} /> {data.status}
                          </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{data.reason}</p>
                        <div className="flex items-center gap-4 mt-4">
                           <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                              <Clock size={14} /> {data.entryTime} - {data.endTime}
                           </div>
                        </div>
                      </div>
                      {data.image && (
                         <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                           <img src={data.image} alt="Receipt" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* MODERN GLASS OVERLAY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900">Event Details</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Arrival</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="time" value={entryTime} onChange={(e) => setEntryTime(e.target.value)} className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 online-none outline-none font-bold text-slate-700" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Departure</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 mb-6">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Description</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="3"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-medium text-slate-700"
                  placeholder="What were you working on?"
                />
              </div>

              <div className="space-y-1.5 mb-8">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Supporting Evidence</label>
                <div className="relative group cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 group-hover:border-indigo-400 group-hover:bg-indigo-50/30 transition-all">
                    {image ? (
                        <ImageIcon size={32} className="text-indigo-500" />
                    ) : (
                        <Plus size={32} className="text-slate-300" />
                    )}
                    <span className="text-xs font-bold text-slate-500">{image ? "Image Selected" : "Upload Screenshot/Logo"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-indigo-600 shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Send size={20} /> Finalize Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM STYLE INJECTION FOR DAYPICKER */}
      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-custom .rdp { --rdp-accent-color: #4f46e5; --rdp-background-color: #eef2ff; margin: 0; }
        .calendar-custom .rdp-day_selected { font-weight: 900; background: #4f46e5 !important; border-radius: 12px; }
        .calendar-custom .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #f1f5f9; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default WeeklyReport;