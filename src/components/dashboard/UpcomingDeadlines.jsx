import { format, parseISO } from "date-fns";
import { PriorityBadge } from "../common/Badge";
import { CalendarClock } from "lucide-react";

export default function UpcomingDeadlines({ tasks }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
        <button className="text-xs font-medium text-brand-600 hover:underline">View all</button>
      </div>
      <div className="space-y-3.5">
        {tasks.slice(0, 4).map((t) => (
          <div key={t.id} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <CalendarClock size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{t.title}</p>
              <p className="text-xs text-gray-400">{format(parseISO(t.dueDate), "MMM d, yyyy")}</p>
            </div>
            <PriorityBadge priority={t.priority} />
          </div>
        ))}
        {tasks.length === 0 && <p className="text-sm text-gray-400">Nothing due soon 🎉</p>}
      </div>
    </div>
  );
}
