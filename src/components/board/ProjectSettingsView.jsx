import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, UserMinus } from "lucide-react";
import { useData } from "../../context/DataContext";
import { users as allUsers } from "../../data/mockData";
import { Avatar } from "../common/Avatar";

export default function ProjectSettingsView({ project }) {
  const { updateProject, deleteProject } = useData();
  const navigate = useNavigate();
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [privacy, setPrivacy] = useState(project.privacy);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const members = allUsers.filter((u) => project.members.includes(u.id));

  const handleSave = (e) => {
    e.preventDefault();
    updateProject?.(project.id, { name, description, privacy });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    navigate("/projects");
  };

  return (
    <div className="p-4 lg:p-6 max-w-2xl space-y-6">
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Project details</h3>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Project name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-4"
        />
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 mb-4 resize-none"
        />
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
        <button type="submit" className="bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
          Save Changes
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Members ({members.length})</h3>
        <div className="space-y-2">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50">
              <Avatar user={m} size={32} showStatus />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                <p className="text-xs text-gray-400 truncate">{m.role}</p>
              </div>
              {m.id !== project.owner && (
                <button className="text-gray-400 hover:text-red-600 p-1.5">
                  <UserMinus size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-100 shadow-card p-5">
        <h3 className="font-semibold text-red-600 mb-2">Danger zone</h3>
        <p className="text-sm text-gray-500 mb-4">Deleting a project removes all of its tasks, files, and history. This can't be undone.</p>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            <Trash2 size={15} /> Delete Project
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleDelete} className="text-sm font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              Confirm Delete
            </button>
            <button onClick={() => setConfirmDelete(false)} className="text-sm font-medium text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
