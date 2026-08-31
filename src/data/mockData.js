// Central mock data store. Swap this file for real API calls when a backend is wired up.

export const currentUser = {
  id: "u1",
  name: "John Doe",
  role: "Admin",
  email: "john.doe@workflow.app",
  avatar: "https://i.pravatar.cc/150?img=12",
  online: true,
};

export const users = [
  currentUser,
  { id: "u2", name: "Sarah Johnson", role: "Product Designer", email: "sarah@workflow.app", avatar: "https://i.pravatar.cc/150?img=47", online: true },
  { id: "u3", name: "Mike Chen", role: "Frontend Engineer", email: "mike@workflow.app", avatar: "https://i.pravatar.cc/150?img=13", online: true },
  { id: "u4", name: "Emily Davis", role: "QA Engineer", email: "emily@workflow.app", avatar: "https://i.pravatar.cc/150?img=32", online: false },
  { id: "u5", name: "David Wilson", role: "Backend Engineer", email: "david@workflow.app", avatar: "https://i.pravatar.cc/150?img=8", online: true },
  { id: "u6", name: "Lisa Brown", role: "Marketing Lead", email: "lisa@workflow.app", avatar: "https://i.pravatar.cc/150?img=44", online: false },
  { id: "u7", name: "Alex Turner", role: "Product Manager", email: "alex@workflow.app", avatar: "https://i.pravatar.cc/150?img=51", online: true },
];

const findUser = (id) => users.find((u) => u.id === id);

export const projects = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Full revamp of the marketing site — new visual identity, faster pages, and a CMS-driven blog.",
    color: "#7A5AF8",
    status: "active",
    privacy: "private",
    starred: true,
    owner: "u1",
    members: ["u1", "u2", "u3", "u4", "u5"],
    createdAt: "2026-05-01",
  },
  {
    id: "p2",
    name: "Mobile App",
    description: "Native iOS/Android companion app for on-the-go task management.",
    color: "#22C55E",
    status: "active",
    privacy: "team",
    starred: true,
    owner: "u1",
    members: ["u1", "u3", "u5", "u7"],
    createdAt: "2026-05-10",
  },
  {
    id: "p3",
    name: "Marketing Plan",
    description: "Q4 campaign planning across paid, organic, and lifecycle channels.",
    color: "#F97316",
    status: "active",
    privacy: "team",
    starred: true,
    owner: "u6",
    members: ["u1", "u6", "u7"],
    createdAt: "2026-06-02",
  },
  {
    id: "p4",
    name: "Product Launch",
    description: "Coordination hub for the v2.0 public launch.",
    color: "#EF4444",
    status: "planning",
    privacy: "private",
    starred: true,
    owner: "u7",
    members: ["u1", "u2", "u7"],
    createdAt: "2026-06-20",
  },
];

export const columns = ["To Do", "In Progress", "In Review", "Done"];

const priorities = ["Low", "Medium", "High"];

export const tasks = [
  { id: "t1", projectId: "p1", title: "Create wireframes for homepage", description: "Low-fidelity wireframes covering hero, feature grid, and footer for stakeholder sign-off.", status: "To Do", priority: "Medium", label: "Design", assignee: "u2", dueDate: "2026-09-05", comments: 2, checklist: [{ id: "c1", text: "Hero section", done: true }, { id: "c2", text: "Feature grid", done: false }], attachments: 1, createdBy: "u1" },
  { id: "t2", projectId: "p1", title: "Research competitors and gather ideas", description: "Audit 5 competitor sites for layout, tone, and conversion patterns.", status: "To Do", priority: "Low", label: "Research", assignee: "u7", dueDate: "2026-09-06", comments: 3, checklist: [], attachments: 0, createdBy: "u7" },
  { id: "t3", projectId: "p1", title: "Define color palette and typography", description: "Lock the type scale and accent palette for the new brand system.", status: "To Do", priority: "Medium", label: "Design", assignee: "u2", dueDate: "2026-09-07", comments: 1, checklist: [], attachments: 0, createdBy: "u2" },
  { id: "t4", projectId: "p1", title: "Create project brief and goals", description: "Document success metrics and scope boundaries for stakeholders.", status: "To Do", priority: "Low", label: "Planning", assignee: "u1", dueDate: "2026-09-08", comments: 0, checklist: [], attachments: 0, createdBy: "u1" },
  { id: "t5", projectId: "p1", title: "Design homepage layout", description: "High-fidelity homepage design in the new visual system.", status: "In Progress", priority: "High", label: "Design", assignee: "u2", dueDate: "2026-09-02", comments: 4, checklist: [{ id: "c3", text: "Hero", done: true }, { id: "c4", text: "Testimonials", done: true }, { id: "c5", text: "Pricing teaser", done: false }, { id: "c6", text: "Footer", done: false }], attachments: 2, createdBy: "u1" },
  { id: "t6", projectId: "p1", title: "Build responsive navigation bar", description: "Sticky nav with mobile drawer and scroll-aware styling.", status: "In Progress", priority: "Medium", label: "Development", assignee: "u3", dueDate: "2026-09-03", comments: 2, checklist: [{ id: "c7", text: "Desktop layout", done: true }], attachments: 0, createdBy: "u3" },
  { id: "t7", projectId: "p1", title: "Implement dark mode toggle", description: "Theme switcher persisted across sessions with system-preference detection.", status: "In Progress", priority: "Medium", label: "Development", assignee: "u3", dueDate: "2026-09-04", comments: 5, checklist: [{ id: "c8", text: "Token setup", done: true }, { id: "c9", text: "Toggle UI", done: true }, { id: "c10", text: "Persistence", done: true }, { id: "c11", text: "QA pass", done: false }, { id: "c12", text: "Docs", done: false }], attachments: 0, createdBy: "u5" },
  { id: "t8", projectId: "p1", title: "Set up CMS for blog section", description: "Headless CMS wired to the blog templates with preview support.", status: "In Progress", priority: "Low", label: "Development", assignee: "u5", dueDate: "2026-09-05", comments: 1, checklist: [], attachments: 0, createdBy: "u5" },
  { id: "t9", projectId: "p1", title: "Review homepage design", description: "Design QA pass against brand guidelines before dev handoff.", status: "In Review", priority: "Medium", label: "Review", assignee: "u1", dueDate: "2026-09-01", comments: 3, checklist: [{ id: "c13", text: "Accessibility check", done: true }, { id: "c14", text: "Brand check", done: true }], attachments: 0, createdBy: "u2" },
  { id: "t10", projectId: "p1", title: "Test mobile responsiveness", description: "Cross-device pass on iOS Safari, Android Chrome, and tablet breakpoints.", status: "In Review", priority: "High", label: "Review", assignee: "u4", dueDate: "2026-08-31", comments: 2, checklist: [{ id: "c15", text: "iOS Safari", done: true }], attachments: 0, createdBy: "u4" },
  { id: "t11", projectId: "p1", title: "Review content and SEO optimization", description: "Meta descriptions, heading structure, and image alt text pass.", status: "In Review", priority: "Low", label: "Review", assignee: "u6", dueDate: "2026-09-02", comments: 4, checklist: [{ id: "c16", text: "Meta tags", done: true }, { id: "c17", text: "Alt text", done: false }, { id: "c18", text: "Sitemap", done: false }], attachments: 0, createdBy: "u6" },
  { id: "t12", projectId: "p1", title: "Project kickoff meeting", description: "Aligned scope, timeline, and roles with the full team.", status: "Done", priority: "Medium", label: "Planning", assignee: "u1", dueDate: "2026-08-14", comments: 3, checklist: [], attachments: 0, createdBy: "u1" },
  { id: "t13", projectId: "p1", title: "User flow planning", description: "Mapped the primary conversion paths across the site.", status: "Done", priority: "Medium", label: "Planning", assignee: "u7", dueDate: "2026-08-15", comments: 2, checklist: [], attachments: 0, createdBy: "u7" },
  { id: "t14", projectId: "p1", title: "Create style guide", description: "Published the component and typography reference for the team.", status: "Done", priority: "Low", label: "Design", assignee: "u2", dueDate: "2026-08-16", comments: 4, checklist: [], attachments: 0, createdBy: "u2" },
  { id: "t15", projectId: "p1", title: "Set up project repository", description: "Repo scaffolding, CI, and branch protection rules.", status: "Done", priority: "Low", label: "Development", assignee: "u3", dueDate: "2026-08-17", comments: 1, checklist: [], attachments: 0, createdBy: "u3" },
  { id: "t16", projectId: "p1", title: "Initial design concepts", description: "First-round moodboards presented to stakeholders.", status: "Done", priority: "Medium", label: "Design", assignee: "u2", dueDate: "2026-08-18", comments: 6, checklist: [], attachments: 0, createdBy: "u2" },

  { id: "t17", projectId: "p2", title: "Define app navigation structure", description: "Tab bar vs. drawer decision and information architecture.", status: "To Do", priority: "Medium", label: "Planning", assignee: "u7", dueDate: "2026-09-10", comments: 1, checklist: [], attachments: 0, createdBy: "u7" },
  { id: "t18", projectId: "p2", title: "Set up push notifications", description: "APNs and FCM wiring for task reminders.", status: "To Do", priority: "High", label: "Development", assignee: "u5", dueDate: "2026-09-12", comments: 0, checklist: [], attachments: 0, createdBy: "u5" },
  { id: "t19", projectId: "p2", title: "Design onboarding flow", description: "First-run experience covering account setup and permissions.", status: "In Progress", priority: "High", label: "Design", assignee: "u2", dueDate: "2026-09-08", comments: 2, checklist: [{ id: "c19", text: "Welcome screen", done: true }], attachments: 1, createdBy: "u2" },
  { id: "t20", projectId: "p2", title: "Build offline sync", description: "Local cache with conflict resolution for spotty connections.", status: "In Progress", priority: "High", label: "Development", assignee: "u3", dueDate: "2026-09-14", comments: 3, checklist: [], attachments: 0, createdBy: "u3" },
  { id: "t21", projectId: "p2", title: "Beta TestFlight release", description: "First closed beta out to 40 testers.", status: "Done", priority: "Medium", label: "Release", assignee: "u1", dueDate: "2026-08-20", comments: 5, checklist: [], attachments: 0, createdBy: "u1" },

  { id: "t22", projectId: "p3", title: "Draft Q4 campaign brief", description: "Channel mix, budget split, and target segments.", status: "To Do", priority: "Medium", label: "Planning", assignee: "u6", dueDate: "2026-09-09", comments: 1, checklist: [], attachments: 0, createdBy: "u6" },
  { id: "t23", projectId: "p3", title: "Design email newsletter template", description: "Reusable MJML template for lifecycle sends.", status: "In Progress", priority: "Low", label: "Design", assignee: "u2", dueDate: "2026-09-11", comments: 0, checklist: [], attachments: 0, createdBy: "u6" },
  { id: "t24", projectId: "p3", title: "Launch social teaser series", description: "3-part teaser sequence across Instagram and X.", status: "Done", priority: "Medium", label: "Marketing", assignee: "u6", dueDate: "2026-08-25", comments: 2, checklist: [], attachments: 0, createdBy: "u6" },

  { id: "t25", projectId: "p4", title: "Finalize launch date", description: "Confirm go-live window with engineering and support.", status: "To Do", priority: "High", label: "Planning", assignee: "u7", dueDate: "2026-09-15", comments: 2, checklist: [], attachments: 0, createdBy: "u7" },
  { id: "t26", projectId: "p4", title: "Prepare press kit", description: "Screenshots, one-pager, and founder quotes for press outreach.", status: "In Progress", priority: "Medium", label: "Marketing", assignee: "u6", dueDate: "2026-09-18", comments: 1, checklist: [], attachments: 0, createdBy: "u6" },
];

export const withUsers = (task) => ({ ...task, assigneeUser: findUser(task.assignee) });

export const comments = [
  { id: "cm1", taskId: "t5", userId: "u2", text: "First pass on the hero is up for review — let me know what you think of the headline treatment.", createdAt: "2026-08-28T09:12:00" },
  { id: "cm2", taskId: "t5", userId: "u3", text: "Looks great! Can we try a slightly bolder CTA button?", createdAt: "2026-08-28T10:40:00" },
  { id: "cm3", taskId: "t5", userId: "u1", text: "Agreed with @Mike Chen, and let's ship this by Friday.", createdAt: "2026-08-28T11:02:00" },
  { id: "cm4", taskId: "t5", userId: "u2", text: "On it 👍", createdAt: "2026-08-28T11:05:00" },
  { id: "cm5", taskId: "t9", userId: "u1", text: "Reviewed against brand guidelines — a couple of spacing tweaks needed on mobile.", createdAt: "2026-08-27T15:30:00" },
  { id: "cm6", taskId: "t9", userId: "u2", text: "Pushed the spacing fixes, ready for a second look.", createdAt: "2026-08-27T16:10:00" },
  { id: "cm7", taskId: "t9", userId: "u4", text: "Confirmed on my end.", createdAt: "2026-08-27T16:45:00" },
];

export const activityFeed = [
  { id: "a1", userId: "u2", action: "commented on", target: "Design homepage layout", time: "2m ago" },
  { id: "a2", userId: "u3", action: "completed", target: "Project kickoff meeting", time: "15m ago" },
  { id: "a3", userId: "u4", action: "updated the due date of", target: "Test mobile responsiveness", time: "1h ago" },
  { id: "a4", userId: "u5", action: "added a new task to", target: "Website Redesign", time: "2h ago" },
  { id: "a5", userId: "u6", action: "commented on", target: "Review homepage design", time: "3h ago" },
  { id: "a6", userId: "u7", action: "moved", target: "Design onboarding flow to In Progress", time: "5h ago" },
  { id: "a7", userId: "u1", action: "invited", target: "Alex Turner to Product Launch", time: "1d ago" },
];

export const notifications = [
  { id: "n1", type: "assigned", message: "Sarah Johnson assigned you Design homepage layout", read: false, time: "10m ago" },
  { id: "n2", type: "mention", message: "Mike Chen mentioned you in a comment", read: false, time: "1h ago" },
  { id: "n3", type: "deadline", message: "Test mobile responsiveness is due tomorrow", read: false, time: "3h ago" },
  { id: "n4", type: "status", message: "Design onboarding flow moved to In Progress", read: true, time: "1d ago" },
  { id: "n5", type: "invite", message: "You were added to Product Launch", read: true, time: "2d ago" },
];

export const files = [
  { id: "f1", projectId: "p1", name: "homepage-wireframe.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "u2", date: "2026-08-15" },
  { id: "f2", projectId: "p1", name: "style-guide-v1.pdf", type: "PDF", size: "1.8 MB", uploadedBy: "u2", date: "2026-08-12" },
  { id: "f3", projectId: "p1", name: "project-brief.docx", type: "DOCX", size: "45 KB", uploadedBy: "u1", date: "2026-08-10" },
  { id: "f4", projectId: "p1", name: "logo-assets.zip", type: "ZIP", size: "12.5 MB", uploadedBy: "u3", date: "2026-08-08" },
];

export const teamChat = [
  { id: "m1", userId: "u2", text: "Hey team! How's the homepage design coming along?", time: "10:30 AM" },
  { id: "m2", userId: "u1", text: "Almost done! Should have a draft for review by EOD.", time: "10:32 AM" },
  { id: "m3", userId: "u3", text: "Great! I'll start working on the navigation component.", time: "10:33 AM" },
];

export { findUser, priorities };
