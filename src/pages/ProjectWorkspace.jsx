import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Star, Search, MoreHorizontal, UserPlus } from "lucide-react";
import { useData } from "../context/DataContext";
import { users as allUsers } from "../data/mockData";
import { AvatarStack } from "../components/common/Avatar";
import KanbanBoard from "../components/board/KanbanBoard";
import ListView from "../components/board/ListView";
import TimelineView from "../components/board/TimelineView";
import FilesView from "../components/board/FilesView";
import ProjectSettingsView from "../components/board/ProjectSettingsView";
import MonthCalendar from "../components/common/MonthCalendar";
import TaskDetailModal from "../components/board/TaskDetailModal";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import TeamWorkload from "../components/dashboard/TeamWorkload";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import TeamChatPanel from "../components/dashboard/TeamChatPanel";
import SharedFilesPanel from "../components/dashboard/SharedFilesPanel";
import { files as allFiles, teamChat } from "../data/mockData";

const tabs = ["Board", "List", "Timeline", "Calendar", "Files", "Settings"];

export default function ProjectWorkspace() {
  const { projectId } = useParams();
  const { projects, tasks, activity, toggleStar } = useData();
  const [tab, setTab] = useState("Board");
  const [calendarTaskId, setCalendarTaskId] = useState(null);

  const project = projects.find((p) => p.id === projectId);
  if (!project) return <Navigate to="/projects" replace />;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const members = allUsers.filter((u) => project.members.includes(u.id));
  const projectFiles = allFiles.filter((f) => f.projectId === project.id);
  const projectActivity = activity;

  const progress = (() => {
    const total = projectTasks.length || 1;
    const done = projectTasks.filter((t) => t.status === "Done").length;
    return { percent: Math.round((done / total) * 100), done, total: projectTasks.length };
  })();

  const workload = members
    .map((u) => ({ user: u, count: projectTasks.filter((t) => t.assignee === u.id && t.status !== "Done").length }))
    .sort((a, b) => b.count - a.count);

  const upcomingTasks = projectTasks
    .filter((t) => t.dueDate && t.status !== "Done")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const calendarTask = projectTasks.find((t) => t.id === calendarTaskId);

  return (
    <div className="animate-fadeIn">
      <div className="bg-white border-b border-gray-100 px-4 lg:px-6 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
            <h1 className="text-xl font-bold text-gray-900 truncate">{project.name}</h1>
            <button onClick={() => toggleStar(project.id)} className={project.starred ? "text-amber-400" : "text-gray-300"}>
              <Star size={18} fill={project.starred ? "currentColor" : "none"} />
            </button>
            <span className="text-xs font-medium bg-brand-50 text-brand-600 rounded-md px-2 py-0.5 capitalize hidden sm:inline">
              {project.privacy}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <AvatarStack users={members} size={30} />
            <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-3.5 py-2 rounded-lg">
              <UserPlus size={15} /> Invite
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hidden sm:flex">
              <Search size={17} />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm font-medium px-3.5 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                tab === t ? "border-brand-500 text-brand-600" : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Board" && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-0">
          <div>
            <KanbanBoard projectId={project.id} />
            <div className="px-4 lg:px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TeamChatPanel messages={teamChat} />
              <SharedFilesPanel files={projectFiles} />
            </div>
          </div>
          <div className="p-4 lg:p-6 space-y-4 xl:border-l border-gray-100">
            <ActivityFeed activity={projectActivity} />
            <ProjectProgress percent={progress.percent} done={progress.done} total={progress.total} />
            <UpcomingDeadlines tasks={upcomingTasks} />
            <TeamWorkload workload={workload} />
          </div>
        </div>
      )}

      {tab === "List" && <ListView tasks={projectTasks} />}
      {tab === "Timeline" && <TimelineView tasks={projectTasks} />}
      {tab === "Calendar" && (
        <div className="p-4 lg:p-6">
          <MonthCalendar tasks={projectTasks} onSelectTask={(t) => setCalendarTaskId(t.id)} />
        </div>
      )}
      {tab === "Files" && <FilesView files={projectFiles} />}
      {tab === "Settings" && <ProjectSettingsView project={project} />}

      {calendarTask && <TaskDetailModal task={calendarTask} onClose={() => setCalendarTaskId(null)} />}
    </div>
  );
}
