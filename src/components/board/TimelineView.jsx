import { useMemo, useState } from "react";
import { differenceInCalendarDays, format, parseISO, addDays } from "date-fns";
import TaskDetailModal from "./TaskDetailModal";

const statusColor = { "To Do": "bg-gray-300", "In Progress": "bg-sky-400", "In Review": "bg-orange-400", Done: "bg-emerald-400" };

export default function TimelineView({ tasks }) {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const dated = tasks.filter((t) => t.dueDate);

  const { start, days } = useMemo(() => {
    if (!dated.length) return { start: new Date(), days: 14 };
    const dates = dated.map((t) => parseISO(t.dueDate));
    const min = new Date(Math.min(...dates) - 3 * 86400000);
    const max = new Date(Math.max(...dates) + 3 * 86400000);
    return { start: min, days: Math.max(differenceInCalendarDays(max, min), 14) };
  }, [dated]);

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="p-4 lg:p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-x-auto">
        <div style={{ minWidth: Math.max(days * 34, 700) }}>
          <div className="flex border-b border-gray-100 px-4 py-2 sticky top-0 bg-white z-10">
            {Array.from({ length: days }).map((_, i) => {
              const d = addDays(start, i);
              return (
                <div key={i} style={{ width: 34 }} className="text-center text-[10px] text-gray-400 shrink-0">
                  {format(d, "d")}
                  <div className="text-[9px] text-gray-300">{format(d, "EEEEE")}</div>
                </div>
              );
            })}
          </div>
          <div className="py-3">
            {dated.map((t) => {
              const offset = differenceInCalendarDays(parseISO(t.dueDate), start);
              return (
                <div key={t.id} className="flex items-center px-4 py-2 group">
                  <button
                    onClick={() => setActiveTaskId(t.id)}
                    style={{ marginLeft: Math.max(offset, 0) * 34 }}
                  >
                    <div
                      className={`h-7 min-w-[120px] rounded-lg ${statusColor[t.status]} bg-opacity-80 text-white text-xs font-medium px-3 flex items-center shadow-card hover:opacity-90 transition-opacity`}
                      title={t.title}
                    >
                      <span className="truncate max-w-[160px]">{t.title}</span>
                    </div>
                  </button>
                </div>
              );
            })}
            {dated.length === 0 && <p className="px-4 py-6 text-sm text-gray-400">No dated tasks to show on the timeline yet.</p>}
          </div>
        </div>
      </div>

      {activeTask && <TaskDetailModal task={activeTask} onClose={() => setActiveTaskId(null)} />}
    </div>
  );
}
