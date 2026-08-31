import { createContext, useContext, useState } from "react";
import {
  tasks as initialTasks,
  comments as initialComments,
  notifications as initialNotifications,
  projects as initialProjects,
  activityFeed as initialActivity,
  currentUser,
} from "../data/mockData";

const DataContext = createContext(null);

let idCounter = 1000;
const nextId = (prefix) => `${prefix}${idCounter++}`;

export function DataProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [comments, setComments] = useState(initialComments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [projects, setProjects] = useState(initialProjects);
  const [activity, setActivity] = useState(initialActivity);

  const pushActivity = (action, target) => {
    setActivity((prev) => [{ id: nextId("a"), userId: currentUser.id, action, target, time: "just now" }, ...prev]);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    const task = tasks.find((t) => t.id === taskId);
    if (task) pushActivity("moved", `${task.title} to ${newStatus}`);
  };

  const reorderTasks = (newTasksForStatus, status) => {
    setTasks((prev) => {
      const others = prev.filter((t) => t.status !== status);
      return [...others, ...newTasksForStatus];
    });
  };

  const addTask = (projectId, title, status = "To Do") => {
    const task = {
      id: nextId("t"),
      projectId,
      title,
      description: "",
      status,
      priority: "Medium",
      label: "Planning",
      assignee: currentUser.id,
      dueDate: null,
      comments: 0,
      checklist: [],
      attachments: 0,
      createdBy: currentUser.id,
    };
    setTasks((prev) => [...prev, task]);
    pushActivity("created a task", title);
    return task;
  };

  const updateTask = (taskId, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...patch } : t)));
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const toggleChecklistItem = (taskId, itemId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, checklist: t.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)) }
          : t
      )
    );
  };

  const addComment = (taskId, text) => {
    const comment = { id: nextId("cm"), taskId, userId: currentUser.id, text, createdAt: new Date().toISOString() };
    setComments((prev) => [...prev, comment]);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, comments: t.comments + 1 } : t)));
    return comment;
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleStar = (projectId) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, starred: !p.starred } : p)));
  };

  const addProject = (project) => {
    const newProject = { id: nextId("p"), members: [currentUser.id], owner: currentUser.id, status: "planning", starred: false, ...project };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId, patch) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...patch } : p)));
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setTasks((prev) => prev.filter((t) => t.projectId !== projectId));
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        comments,
        notifications,
        projects,
        activity,
        moveTask,
        reorderTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleChecklistItem,
        addComment,
        markNotificationRead,
        markAllNotificationsRead,
        toggleStar,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
