export default function MapLegend() {
  const items = [
    { icon: "🟣", label: "Quest (Job)",     color: "text-violet-600" },
    { icon: "🟢", label: "Company (Guild)", color: "text-emerald-600" },
    { icon: "🔵", label: "Explorer (User)", color: "text-blue-600" },
    { icon: "🟪", label: "Remote Job",      color: "text-purple-600" },
    { icon: "🟡", label: "Hybrid Job",      color: "text-amber-600" },
    { icon: "🔷", label: "On-site Job",     color: "text-blue-500" },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-lg">
      <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wide mb-2">Map Legend</h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="text-sm">{item.icon}</span>
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
