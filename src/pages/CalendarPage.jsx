import { useState } from "react";
import { useData } from "../context/DataContext";
import MonthCalendar from "../components/common/MonthCalendar";
import TaskDetailModal from "../components/board/TaskDetailModal";

export default function CalendarPage() {
  const { tasks } = useData();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="p-4 lg:p-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Calendar</h1>
      <p className="text-sm text-gray-400 mb-5">Deadlines across every project in one place.</p>
      <MonthCalendar tasks={tasks} onSelectTask={(t) => setActiveTaskId(t.id)} />
      {activeTask && <TaskDetailModal task={activeTask} onClose={() => setActiveTaskId(null)} />}
    </div>
  );
}
