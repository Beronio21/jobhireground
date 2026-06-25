"use client";
import { useAppStore } from "@/lib/store";
import { getJobById, getCompanyById, formatSalary } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function SavedQuests() {
  const { savedQuests, toggleSaveQuest, setSelectedJob, setActiveTab } = useAppStore();

  const saved = savedQuests
    .map((id) => getJobById(id))
    .filter(Boolean) as ReturnType<typeof getJobById>[];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            🔖 Saved Quests
          </h1>
          <p className="text-gray-500 mt-1">{saved.length} saved quest{saved.length !== 1 ? "s" : ""}</p>
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-3">🔖</div>
            <div className="font-semibold text-gray-700">No saved quests</div>
            <div className="text-sm text-gray-400 mt-1">Save quests from the map to review them later!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {saved.map((job) => {
              if (!job) return null;
              const company = getCompanyById(job.companyId);
              const typeVariant = job.type === "Remote" ? "remote" : job.type === "Hybrid" ? "hybrid" : "onsite";
              return (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {company?.logo}
                    </div>
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => { setSelectedJob(job); setActiveTab("explore"); }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{job.title}</h3>
                          <div className="text-sm text-gray-500">{company?.name} · {job.city}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-700 shrink-0">
                          ₱{(job.salaryMin / 1000).toFixed(0)}k+
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={typeVariant}>{job.type}</Badge>
                        <span className="text-xs text-gray-400">Posted {timeAgo(job.postedAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveQuest(job.id)}
                      className="p-2 rounded-xl text-violet-500 hover:bg-violet-50 transition-all shrink-0"
                      title="Remove from saved"
                    >
                      🔖
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
