import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Bell, MessageSquare, ChevronDown, Menu, LogOut, User as UserIcon, Settings as SettingsIcon } from "lucide-react";
import { Avatar } from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import SearchModal from "../common/SearchModal";
import NewTaskModal from "../board/NewTaskModal";

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur border-b border-gray-100 flex items-center gap-3 px-4 lg:px-6">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-900">
          <Menu size={22} />
        </button>

        <button
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-2 flex-1 max-w-md bg-gray-50 hover:bg-gray-100 transition-colors text-gray-400 rounded-lg px-3.5 py-2.5 text-sm"
        >
          <Search size={17} />
          <span className="flex-1 text-left truncate">Search projects, tasks, users...</span>
          <kbd className="hidden sm:inline-block text-[11px] font-medium bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-400">
            Ctrl+K
          </kbd>
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={() => setShowNewTask(true)}
            className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-600 transition-colors text-white flex items-center justify-center shadow-card"
            title="Create"
          >
            <Plus size={19} />
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifs((s) => !s)}
              className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-500 flex items-center justify-center relative"
            >
              <Bell size={19} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-popover border border-gray-100 py-2 animate-popIn origin-top-right">
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="font-semibold text-sm text-gray-900">Notifications</p>
                  <button onClick={markAllNotificationsRead} className="text-xs text-brand-600 font-medium hover:underline">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full text-left px-4 py-2.5 flex items-start gap-2.5 hover:bg-gray-50 transition-colors ${
                        !n.read ? "bg-brand-50/50" : ""
                      }`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${!n.read ? "bg-brand-500" : "bg-transparent"}`} />
                      <span className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 leading-snug block">{n.message}</span>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/inbox")}
            className="w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hidden sm:flex items-center justify-center"
          >
            <MessageSquare size={19} />
          </button>

          <div className="relative" ref={userRef}>
            <button onClick={() => setShowUserMenu((s) => !s)} className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-full hover:bg-gray-100 transition-colors">
              <Avatar user={user} size={32} showStatus />
              <span className="hidden sm:block text-left">
                <span className="block text-sm font-semibold text-gray-900 leading-none">{user?.name}</span>
                <span className="block text-xs text-gray-400 leading-none mt-0.5">{user?.role}</span>
              </span>
              <ChevronDown size={15} className="hidden sm:block text-gray-400" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-popover border border-gray-100 py-1.5 animate-popIn origin-top-right">
                <button onClick={() => { navigate("/settings"); setShowUserMenu(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <UserIcon size={16} /> Profile
                </button>
                <button onClick={() => { navigate("/settings"); setShowUserMenu(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <SettingsIcon size={16} /> Settings
                </button>
                <div className="h-px bg-gray-100 my-1.5" />
                <button onClick={logout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={16} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showNewTask && <NewTaskModal onClose={() => setShowNewTask(false)} />}
    </>
  );
}
