import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FolderKanban, ListChecks, User as UserIcon, X } from "lucide-react";
import { useData } from "../../context/DataContext";
import { users } from "../../data/mockData";
import { Avatar } from "./Avatar";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const { projects, tasks } = useData();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { projects: [], tasks: [], users: [] };
    return {
      projects: projects.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 4),
      tasks: tasks.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 5),
      users: users.filter((u) => u.name.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query, projects, tasks]);

  const hasResults = results.projects.length || results.tasks.length || results.users.length;

  const goto = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-popover animate-popIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <Search size={18} className="text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, users..."
            className="flex-1 outline-none text-sm placeholder:text-gray-400"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto py-2">
          {!query && <p className="px-4 py-8 text-center text-sm text-gray-400">Start typing to search everything in your workspace.</p>}
          {query && !hasResults && <p className="px-4 py-8 text-center text-sm text-gray-400">No results for "{query}"</p>}

          {results.projects.length > 0 && (
            <div className="mb-1">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Projects</p>
              {results.projects.map((p) => (
                <button key={p.id} onClick={() => goto(`/projects/${p.id}`)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left">
                  <FolderKanban size={16} className="text-brand-500" />
                  <span className="text-sm text-gray-800">{p.name}</span>
                </button>
              ))}
            </div>
          )}

          {results.tasks.length > 0 && (
            <div className="mb-1">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Tasks</p>
              {results.tasks.map((t) => (
                <button key={t.id} onClick={() => goto(`/projects/${t.projectId}`)} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left">
                  <ListChecks size={16} className="text-amber-500" />
                  <span className="text-sm text-gray-800">{t.title}</span>
                </button>
              ))}
            </div>
          )}

          {results.users.length > 0 && (
            <div>
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">People</p>
              {results.users.map((u) => (
                <button key={u.id} onClick={() => goto("/team")} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left">
                  <Avatar user={u} size={22} />
                  <span className="text-sm text-gray-800">{u.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
