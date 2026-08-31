import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Avatar } from "../components/common/Avatar";
import { Camera, Loader2, Check } from "lucide-react";

const tabs = ["Profile", "Password", "Notifications"];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${checked ? "bg-brand-500" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("Profile");
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [notifPrefs, setNotifPrefs] = useState({
    assigned: true,
    mentions: true,
    comments: true,
    deadlines: true,
    invites: true,
    productUpdates: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const notifLabels = {
    assigned: "A task is assigned to me",
    mentions: "Someone mentions me in a comment",
    comments: "Someone comments on my task",
    deadlines: "A deadline is approaching",
    invites: "I'm invited to a project",
    productUpdates: "Product updates and tips",
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-400 mb-6">Manage your account and preferences.</p>

      <div className="flex items-center gap-1 mb-6 border-b border-gray-100">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm font-medium px-3.5 py-2.5 border-b-2 transition-colors ${
              tab === t ? "border-brand-500 text-brand-600" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        {tab === "Profile" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar user={user} size={64} />
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-navy-900 text-white flex items-center justify-center border-2 border-white"
                  title="Change photo"
                >
                  <Camera size={12} />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Full name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              />
            </div>

            <SaveButton saved={saved} />
          </form>
        )}

        {tab === "Password" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Current password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">New password</label>
              <input
                type="password"
                value={passwords.next}
                onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm new password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              />
            </div>
            <SaveButton saved={saved} label="Update password" />
          </form>
        )}

        {tab === "Notifications" && (
          <form onSubmit={handleSave} className="space-y-1">
            {Object.entries(notifLabels).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{label}</span>
                <Toggle checked={notifPrefs[key]} onChange={(v) => setNotifPrefs({ ...notifPrefs, [key]: v })} />
              </div>
            ))}
            <div className="pt-4">
              <SaveButton saved={saved} label="Save preferences" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SaveButton({ saved, label = "Save changes" }) {
  return (
    <button
      type="submit"
      className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-card"
    >
      {saved ? <Check size={16} /> : null}
      {saved ? "Saved" : label}
    </button>
  );
}
