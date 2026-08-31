import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import ListView from "../components/board/ListView";

export default function MyTasks() {
  const { user } = useAuth();
  const { tasks, projects } = useData();
  const [projectFilter, setProjectFilter] = useState("all");

  const myTasks = tasks.filter((t) => t.assignee === user.id && (projectFilter === "all" || t.projectId === projectFilter));

  return (
    <div className="animate-fadeIn">
      <div className="p-4 lg:p-6 pb-0">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-sm text-gray-400 mt-1 mb-4">{myTasks.length} task(s) assigned to you</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setProjectFilter("all")}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              projectFilter === "all" ? "bg-navy-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            All projects
          </button>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setProjectFilter(p.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                projectFilter === p.id ? "bg-navy-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <ListView tasks={myTasks} />
    </div>
  );
}
