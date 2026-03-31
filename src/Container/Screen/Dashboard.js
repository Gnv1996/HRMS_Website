import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MessageSquareOff, 
  CalendarCheck, 
  UserCheck, 
  SmartphoneNfc, 
  Activity,
  LayoutDashboard,
  Users,
  Briefcase,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const rules = [
    { icon: <Clock size={20} />, text: "Punctuality & Working Hours", desc: "Adhere strictly to assigned shifts." },
    { icon: <MessageSquareOff size={20} />, text: "Prior Notice Penalties", desc: "Unannounced absences are subject to review." },
    { icon: <UserCheck size={20} />, text: "Professional Conduct", desc: "Maintain code of conduct at all times." },
    { icon: <CalendarCheck size={20} />, text: "Leave Requests", desc: "Apply at least 24 hours in advance." },
    { icon: <ShieldCheck size={20} />, text: "Confidentiality", desc: "Respect all work-related privacy matters." },
    { icon: <SmartphoneNfc size={20} />, text: "Mobile Etiquette", desc: "Phones must remain on silent during hours." },
    { icon: <Activity size={20} />, text: "Safety & Hygiene", desc: "Follow workplace health standards." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* SIDEBAR PLACEHOLDER */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">H</div>
          <span className="text-xl font-black text-slate-900 tracking-tight">HRMS.io</span>
        </div>
        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active />
          <NavItem icon={<Users size={18}/>} label="Employees" />
          <NavItem icon={<Briefcase size={18}/>} label="Payroll" />
          <NavItem icon={<Bell size={18}/>} label="Notifications" />
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-10 lg:p-12 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Global HQ Overview • Oct 2023</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
             </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 w-full md:w-2/3">
            <h2 className="text-4xl font-bold mb-4">Welcome back, Administrator 👋</h2>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed mb-6">
              Your organization is performing at <span className="text-green-300 font-bold">94% efficiency</span> today. 
              You have 3 pending leave approvals and 2 upcoming anniversaries.
            </p>
            <button className="bg-white text-indigo-700 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-all active:scale-95">
              Refersh Stats
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total Employees" count="1,284" trend="+12" color="bg-blue-50 text-blue-600" />
          <StatCard label="On Leave Today" count="14" trend="-2" color="bg-orange-50 text-orange-600" />
          <StatCard label="Security Clearances" count="100%" trend="Stable" color="bg-emerald-50 text-emerald-600" />
        </div>

        {/* RULES & REGULATIONS SECTION */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Compliance & Governance</h3>
              <p className="text-slate-500 font-medium">Standard operating procedures for all staff</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map((rule, idx) => (
              <div 
                key={idx} 
                className="group p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  {rule.icon}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{rule.text}</h4>
                <p className="text-sm text-slate-500 font-medium">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    <span className="font-bold text-sm tracking-wide">{label}</span>
  </div>
);

const StatCard = ({ label, count, trend, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-3xl font-black text-slate-900">{count}</h4>
      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${color}`}>
        {trend}
      </span>
    </div>
  </div>
);

export default Dashboard;