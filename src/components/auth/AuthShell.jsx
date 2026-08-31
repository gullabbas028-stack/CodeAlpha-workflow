import { Link } from "react-router-dom";
import { LayoutDashboard, CheckCircle2, Users2, KanbanSquare } from "lucide-react";

const highlights = [
  { icon: KanbanSquare, text: "Drag-and-drop boards that keep every task moving" },
  { icon: Users2, text: "See who's working on what, in real time" },
  { icon: CheckCircle2, text: "Deadlines, comments, and files in one place" },
];

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex bg-surface">
      <div className="hidden lg:flex lg:w-[44%] bg-navy-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />

        <Link to="/" className="flex items-center gap-2.5 relative">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center font-bold font-display">
            W
          </div>
          <span className="font-display font-bold text-xl tracking-tight">WorkFlow</span>
        </Link>

        <div className="relative">
          <h2 className="font-display text-3xl font-semibold leading-tight mb-6 max-w-sm">
            Run every project from one calm, organized workspace.
          </h2>
          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-navy-600">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-brand-300">
                  <Icon size={16} />
                </span>
                <span className="text-sm leading-relaxed pt-1.5 text-white/80">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-navy-600">© 2026 WorkFlow. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center font-bold text-white font-display">
              <LayoutDashboard size={16} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-gray-900">WorkFlow</span>
          </div>

          <h1 className="font-display text-2xl font-semibold text-gray-900 mb-1.5">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mb-8">{subtitle}</p>}

          {children}

          {footer && <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
