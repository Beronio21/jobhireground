"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { mockJobs, getCompanyById, formatSalary } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const FILTERS = ["All", "Remote", "Hybrid", "On-site"];
const CITIES  = ["All Cities", "Malaybalay City", "Valencia City", "Maramag", "Don Carlos", "Quezon"];

export default function QuestBoard() {
  const { setSelectedJob, setActiveTab } = useAppStore();
  const [filter, setFilter]     = useState("All");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [search, setSearch]     = useState("");
  const [sort, setSort]         = useState<"recent" | "salary" | "title">("recent");

  const filtered = mockJobs
    .filter((j) => filter === "All" || j.type === filter)
    .filter((j) => cityFilter === "All Cities" || j.city === cityFilter)
    .filter((j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      (getCompanyById(j.companyId)?.name ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "salary") return b.salaryMax - a.salaryMax;
      if (sort === "title") return a.title.localeCompare(b.title);
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            📋 Quest Board
          </h1>
          <p className="text-gray-500 mt-1">Discover and apply for available quests across Bukidnon</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search quests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-violet-400"
          />
          <div className="flex gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-violet-400 bg-white"
          >
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-violet-400 bg-white"
          >
            <option value="recent">Most Recent</option>
            <option value="salary">Highest Salary</option>
            <option value="title">A-Z</option>
          </select>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-3">{filtered.length} quests found</div>

        {/* Job Cards */}
        <div className="space-y-3">
          {filtered.map((job) => {
            const company = getCompanyById(job.companyId);
            const typeVariant = job.type === "Remote" ? "remote" : job.type === "Hybrid" ? "hybrid" : "onsite";
            return (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer card-hover"
                onClick={() => {
                  setSelectedJob(job);
                  setActiveTab("explore");
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Company logo */}
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {company?.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900">{job.title}</h3>
                          {job.isEpic && (
                            <span className="epic-badge text-xs">Epic</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">{company?.name}</div>
                      </div>
                      <div className="text-sm font-bold text-gray-900 shrink-0">
                        ₱{(job.salaryMin / 1000).toFixed(0)}k - ₱{(job.salaryMax / 1000).toFixed(0)}k
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        📍 {job.city}
                      </span>
                      <Badge variant={typeVariant}>{job.type}</Badge>
                      <span className="text-xs text-gray-400">{timeAgo(job.postedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🗺️</div>
              <div className="font-medium">No quests found</div>
              <div className="text-sm mt-1">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
