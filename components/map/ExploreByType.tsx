"use client";
import { useAppStore } from "@/lib/store";
import { mockJobs } from "@/lib/mock-data";

export default function ExploreByType() {
  const { activeJobTypeFilter, setActiveJobTypeFilter } = useAppStore();

  const remoteCount = mockJobs.filter((j) => j.type === "Remote").length;
  const hybridCount = mockJobs.filter((j) => j.type === "Hybrid").length;
  const onsiteCount = mockJobs.filter((j) => j.type === "On-site").length;

  const types = [
    {
      id: "Remote",
      icon: "🌐",
      label: "Remote Jobs",
      subtitle: "Work from anywhere in the world",
      count: remoteCount,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      activeBg: "bg-purple-600",
      countColor: "text-purple-600",
    },
    {
      id: "Hybrid",
      icon: "🛡️",
      label: "Hybrid Jobs",
      subtitle: "Work in-office & remote",
      count: hybridCount,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      activeBg: "bg-amber-500",
      countColor: "text-amber-600",
    },
    {
      id: "On-site",
      icon: "🏢",
      label: "On-site Jobs",
      subtitle: "Work at specific locations",
      count: onsiteCount,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      activeBg: "bg-blue-600",
      countColor: "text-blue-600",
    },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <h3 className="text-sm font-bold text-gray-700 mb-2.5">Explore Jobs by Type</h3>
      <div className="flex gap-3">
        {types.map((t) => {
          const isActive = activeJobTypeFilter === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveJobTypeFilter(isActive ? "All" : t.id)}
              className={`flex-1 flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                isActive
                  ? `${t.bg} ${t.border} border-2 shadow-sm`
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 ${isActive ? t.bg : "bg-gray-100"}`}>
                {t.icon}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${isActive ? t.color : "text-gray-700"} leading-tight`}>{t.label}</div>
                <div className="text-xs text-gray-400 leading-tight truncate">{t.subtitle}</div>
              </div>
              <div className={`ml-auto shrink-0 font-bold text-sm ${isActive ? t.color : "text-gray-500"}`}>
                {t.count} Jobs →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}