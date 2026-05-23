import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Map, 
  BookOpenCheck, 
  CalendarDays, 
  LogOut, 
  User, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginTime } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLoginDuration = () => {
    if (!loginTime) return "Just now";
    const loginDate = new Date(loginTime);
    const now = new Date();
    const diffMins = Math.floor((now - loginDate) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return diffHours < 24 ? `${diffHours}h ago` : `${Math.floor(diffHours / 24)}d ago`;
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Add Trip", path: "/add-trip", icon: PlusCircle },
    { name: "All Trips", path: "/trips", icon: Map },
    { name: "Bookings", path: "/admin-bookings", icon: BookOpenCheck },
    { name: "Calendar", path: "/admin-calendar", icon: CalendarDays },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#0f172a] text-slate-300 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        flex flex-col border-r border-slate-800 shadow-2xl
      `}>
        
        {/* Logo/Header */}
        <div className="p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Map size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">TravelAdmin</h2>
              <p className="text-[10px] uppercase tracking-[2px] text-indigo-400 font-bold">Control Panel</p>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        {user && (
          <div className="mx-4 my-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <User size={24} />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold text-white truncate">{user.name}</h3>
                <p className="text-xs text-slate-400 capitalize">{user.role}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-medium text-emerald-500/80">Active: {getLoginDuration()}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                ${isActive(item.path) 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "hover:bg-slate-800/60 hover:text-white"}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-indigo-400"} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {isActive(item.path) && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-800/50 space-y-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 font-medium text-sm"
          >
            <LogOut size={20} />
            Logout Account
          </button>
          
          <div className="px-4 py-2">
            <p className="text-[10px] text-slate-600 font-medium">© 2024 Travel Wales Admin</p>
            <p className="text-[10px] text-slate-700 mt-1">v2.0.4 Stable</p>
          </div>
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}