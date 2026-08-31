export default function ProjectProgress({ percent, done, total }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Project Progress</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {percent}% <span className="text-sm font-medium text-gray-400">Complete</span>
      </p>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">{done} of {total} tasks completed</p>
    </div>
  );
}
