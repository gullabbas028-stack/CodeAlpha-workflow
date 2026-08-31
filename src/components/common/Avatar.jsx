export function Avatar({ user, size = 32, ring = false, showStatus = false }) {
  if (!user) return null;
  return (
    <div className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      <img
        src={user.avatar}
        alt={user.name}
        title={user.name}
        className={`rounded-full object-cover w-full h-full ${ring ? "ring-2 ring-white" : ""}`}
      />
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${
            user.online ? "bg-green-500" : "bg-gray-300"
          }`}
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      )}
    </div>
  );
}

export function AvatarStack({ users, max = 5, size = 28 }) {
  const shown = users.slice(0, max);
  const remaining = users.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((u, i) => (
        <div key={u.id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}>
          <Avatar user={u} size={size} ring />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className="rounded-full bg-navy-800 text-white text-xs font-medium flex items-center justify-center ring-2 ring-white"
          style={{ width: size, height: size, marginLeft: -8 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
