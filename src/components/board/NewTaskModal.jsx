import { useState } from "react";
import { X } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function NewTaskModal({ onClose, defaultProjectId, defaultStatus = "To Do" }) {
  const { projects, addTask } = useData();
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId || projects[0]?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(projectId, title.trim(), defaultStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-popover animate-popIn p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Create Task</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Task title</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Update pricing page copy"
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-4"
        />

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Project</label>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-5"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white transition-colors">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
