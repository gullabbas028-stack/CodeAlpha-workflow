import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Plus, MoreHorizontal } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskDetailModal from "./TaskDetailModal";
import NewTaskModal from "./NewTaskModal";
import { columns } from "../../data/mockData";
import { useData } from "../../context/DataContext";

const columnMeta = {
  "To Do": { dot: "bg-gray-400", text: "text-gray-700" },
  "In Progress": { dot: "bg-sky-500", text: "text-sky-600" },
  "In Review": { dot: "bg-orange-500", text: "text-orange-600" },
  Done: { dot: "bg-emerald-500", text: "text-emerald-600" },
};

export default function KanbanBoard({ projectId }) {
  const { tasks, moveTask, reorderTasks } = useData();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [newTaskCol, setNewTaskCol] = useState(null);

  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const tasksByColumn = (status) => projectTasks.filter((t) => t.status === status);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (source.droppableId !== destination.droppableId) {
      moveTask(draggableId, destination.droppableId);
    } else {
      const colTasks = Array.from(tasksByColumn(source.droppableId));
      const [moved] = colTasks.splice(source.index, 1);
      colTasks.splice(destination.index, 0, moved);
      reorderTasks(colTasks, source.droppableId);
    }
  };

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="p-4 lg:p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colTasks = tasksByColumn(col);
            const meta = columnMeta[col];
            return (
              <div key={col} className="w-72 sm:w-80 shrink-0">
                <div className="flex items-center justify-between px-1 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                    <h3 className={`text-sm font-semibold ${meta.text}`}>{col}</h3>
                    <span className="text-xs bg-gray-200/70 text-gray-500 rounded-full px-1.5 py-0.5">{colTasks.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setNewTaskCol(col)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded p-1">
                      <Plus size={15} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded p-1">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </div>

                <Droppable droppableId={col}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-2.5 min-h-[60px] rounded-xl p-1 transition-colors ${
                        snapshot.isDraggingOver ? "bg-brand-50/60" : ""
                      }`}
                    >
                      {colTasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} onClick={() => setActiveTaskId(task.id)} />
                      ))}
                      {provided.placeholder}
                      <button
                        onClick={() => setNewTaskCol(col)}
                        className="w-full text-left text-sm text-gray-400 hover:text-brand-600 hover:bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-1.5 transition-colors"
                      >
                        <Plus size={15} /> Add Task
                      </button>
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {activeTask && <TaskDetailModal task={activeTask} onClose={() => setActiveTaskId(null)} />}
      {newTaskCol && (
        <NewTaskModal defaultProjectId={projectId} defaultStatus={newTaskCol} onClose={() => setNewTaskCol(null)} />
      )}
    </div>
  );
}
