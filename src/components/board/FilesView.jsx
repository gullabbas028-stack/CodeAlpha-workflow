import { FileText, FileArchive, Download, Upload } from "lucide-react";

const iconFor = (type) => (type === "ZIP" ? FileArchive : FileText);
const tintFor = (type) => {
  if (type === "PDF") return "bg-red-50 text-red-500";
  if (type === "ZIP") return "bg-amber-50 text-amber-500";
  if (type === "DOCX") return "bg-sky-50 text-sky-500";
  return "bg-gray-100 text-gray-500";
};

export default function FilesView({ files }) {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">{files.length} file(s) shared in this project</p>
        <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-card">
          <Upload size={15} /> Upload File
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="grid grid-cols-[1fr_90px_100px_140px_110px_60px] gap-3 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span>Name</span>
          <span>Type</span>
          <span>Size</span>
          <span>Uploaded By</span>
          <span>Date</span>
          <span></span>
        </div>
        <div className="divide-y divide-gray-50">
          {files.map((f) => {
            const Icon = iconFor(f.type);
            return (
              <div key={f.id} className="grid grid-cols-[1fr_90px_100px_140px_110px_60px] gap-3 px-5 py-3 items-center">
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tintFor(f.type)}`}>
                    <Icon size={15} />
                  </span>
                  <span className="text-sm font-medium text-gray-800 truncate">{f.name}</span>
                </span>
                <span className="text-xs text-gray-500">{f.type}</span>
                <span className="text-xs text-gray-500">{f.size}</span>
                <span className="text-xs text-gray-500 truncate">{f.uploadedBy}</span>
                <span className="text-xs text-gray-400">{f.date}</span>
                <button className="text-gray-400 hover:text-brand-600 p-1.5 justify-self-start">
                  <Download size={16} />
                </button>
              </div>
            );
          })}
          {files.length === 0 && <p className="px-5 py-8 text-sm text-gray-400">No files yet — upload something to get started.</p>}
        </div>
      </div>
    </div>
  );
}
