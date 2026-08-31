import { Draggable } from "@hello-pangea/dnd";
import { MessageSquare, Paperclip, CheckSquare } from "lucide-react";
import { PriorityBadge, LabelBadge } from "../common/Badge";
import { Avatar } from "../common/Avatar";
import { findUser } from "../../data/mockData";
import { format, parseISO } from "date-fns";

export default function TaskCard({ task, index, onClick }) {
  const assignee = findUser(task.assignee);
  const checklistDone = task.checklist.filter((c) => c.done).length;
  const checklistTotal = task.checklist.length;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`bg-white rounded-xl p-3.5 shadow-card border border-gray-100 cursor-pointer transition-shadow hover:shadow-panel ${
            snapshot.isDragging ? "shadow-popover rotate-1" : ""
          }`}
        >
          <p className="text-sm font-semibold text-gray-800 leading-snug mb-2.5">{task.title}</p>

          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            <LabelBadge label={task.label} />
            <PriorityBadge priority={task.priority} />
          </div>

          {checklistTotal > 0 && (
            <div className="mb-2.5">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span className="flex items-center gap-1"><CheckSquare size={12} /> Checklist</span>
                <span>{checklistDone}/{checklistTotal}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${checklistTotal ? (checklistDone / checklistTotal) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{task.dueDate ? format(parseISO(task.dueDate), "MMM d") : "No date"}</span>
            <div className="flex items-center gap-2 text-gray-400">
              {task.attachments > 0 && (
                <span className="flex items-center gap-0.5 text-xs"><Paperclip size={13} />{task.attachments}</span>
              )}
              {task.comments > 0 && (
                <span className="flex items-center gap-0.5 text-xs"><MessageSquare size={13} />{task.comments}</span>
              )}
              <Avatar user={assignee} size={24} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
