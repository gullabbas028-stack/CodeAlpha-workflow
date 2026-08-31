import { Avatar } from "../common/Avatar";

export default function TeamWorkload({ workload }) {
  const max = Math.max(...workload.map((w) => w.count), 1);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Team Workload</h3>
        <button className="text-xs font-medium text-brand-600 hover:underline">View all</button>
      </div>
      <div className="space-y-4">
        {workload.slice(0, 4).map(({ user, count }) => (
          <div key={user.id} className="flex items-center gap-3">
            <Avatar user={user} size={30} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-800 truncate">{user.name}</span>
                <span className="text-xs text-gray-400">{count} tasks</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
