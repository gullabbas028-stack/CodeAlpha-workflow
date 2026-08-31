import { useMemo, useState } from "react";
import { ArrowUpDown, MessageSquare } from "lucide-react";
import { PriorityBadge, LabelBadge } from "../common/Badge";
import { Avatar } from "../common/Avatar";
import { findUser } from "../../data/mockData";
import { format, parseISO } from "date-fns";
import TaskDetailModal from "./TaskDetailModal";

const statusColors = {
  "To Do": "text-gray-500",
  "In Progress": "text-sky-600",
  "In Review": "text-orange-600",
  Done: "text-emerald-600",
};

export default function ListView({ tasks }) {
  const [sortKey, setSortKey] = useState("dueDate");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTaskId, setActiveTaskId] = useState(null);

  const filtered = useMemo(() => {
    let list = statusFilter === "all" ? tasks : tasks.filter((t) => t.status === statusFilter);
    return [...list].sort((a, b) => {
      if (sortKey === "dueDate") return new Date(a.dueDate || "2100-01-01") - new Date(b.dueDate || "2100-01-01");
      if (sortKey === "priority") {
        const order = { High: 0, Medium: 1, Low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return a.title.localeCompare(b.title);
    });
  }, [tasks, statusFilter, sortKey]);

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {["all", "To Do", "In Progress", "In Review", "Done"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === s ? "bg-navy-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {s === "all" ? "All statuses" : s}
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={() => setSortKey(sortKey === "dueDate" ? "priority" : sortKey === "priority" ? "title" : "dueDate")}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          <ArrowUpDown size={13} /> Sort: {sortKey === "dueDate" ? "Due date" : sortKey === "priority" ? "Priority" : "Title"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1fr_100px_100px_140px_100px_110px_90px] gap-3 px-4 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Due Date</span>
            <span>Label</span>
            <span>Comments</span>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((t) => {
              const assignee = findUser(t.assignee);
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTaskId(t.id)}
                  className="w-full grid grid-cols-[1fr_100px_100px_140px_100px_110px_90px] gap-3 px-4 py-3 items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800 truncate">{t.title}</span>
                  <span className={`text-xs font-semibold ${statusColors[t.status]}`}>{t.status}</span>
                  <PriorityBadge priority={t.priority} />
                  <span className="flex items-center gap-1.5 min-w-0">
                    <Avatar user={assignee} size={22} />
                    <span className="text-xs text-gray-500 truncate">{assignee?.name}</span>
                  </span>
                  <span className="text-xs text-gray-400">{t.dueDate ? format(parseISO(t.dueDate), "MMM d") : "—"}</span>
                  <LabelBadge label={t.label} />
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MessageSquare size={12} /> {t.comments}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeTask && <TaskDetailModal task={activeTask} onClose={() => setActiveTaskId(null)} />}
    </div>
  );
}
