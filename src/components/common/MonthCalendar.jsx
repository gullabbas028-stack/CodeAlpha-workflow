import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PriorityBadge } from "./Badge";

const priorityDot = { High: "bg-red-500", Medium: "bg-amber-500", Low: "bg-sky-500" };

export default function MonthCalendar({ tasks, onSelectTask }) {
  const [cursor, setCursor] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor));
    const end = endOfWeek(endOfMonth(cursor));
    const arr = [];
    let d = start;
    while (d <= end) {
      arr.push(d);
      d = addDays(d, 1);
    }
    return arr;
  }, [cursor]);

  const tasksOn = (day) => tasks.filter((t) => t.dueDate && isSameDay(parseISO(t.dueDate), day));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{format(cursor, "MMMM yyyy")}</h3>
        <div className="flex items-center gap-1">
          <button onClick={() => setCursor(addDays(startOfMonth(cursor), -1))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ChevronLeft size={17} />
          </button>
          <button onClick={() => setCursor(new Date())} className="text-xs font-medium text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-100">
            Today
          </button>
          <button onClick={() => setCursor(addDays(endOfMonth(cursor), 1))} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayTasks = tasksOn(day);
          const inMonth = isSameMonth(day, cursor);
          const isToday = isSameDay(day, new Date());
          return (
            <div key={day.toISOString()} className={`min-h-[92px] border-b border-r border-gray-50 p-1.5 ${!inMonth ? "bg-gray-50/40" : ""}`}>
              <span
                className={`text-xs inline-flex items-center justify-center w-6 h-6 rounded-full ${
                  isToday ? "bg-brand-500 text-white font-semibold" : inMonth ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTask?.(t)}
                    className="w-full flex items-center gap-1 text-left text-[11px] font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded px-1.5 py-0.5 truncate"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityDot[t.priority]}`} />
                    <span className="truncate">{t.title}</span>
                  </button>
                ))}
                {dayTasks.length > 2 && <p className="text-[10px] text-gray-400 px-1.5">+{dayTasks.length - 2} more</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
