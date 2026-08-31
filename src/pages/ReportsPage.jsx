import { useData } from "../context/DataContext";
import { columns } from "../data/mockData";

const colStyle = { "To Do": "bg-gray-300", "In Progress": "bg-sky-400", "In Review": "bg-orange-400", Done: "bg-emerald-400" };

export default function ReportsPage() {
  const { tasks, projects } = useData();

  return (
    <div className="p-4 lg:p-6 animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-400 mt-1">A quick read on where every project stands.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p) => {
          const projectTasks = tasks.filter((t) => t.projectId === p.id);
          const total = projectTasks.length || 1;
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <span className="text-xs text-gray-400 ml-auto">{projectTasks.length} tasks</span>
              </div>

              <div className="h-3 rounded-full overflow-hidden flex mb-3">
                {columns.map((c) => {
                  const count = projectTasks.filter((t) => t.status === c).length;
                  const pct = (count / total) * 100;
                  return pct > 0 ? <div key={c} className={colStyle[c]} style={{ width: `${pct}%` }} /> : null;
                })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {columns.map((c) => {
                  const count = projectTasks.filter((t) => t.status === c).length;
                  return (
                    <div key={c} className="text-center">
                      <p className="text-lg font-bold text-gray-900">{count}</p>
                      <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${colStyle[c]}`} /> {c}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
