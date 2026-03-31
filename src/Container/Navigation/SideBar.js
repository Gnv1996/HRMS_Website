import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  CalendarCheck, 
  ClipboardList, 
  Wallet, 
  Files, 
  Send, 
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const NavGroup = ({ title, children }) => (
    <div className="mb-8">
      <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
          isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <Icon size={20} className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
        <span className="font-bold text-sm tracking-wide">{label}</span>
        {isActive && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">H</div>
           <span className="font-black text-slate-900 tracking-tight">HRMS PRO</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 bg-slate-100 rounded-xl text-slate-600">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MAIN SIDEBAR */}
      <aside
  className={`fixed lg:static top-0 left-0 z-50 w-72 h-screen bg-slate-950 text-white 
  transform transition-transform duration-300 ease-in-out border-r border-white/5 
  flex flex-col p-6 ${
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  }`}
>
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 mb-12 px-2">
           <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <LogOut className="rotate-180 -mr-1" size={20} />
           </div>
           <div>
              <h2 className="text-xl font-black tracking-tighter">JNGR</h2>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Enterprise</p>
           </div>
        </div>

        {/* NAVIGATION SECTIONS */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          <NavGroup title="Main Menu">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/profile" icon={UserCircle} label="My Profile" />
          </NavGroup>

          <NavGroup title="Workplace">
            <NavItem to="/attendance" icon={CalendarCheck} label="Attendance" />
            <NavItem to="/weekly-report" icon={ClipboardList} label="Status Reports" />
            <NavItem to="/leave-apply" icon={Send} label="Leave Request" />
          </NavGroup>

          <NavGroup title="Finance">
            <NavItem to="/salary" icon={Wallet} label="Payroll History" />
            <NavItem to="/documents" icon={Files} label="Digital Vault" />
          </NavGroup>
        </nav>

        {/* USER PROFILE CARD */}
        <div className="mt-auto pt-6 border-t border-white/10">
           <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 overflow-hidden border border-white/20">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
              <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-bold truncate group-hover:text-indigo-400">Gautam Vashisth</p>
                 <p className="text-[10px] text-white/40 font-bold uppercase truncate">Sr. Software Developer</p>
              </div>
              <Link to="/login" title="Logout" className="p-2 text-white/30 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all">
                 <LogOut size={16} />
              </Link>
           </div>
        </div>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </>
  );
};

export default Sidebar;