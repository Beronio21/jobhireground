"use client";
import { useAppStore } from "@/lib/store";
import { mockApplications, getJobById, getCompanyById } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

export default function MyProfile() {
  const { user, applications } = useAppStore();

  const xpPercent = Math.round((user.xp / user.maxXp) * 100);
  const myApps = applications.filter((a) => a.userId === user.id);

  const skills = ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "CSS", "Tailwind CSS", "Git"];
  const achievements = [
    { icon: "⚔️", label: "First Quest",    desc: "Applied to your first job",   earned: true  },
    { icon: "🗺️", label: "Explorer",       desc: "Explored the full map",        earned: true  },
    { icon: "🏆", label: "Top Applicant",  desc: "Applied to 5+ quests",         earned: false },
    { icon: "⭐", label: "Points Master",  desc: "Collected 500 points",          earned: false },
    { icon: "🔖", label: "Quest Saver",    desc: "Saved 10 quests",              earned: false },
    { icon: "🎯", label: "Sharpshooter",   desc: "Got accepted on first apply",  earned: user.applications?.some?.((a: { status: string }) => a.status === "accepted") ?? true },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="ring-4 ring-white rounded-full">
                <Avatar name={user.name} size="xl" />
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <div className="text-sm text-gray-500">{user.city}, Bukidnon</div>
              </div>
              <div className="ml-auto">
                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Level",        value: user.level,         icon: "⚡" },
                { label: "Points",       value: user.points,        icon: "⭐" },
                { label: "Applications", value: myApps.length,      icon: "📋" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div className="font-bold text-xl text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* XP Progress */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Level {user.level} Explorer</span>
                <span>{user.xp} / {user.maxXp} XP</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-700"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{user.maxXp - user.xp} XP until Level {user.level + 1}</div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-violet-50 text-violet-700 text-sm font-medium rounded-full border border-violet-200">
                {skill}
              </span>
            ))}
            <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-violet-300 hover:text-violet-600 transition-colors">
              + Add Skill
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className={`p-3 rounded-xl border text-center transition-all ${
                  a.earned
                    ? "bg-violet-50 border-violet-200"
                    : "bg-gray-50 border-gray-200 opacity-50 grayscale"
                }`}
              >
                <div className="text-2xl mb-1">{a.icon}</div>
                <div className={`text-xs font-bold ${a.earned ? "text-violet-700" : "text-gray-500"}`}>{a.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-tight">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3">Recent Applications</h3>
          {myApps.length === 0 ? (
            <p className="text-sm text-gray-400">No applications yet.</p>
          ) : (
            <div className="space-y-2">
              {myApps.slice(0, 4).map((app) => {
                const job = getJobById(app.jobId);
                const company = job ? getCompanyById(job.companyId) : null;
                return (
                  <div key={app.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                      {company?.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{job?.title}</div>
                      <div className="text-xs text-gray-400">{company?.name}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      app.status === "accepted" ? "bg-green-100 text-green-700" :
                      app.status === "reviewed" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
