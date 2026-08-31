const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-sky-50 text-sky-600",
};

const labelStyles = {
  Design: "bg-violet-50 text-violet-600",
  Research: "bg-blue-50 text-blue-600",
  Development: "bg-amber-50 text-amber-700",
  Review: "bg-orange-50 text-orange-600",
  Planning: "bg-emerald-50 text-emerald-600",
  Marketing: "bg-pink-50 text-pink-600",
  Release: "bg-indigo-50 text-indigo-600",
};

const statusStyles = {
  active: "bg-emerald-50 text-emerald-600",
  planning: "bg-amber-50 text-amber-600",
  completed: "bg-sky-50 text-sky-600",
};

export function PriorityBadge({ priority }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${priorityStyles[priority] || "bg-gray-100 text-gray-600"}`}>
      {priority}
    </span>
  );
}

export function LabelBadge({ label }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${labelStyles[label] || "bg-gray-100 text-gray-600"}`}>
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const text = status === "active" ? "Active" : status === "planning" ? "Planning" : "Completed";
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
      {text}
    </span>
  );
}

export function PrivacyBadge({ privacy }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-brand-50 text-brand-600 capitalize">
      {privacy}
    </span>
  );
}
