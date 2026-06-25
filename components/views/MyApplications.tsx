"use client";
import { useAppStore } from "@/lib/store";
import { getJobById, getCompanyById, formatSalary } from "@/lib/mock-data";
import { getStatusColor, getJobTypeColor, timeAgo } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const STATUS_STEPS = ["pending", "reviewed", "accepted"];

function StatusTracker({ status }: { status: string }) {
  const current = STATUS_STEPS.indexOf(status);
  const rejected = status === "rejected";

  return (
    <div className="flex items-center gap-1 mt-2">
      {rejected ? (
        <span className="text-xs text-red-500 font-medium flex items-center gap-1">
          ❌ Application Rejected
        </span>
      ) : (
        STATUS_STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
              i <= current
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-white border-gray-300 text-gray-400"
            }`}>
              {i < current ? "✓" : i + 1}
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`w-6 h-0.5 ${i < current ? "bg-violet-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))
      )}
      {!rejected && (
        <span className={`ml-2 text-xs font-medium ${
          status === "accepted" ? "text-green-600" : "text-gray-500"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )}
    </div>
  );
}

export default function MyApplications() {
  const { applications, user } = useAppStore();

  const myApps = applications
    .filter((a) => a.userId === user.id)
    .map((a) => ({ app: a, job: getJobById(a.jobId) }))
    .filter((x) => x.job);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            📄 My Applications
          </h1>
          <p className="text-gray-500 mt-1">Track the status of your quest applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Applied", count: myApps.length, icon: "📋", color: "text-violet-600 bg-violet-50" },
            { label: "Pending",       count: myApps.filter(x => x.app.status === "pending").length,  icon: "⏳", color: "text-yellow-600 bg-yellow-50" },
            { label: "Reviewed",      count: myApps.filter(x => x.app.status === "reviewed").length, icon: "👁️", color: "text-blue-600 bg-blue-50" },
            { label: "Accepted",      count: myApps.filter(x => x.app.status === "accepted").length, icon: "✅", color: "text-green-600 bg-green-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
              <div className={`text-2xl mb-1 w-10 h-10 rounded-xl flex items-center justify-center mx-auto ${s.color}`}>
                {s.icon}
              </div>
              <div className="font-bold text-xl text-gray-900">{s.count}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Applications list */}
        {myApps.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-3">📄</div>
            <div className="font-semibold text-gray-700">No applications yet</div>
            <div className="text-sm text-gray-400 mt-1">Start exploring the map and apply for quests!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {myApps.map(({ app, job }) => {
              if (!job) return null;
              const company = getCompanyById(job.companyId);
              const typeVariant = job.type === "Remote" ? "remote" : job.type === "Hybrid" ? "hybrid" : "onsite";
              return (
                <div key={app.id} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {company?.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{job.title}</h3>
                          <div className="text-sm text-gray-500">{company?.name} · {job.city}</div>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant={typeVariant}>{job.type}</Badge>
                        <span className="text-xs text-gray-400">Applied {timeAgo(app.appliedAt)}</span>
                      </div>
                      <StatusTracker status={app.status} />
                    </div>
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
