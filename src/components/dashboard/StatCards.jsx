import { FolderKanban, Activity, CheckCircle2, Clock, AlarmClock } from "lucide-react";

export default function StatCards({ stats }) {
  const items = [
    { label: "Total Projects", value: stats.totalProjects, icon: FolderKanban, tint: "bg-brand-50 text-brand-600" },
    { label: "Active Projects", value: stats.activeProjects, icon: Activity, tint: "bg-sky-50 text-sky-600" },
    { label: "Completed Tasks", value: stats.completedTasks, icon: CheckCircle2, tint: "bg-emerald-50 text-emerald-600" },
    { label: "Pending Tasks", value: stats.pendingTasks, icon: Clock, tint: "bg-amber-50 text-amber-600" },
    { label: "Due Soon", value: stats.dueSoon, icon: AlarmClock, tint: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map(({ label, value, icon: Icon, tint }) => (
        <div key={label} className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 animate-fadeIn">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${tint}`}>
            <Icon size={18} />
          </div>
          <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      ))}
    </div>
  );
}
