import { Bell, AtSign, MessageSquare, RefreshCw, Clock, UserPlus, FolderPlus } from "lucide-react";
import { useData } from "../context/DataContext";

const iconFor = {
  assigned: UserPlus,
  mention: AtSign,
  comment: MessageSquare,
  status: RefreshCw,
  deadline: Clock,
  invite: FolderPlus,
};

export default function InboxPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  return (
    <div className="p-4 lg:p-6 max-w-2xl animate-fadeIn">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-sm text-gray-400 mt-1">{notifications.filter((n) => !n.read).length} unread</p>
        </div>
        <button onClick={markAllNotificationsRead} className="text-sm font-medium text-brand-600 hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card divide-y divide-gray-50 overflow-hidden">
        {notifications.map((n) => {
          const Icon = iconFor[n.type] || Bell;
          return (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`w-full flex items-start gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors ${!n.read ? "bg-brand-50/40" : ""}`}
            >
              <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Icon size={16} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="text-sm text-gray-700 leading-snug block">{n.message}</span>
                <span className="text-xs text-gray-400">{n.time}</span>
              </span>
              {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
