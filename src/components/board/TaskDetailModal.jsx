import { useState } from "react";
import { X, Calendar, Flag, Tag, User as UserIcon, Paperclip, Trash2, Send, Plus, Check } from "lucide-react";
import { useData } from "../../context/DataContext";
import { users, findUser, priorities } from "../../data/mockData";
import { Avatar } from "../common/Avatar";
import { LabelBadge } from "../common/Badge";
import { format, parseISO, formatDistanceToNow } from "date-fns";

const labelOptions = ["Design", "Research", "Development", "Review", "Planning", "Marketing", "Release"];
const statusOptions = ["To Do", "In Progress", "In Review", "Done"];

export default function TaskDetailModal({ task, onClose }) {
  const { updateTask, deleteTask, toggleChecklistItem, comments, addComment } = useData();
  const [commentText, setCommentText] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [description, setDescription] = useState(task.description);

  const taskComments = comments.filter((c) => c.taskId === task.id);
  const checklistDone = task.checklist.filter((c) => c.done).length;

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(task.id, commentText.trim());
    setCommentText("");
  };

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (!newChecklistItem.trim()) return;
    updateTask(task.id, { checklist: [...task.checklist, { id: `c${Date.now()}`, text: newChecklistItem.trim(), done: false }] });
    setNewChecklistItem("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[88vh] bg-white rounded-2xl shadow-popover animate-popIn overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <select
            value={task.status}
            onChange={(e) => updateTask(task.id, { status: e.target.value })}
            className="text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg px-2.5 py-1.5 outline-none"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <button onClick={handleDelete} className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-2">
              <Trash2 size={17} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-2">
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <input
            value={task.title}
            onChange={(e) => updateTask(task.id, { title: e.target.value })}
            className="w-full text-xl font-bold text-gray-900 outline-none mb-5 -ml-0.5"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Field icon={UserIcon} label="Assignee">
              <select
                value={task.assignee}
                onChange={(e) => updateTask(task.id, { assignee: e.target.value })}
                className="text-sm font-medium text-gray-700 outline-none bg-transparent w-full"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </Field>
            <Field icon={Flag} label="Priority">
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value })}
                className="text-sm font-medium text-gray-700 outline-none bg-transparent w-full"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field icon={Calendar} label="Due date">
              <input
                type="date"
                value={task.dueDate || ""}
                onChange={(e) => updateTask(task.id, { dueDate: e.target.value })}
                className="text-sm font-medium text-gray-700 outline-none bg-transparent w-full"
              />
            </Field>
            <Field icon={Tag} label="Label">
              <select
                value={task.label}
                onChange={(e) => updateTask(task.id, { label: e.target.value })}
                className="text-sm font-medium text-gray-700 outline-none bg-transparent w-full"
              >
                {labelOptions.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </Field>
          </div>

          <Section title="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => updateTask(task.id, { description })}
              rows={3}
              placeholder="Add a more detailed description..."
              className="w-full text-sm text-gray-600 outline-none resize-none bg-gray-50 rounded-lg p-3 focus:ring-2 focus:ring-brand-500/20"
            />
          </Section>

          <Section title={`Checklist ${task.checklist.length ? `(${checklistDone}/${task.checklist.length})` : ""}`}>
            {task.checklist.length > 0 && (
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${(checklistDone / task.checklist.length) * 100}%` }}
                />
              </div>
            )}
            <div className="space-y-1.5 mb-2">
              {task.checklist.map((item) => (
                <label key={item.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => toggleChecklistItem(task.id, item.id)}
                    className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                      item.done ? "bg-brand-500 border-brand-500" : "border-gray-300"
                    }`}
                    style={{ width: 18, height: 18 }}
                  >
                    {item.done && <Check size={12} className="text-white" />}
                  </button>
                  <span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span>
                </label>
              ))}
            </div>
            <form onSubmit={handleAddChecklistItem} className="flex items-center gap-2 px-2">
              <Plus size={16} className="text-gray-400" />
              <input
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Add an item"
                className="flex-1 text-sm outline-none text-gray-600 placeholder:text-gray-400"
              />
            </form>
          </Section>

          <Section title="Attachments">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2.5">
              <Paperclip size={15} />
              {task.attachments > 0 ? `${task.attachments} file(s) attached` : "No attachments yet"}
            </div>
          </Section>

          <Section title={`Comments (${taskComments.length})`}>
            <div className="space-y-3 mb-3">
              {taskComments.map((c) => {
                const author = findUser(c.userId);
                return (
                  <div key={c.id} className="flex gap-2.5">
                    <Avatar user={author} size={30} />
                    <div className="flex-1 bg-gray-50 rounded-xl px-3.5 py-2.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-gray-800">{author?.name}</span>
                        <span className="text-xs text-gray-400">
                          {(() => {
                            try { return formatDistanceToNow(parseISO(c.createdAt), { addSuffix: true }); } catch { return ""; }
                          })()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-snug">{c.text}</p>
                    </div>
                  </div>
                );
              })}
              {taskComments.length === 0 && <p className="text-sm text-gray-400">No comments yet — start the discussion.</p>}
            </div>
            <form onSubmit={handleAddComment} className="flex items-center gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment... use @ to mention"
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400"
              />
              <button type="submit" className="w-10 h-10 rounded-lg bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shrink-0">
                <Send size={16} />
              </button>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
        <Icon size={12} /> {label}
      </div>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-2.5">{title}</h4>
      {children}
    </div>
  );
}
