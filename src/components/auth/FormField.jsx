export default function FormField({ label, id, error, right, ...props }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {right}
      </div>
      <input
        id={id}
        name={id}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-brand-200 ${
          error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-brand-400"
        }`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
