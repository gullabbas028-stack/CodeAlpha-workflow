import { FileText, FileArchive, FileSpreadsheet, Download } from "lucide-react";

const iconFor = (type) => {
  if (type === "ZIP") return FileArchive;
  if (type === "XLSX" || type === "CSV") return FileSpreadsheet;
  return FileText;
};

const tintFor = (type) => {
  if (type === "PDF") return "bg-red-50 text-red-500";
  if (type === "ZIP") return "bg-amber-50 text-amber-500";
  if (type === "DOCX") return "bg-sky-50 text-sky-500";
  return "bg-gray-100 text-gray-500";
};

export default function SharedFilesPanel({ files }) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Shared Files</h3>
        <button className="text-xs font-medium text-brand-600 hover:underline">View all</button>
      </div>
      <div className="px-2 py-2 max-h-64 overflow-y-auto">
        {files.map((f) => {
          const Icon = iconFor(f.type);
          return (
            <div key={f.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tintFor(f.type)}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                <p className="text-xs text-gray-400">{f.type} · {f.size} · {f.date}</p>
              </div>
              <button className="text-gray-400 hover:text-brand-600 p-1.5 shrink-0">
                <Download size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
