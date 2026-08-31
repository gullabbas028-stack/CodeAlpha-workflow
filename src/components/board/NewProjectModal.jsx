import { useState } from "react";
import { X } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const colorOptions = ["#7A5AF8", "#22C55E", "#F97316", "#EF4444", "#0EA5E9", "#EC4899"];

export default function NewProjectModal({ onClose }) {
  const { addProject } = useData();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [color, setColor] = useState(colorOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const project = addProject({ name: name.trim(), description: description.trim(), privacy, color });
    onClose();
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-popover animate-popIn p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Create Project</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Project name</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Customer Portal Revamp"
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-4"
        />

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="What's this project about?"
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-4 resize-none"
        />

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Color</label>
        <div className="flex items-center gap-2 mb-4">
          {colorOptions.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full transition-transform ${color === c ? "scale-110 ring-2 ring-offset-2 ring-gray-300" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <label className="block text-xs font-medium text-gray-500 mb-1.5">Privacy</label>
        <div className="flex gap-2 mb-5">
          {["private", "team"].map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPrivacy(p)}
              className={`flex-1 capitalize text-sm font-medium py-2 rounded-lg border transition-colors ${
                privacy === p ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 text-gray-500"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white transition-colors">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
