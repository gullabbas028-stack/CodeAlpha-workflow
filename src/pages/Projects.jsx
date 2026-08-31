import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Star, Users as UsersIcon, MoreVertical } from "lucide-react";
import { useData } from "../context/DataContext";
import { users as allUsers } from "../data/mockData";
import { AvatarStack } from "../components/common/Avatar";
import { StatusBadge, PrivacyBadge } from "../components/common/Badge";
import NewProjectModal from "../components/board/NewProjectModal";

export default function Projects() {
  const { projects, tasks, toggleStar } = useData();
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "starred") return projects.filter((p) => p.starred);
    if (filter === "active") return projects.filter((p) => p.status === "active");
    return projects;
  }, [projects, filter]);

  const progressFor = (projectId) => {
    const projectTasks = tasks.filter((t) => t.projectId === projectId);
    if (!projectTasks.length) return 0;
    return Math.round((projectTasks.filter((t) => t.status === "Done").length / projectTasks.length) * 100);
  };

  return (
    <div className="p-4 lg:p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-400 mt-1">{projects.length} total projects</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-card"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className="flex items-center gap-2 mb-5">
        {[
          { key: "all", label: "All" },
          { key: "active", label: "Active" },
          { key: "starred", label: "Starred" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === f.key ? "bg-navy-900 text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const members = allUsers.filter((u) => p.members.includes(u.id));
          const progress = progressFor(p.id);
          return (
            <div key={p.id} className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-panel transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <Link to={`/projects/${p.id}`} className="flex items-center gap-2.5 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="font-semibold text-gray-900 truncate group-hover:text-brand-600 transition-colors">{p.name}</span>
                </Link>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleStar(p.id)} className={`p-1 rounded hover:bg-gray-100 ${p.starred ? "text-amber-400" : "text-gray-300"}`}>
                    <Star size={16} fill={p.starred ? "currentColor" : "none"} />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 text-gray-300">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-snug mb-4 line-clamp-2">{p.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <StatusBadge status={p.status} />
                <PrivacyBadge privacy={p.privacy} />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: p.color }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <AvatarStack users={members} size={26} />
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <UsersIcon size={13} /> {members.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showNew && <NewProjectModal onClose={() => setShowNew(false)} />}
    </div>
  );
}
