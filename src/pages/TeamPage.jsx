import { UserPlus } from "lucide-react";
import { users } from "../data/mockData";
import { useData } from "../context/DataContext";
import { Avatar } from "../components/common/Avatar";

export default function TeamPage() {
  const { tasks, projects } = useData();

  return (
    <div className="p-4 lg:p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-400 mt-1">{users.length} members across your workspace</p>
        </div>
        <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-card">
          <UserPlus size={16} /> Invite Member
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_110px] sm:grid-cols-[1fr_140px_120px_140px] gap-3 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span>Member</span>
          <span>Status</span>
          <span>Tasks</span>
          <span>Projects</span>
        </div>
        <div className="divide-y divide-gray-50">
          {users.map((u) => {
            const assigned = tasks.filter((t) => t.assignee === u.id && t.status !== "Done").length;
            const userProjects = projects.filter((p) => p.members.includes(u.id));
            return (
              <div key={u.id} className="grid grid-cols-[1fr_120px_100px_110px] sm:grid-cols-[1fr_140px_120px_140px] gap-3 px-5 py-3.5 items-center">
                <span className="flex items-center gap-3 min-w-0">
                  <Avatar user={u} size={38} showStatus />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-800 truncate">{u.name}</span>
                    <span className="block text-xs text-gray-400 truncate">{u.role}</span>
                  </span>
                </span>
                <span className={`text-xs font-medium ${u.online ? "text-emerald-600" : "text-gray-400"}`}>
                  {u.online ? "● Online" : "○ Offline"}
                </span>
                <span className="text-sm text-gray-600">{assigned} active</span>
                <span className="flex -space-x-2">
                  {userProjects.slice(0, 4).map((p) => (
                    <span
                      key={p.id}
                      title={p.name}
                      className="w-6 h-6 rounded-full ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.name[0]}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
