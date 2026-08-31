import { Avatar } from "../common/Avatar";
import { findUser } from "../../data/mockData";

export default function ActivityFeed({ activity }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Activity</h3>
        <button className="text-xs font-medium text-brand-600 hover:underline">View all</button>
      </div>
      <div className="space-y-4">
        {activity.slice(0, 5).map((a) => {
          const user = findUser(a.userId);
          return (
            <div key={a.id} className="flex items-start gap-3">
              <Avatar user={user} size={30} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-snug">
                  <span className="font-semibold text-gray-900">{user?.name}</span> {a.action}{" "}
                  <span className="font-medium text-gray-800">"{a.target}"</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
