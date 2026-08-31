# WorkFlow — Project Management & Team Collaboration

A modern, Trello/Asana/Linear-inspired project management app: Kanban boards, task details, comments,
notifications, calendar, team workload, and an activity feed — built as a React frontend with realistic
mock data so it's fully interactive out of the box.

## Stack

- React 19 + Vite
- React Router v7 (auth + protected app routes)
- Tailwind CSS (design tokens in `tailwind.config.js`: navy sidebar scale, brand indigo/violet scale, layered card shadows)
- @hello-pangea/dnd (drag-and-drop Kanban board)
- lucide-react (icons), date-fns (dates)

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. This is a demo — the login and signup forms accept **any** email/password
combination (see `src/context/AuthContext.jsx`).

## Project structure

```
src/
  context/        AuthContext (session/login/signup/logout), DataContext (projects, tasks, comments,
                  notifications, activity — all CRUD operations client-side for now)
  data/           mockData.js — the single source of truth for demo data. Swap this file's contents
                  for real API calls when a backend is wired up; the context layer already isolates
                  every screen from where the data comes from.
  components/
    auth/         Shared login/signup/reset-password shell and form field
    layout/       Sidebar, Topbar, AppLayout (the authenticated app chrome)
    board/        Kanban board, task cards, task detail modal, list/timeline/files/settings views
    dashboard/    Stat cards, activity feed, progress, workload, deadlines, chat & files panels
    common/       Avatar, badges, global search (Ctrl+K), month calendar
  pages/          One file per route (Dashboard, Projects, ProjectWorkspace, MyTasks, Calendar,
                  Inbox, Team, Reports, Settings) plus pages/auth for the auth screens
```

## What's real vs. mocked

Everything you can click works — creating/editing/deleting tasks and projects, dragging cards between
columns, checklists, comments, starring projects, notifications, and account/notification settings all
update live app state. What's mocked for this frontend-only build:

- **Auth** accepts any credentials and stores a session in `localStorage` (no real backend/JWT yet)
- **Real-time collaboration** (WebSockets/Socket.io) isn't wired up — everything updates instantly
  because it's local state, but two browser tabs won't sync with each other yet
- **File uploads** show existing mock files; there's no real upload/storage

## Wiring up a real backend

The `DataContext` and `AuthContext` files are the seam: replace their internal `useState` + mock-data
calls with `fetch`/`axios` calls to a Node/Express + MongoDB API (matching the User/Project/Task/Comment/
Notification schema this UI already assumes), and add a Socket.io client in `DataContext` to push
real-time updates into the same state setters. No page or component needs to change.

## Design notes

Headings use **Space Grotesk**, body text uses **Inter** — loaded via Google Fonts in `src/index.css`.
Colors and shadows are tokenized in `tailwind.config.js` rather than hard-coded, so the whole palette
can be retuned from one place.
