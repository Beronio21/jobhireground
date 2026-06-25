"use client";
import { useState } from "react";
import { mockCompanies, getCompanyJobs } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

export default function CompaniesView() {
  const { setSelectedJob, setActiveTab } = useAppStore();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = mockCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCompany = selected ? mockCompanies.find((c) => c.id === selected) : null;
  const companyJobs = selected ? getCompanyJobs(selected) : [];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            🏢 Companies (Guilds)
          </h1>
          <p className="text-gray-500 mt-1">Discover companies hiring in Bukidnon</p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search companies, industries or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl outline-none focus:border-violet-400 bg-white shadow-sm"
          />
        </div>

        {/* Detail panel */}
        {selectedCompany && (
          <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 mb-5 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xl">
                {selectedCompany.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-gray-900">{selectedCompany.name}</h2>
                    <div className="text-sm text-gray-500">{selectedCompany.industry} · {selectedCompany.size}</div>
                    <div className="text-sm text-gray-500">📍 {selectedCompany.city}, Bukidnon</div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selectedCompany.description}</p>

                {companyJobs.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">Open Quests ({companyJobs.length})</h3>
                    <div className="space-y-2">
                      {companyJobs.map((job) => (
                        <button
                          key={job.id}
                          className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-violet-50 hover:border-violet-200 border border-transparent transition-all"
                          onClick={() => { setSelectedJob(job); setActiveTab("explore"); }}
                        >
                          <span className="text-violet-500">💼</span>
                          <span className="font-medium text-sm text-gray-800">{job.title}</span>
                          <span className="ml-auto text-xs text-gray-400">{job.type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((company) => {
            const jobs = getCompanyJobs(company.id);
            const isSelected = selected === company.id;
            return (
              <button
                key={company.id}
                onClick={() => setSelected(isSelected ? null : company.id)}
                className={`text-left bg-white border-2 rounded-2xl p-4 transition-all hover:shadow-md card-hover ${
                  isSelected ? "border-violet-400 shadow-md" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                    {company.logo}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 truncate">{company.name}</div>
                    <div className="text-xs text-gray-500 truncate">{company.industry}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>📍 {company.city}</span>
                  <span className="font-medium text-violet-600">{jobs.length} quests</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">{company.size}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
