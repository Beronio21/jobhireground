"use client";
import { useAppStore } from "@/lib/store";
import { leaderboard, mockUsers } from "@/lib/mock-data";
import Avatar from "@/components/ui/Avatar";

export default function Leaderboard() {
  const { user } = useAppStore();

  const myRank = leaderboard.find((l) => l.user.id === user.id);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-500 mt-1">Top Explorers in Bukidnon, Philippines</p>
        </div>

        {/* Your rank */}
        {myRank && (
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 rounded-2xl p-4 mb-5 text-white">
            <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Your Ranking</div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black">#{myRank.rank}</div>
              <Avatar name={user.name} size="lg" className="ring-2 ring-white/50" />
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm opacity-80">Level {user.level} · {user.points} pts</div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard list */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {leaderboard.map((entry, i) => {
            const isMe = entry.user.id === user.id;
            const xpPct = Math.round((entry.user.xp / entry.user.maxXp) * 100);
            return (
              <div
                key={entry.user.id}
                className={`flex items-center gap-4 p-4 ${
                  i < leaderboard.length - 1 ? "border-b border-gray-100" : ""
                } ${isMe ? "bg-violet-50" : "hover:bg-gray-50"} transition-colors`}
              >
                {/* Rank */}
                <div className="w-8 text-center">
                  {entry.rank <= 3 ? (
                    <span className="text-xl">{entry.badge}</span>
                  ) : (
                    <span className="font-bold text-gray-400">#{entry.rank}</span>
                  )}
                </div>

                <Avatar name={entry.user.name} size="md" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${isMe ? "text-violet-700" : "text-gray-900"}`}>
                      {entry.user.name}
                    </span>
                    {isMe && <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">You</span>}
                  </div>
                  <div className="text-xs text-gray-400">{entry.user.city} · Level {entry.user.level}</div>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden w-32">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-gray-900">{entry.user.points}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
