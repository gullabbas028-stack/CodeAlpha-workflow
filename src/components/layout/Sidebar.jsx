import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Calendar,
  Inbox,
  Users,
  BarChart3,
  Settings,
  Star,
  Sparkles,
  X,
} from "lucide-react";
import { useData } from "../../context/DataContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/my-tasks", label: "My Tasks", icon: ListChecks },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/inbox", label: "Inbox", icon: Inbox, badgeKey: "inbox" },
  { to: "/team", label: "Team", icon: Users },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const dotColor = { "#7A5AF8": "bg-brand-500", "#22C55E": "bg-green-500", "#F97316": "bg-orange-500", "#EF4444": "bg-red-500" };

export default function Sidebar({ open, onClose }) {
  const { projects, notifications } = useData();
  const unread = notifications.filter((n) => !n.read).length;
  const starred = projects.filter((p) => p.starred);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 bg-navy-900 text-white flex flex-col shrink-0 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center font-bold text-sm">
              W
            </div>
            <span className="font-bold text-lg tracking-tight">WorkFlow</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-navy-600 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon, badgeKey }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-600 text-white" : "text-navy-600 hover:bg-navy-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span className="flex-1">{label}</span>
              {badgeKey === "inbox" && unread > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-navy-600 mb-2">Starred Projects</p>
            <div className="space-y-1">
              {starred.map((p) => (
                <NavLink
                  key={p.id}
                  to={`/projects/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-navy-600 hover:bg-navy-800 hover:text-white transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${dotColor[p.color] || "bg-brand-500"}`} />
                  <span className="truncate">{p.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-3 shrink-0">
          <div className="rounded-xl bg-gradient-to-br from-brand-600/40 to-navy-800 border border-navy-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-brand-300" />
              <p className="font-semibold text-sm">Upgrade to Pro</p>
            </div>
            <p className="text-xs text-navy-600 mb-3 leading-relaxed">
              Unlock more features and increase your productivity.
            </p>
            <button className="w-full bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5">
              <Star size={14} fill="currentColor" /> Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
