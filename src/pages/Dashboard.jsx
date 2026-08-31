import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { users } from "../data/mockData";
import StatCards from "../components/dashboard/StatCards";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import TeamWorkload from "../components/dashboard/TeamWorkload";
import { isAfter, isBefore, addDays, parseISO } from "date-fns";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, projects, activity } = useData();

  const stats = useMemo(() => {
    const now = new Date();
    const soon = addDays(now, 5);
    return {
      totalProjects: projects.length,
      activeProjects: projects.filter((p) => p.status === "active").length,
      completedTasks: tasks.filter((t) => t.status === "Done").length,
      pendingTasks: tasks.filter((t) => t.status !== "Done").length,
      dueSoon: tasks.filter((t) => t.dueDate && t.status !== "Done" && isBefore(parseISO(t.dueDate), soon) && isAfter(parseISO(t.dueDate), now)).length,
    };
  }, [tasks, projects]);

  const progress = useMemo(() => {
    const done = tasks.filter((t) => t.status === "Done").length;
    const total = tasks.length || 1;
    return { percent: Math.round((done / total) * 100), done, total };
  }, [tasks]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate && t.status !== "Done")
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [tasks]);

  const workload = useMemo(() => {
    return users
      .map((u) => ({ user: u, count: tasks.filter((t) => t.assignee === u.id && t.status !== "Done").length }))
      .sort((a, b) => b.count - a.count);
  }, [tasks]);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-sm text-gray-400 mt-1">Here's what's happening across your workspace today.</p>
      </div>

      <StatCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectProgress percent={progress.percent} done={progress.done} total={progress.total} />
          <ActivityFeed activity={activity} />
        </div>
        <div className="space-y-6">
          <UpcomingDeadlines tasks={upcomingTasks} />
          <TeamWorkload workload={workload} />
        </div>
      </div>
    </div>
  );
}
