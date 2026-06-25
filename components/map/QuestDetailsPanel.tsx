"use client";
import { useAppStore } from "@/lib/store";
import { getCompanyById, formatSalary } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function QuestDetailsPanel() {
  const { selectedJob, setSelectedJob, applyToJob, hasApplied, isQuestSaved, toggleSaveQuest } = useAppStore();

  if (!selectedJob) return null;

  const company = getCompanyById(selectedJob.companyId);
  const applied = hasApplied(selectedJob.id);
  const saved = isQuestSaved(selectedJob.id);

  const jobTypeBadge = selectedJob.type === "Remote" ? "remote" : selectedJob.type === "Hybrid" ? "hybrid" : "onsite";

  return (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col h-full shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          {selectedJob.isEpic && (
            <span className="epic-badge text-xs">Epic Quest</span>
          )}
          <button
            onClick={() => setSelectedJob(null)}
            className="ml-auto text-gray-400 hover:text-gray-600 text-xl leading-none p-1 -mr-1 -mt-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <h2 className="font-bold text-base text-gray-900 mt-1 leading-tight">{selectedJob.title}</h2>

        {/* Company */}
        {company && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">
              {company.logo}
            </div>
            <span className="text-sm font-medium text-gray-700">{company.name} (Guild)</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span>{selectedJob.city}, Bukidnon</span>
          <Badge variant={jobTypeBadge}>{selectedJob.type}</Badge>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>⏰</span>
          <span className="font-semibold text-gray-900">{formatSalary(selectedJob.salaryMin, selectedJob.salaryMax)}</span>
        </div>

        {/* Job Type Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg border border-green-200">
            🗂️ Full-time
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200">
            🏢 {selectedJob.type}
          </span>
        </div>

        {/* Posted */}
        <div className="text-xs text-gray-400">
          Posted {timeAgo(selectedJob.postedAt)}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Requirements */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Requirements</h3>
          <ul className="space-y-1.5">
            {selectedJob.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-violet-500 mt-0.5 shrink-0">•</span>
                <span className="leading-snug">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Description snippet */}
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-1">About the Role</h3>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{selectedJob.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 mt-auto border-t border-gray-100 space-y-2">
        <button
          onClick={() => applyToJob(selectedJob.id)}
          disabled={applied}
          className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
            applied
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:from-violet-700 hover:to-purple-600 shadow-md hover:shadow-lg active:scale-[0.98]"
          }`}
        >
          {applied ? "✅ Applied!" : "⚔️ View Quest Details"}
        </button>
        <button
          onClick={() => toggleSaveQuest(selectedJob.id)}
          className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all border ${
            saved
              ? "bg-violet-50 text-violet-700 border-violet-200"
              : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700"
          }`}
        >
          {saved ? "🔖 Quest Saved" : "🔖 Save Quest"}
        </button>
      </div>
    </div>
  );
}
