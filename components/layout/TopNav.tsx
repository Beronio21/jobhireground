"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import Avatar from "@/components/ui/Avatar";

const regions = ["Bukidnon", "Davao del Norte", "Misamis Oriental", "Misamis Occidental", "Lanao del Norte"];

export default function TopNav() {
  const { user, selectedRegion, setSelectedRegion, toggleNotificationPanel, notificationPanelOpen } = useAppStore();
  const [regionOpen, setRegionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0 z-20 relative">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search jobs, companies or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-xl outline-none focus:border-violet-400 focus:bg-white transition-all placeholder-gray-400"
        />
      </div>

      {/* Region Selector */}
      <div className="relative">
        <button
          onClick={() => setRegionOpen(!regionOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50 transition-all"
        >
          <span className="text-base">📍</span>
          <span>{selectedRegion}, Philippines</span>
          <span className="text-gray-400 text-xs">▼</span>
        </button>
        {regionOpen && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[200px] py-1">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => { setSelectedRegion(r); setRegionOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  r === selectedRegion
                    ? "bg-violet-50 text-violet-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Points */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl">
        <span className="text-amber-500 text-base">⭐</span>
        <span className="font-bold text-sm text-amber-700">{user.points}</span>
      </div>

      {/* Watch Ad */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-violet-300 transition-all text-sm text-gray-600">
        <span className="text-base">🎁</span>
        <span className="text-xs leading-tight text-center">
          <div className="font-medium">Watch Ad</div>
          <div className="text-gray-400">+5 Points</div>
        </span>
      </button>

      {/* Notifications */}
      <button
        onClick={toggleNotificationPanel}
        className={`relative p-2 rounded-xl transition-all ${
          notificationPanelOpen
            ? "bg-violet-100 text-violet-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="text-xl">🔔</span>
        <span className="notification-badge">3</span>
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-all"
        >
          <Avatar name={user.name} size="sm" />
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-gray-900 leading-tight">{user.name}</div>
            <div className="text-xs text-gray-500 leading-tight">Explorer Level {user.level}</div>
          </div>
          <span className="text-gray-400 text-xs">▼</span>
        </button>
        {profileOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px] py-1">
            {["My Profile", "Settings", "Help Center", "Sign Out"].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  item === "Sign Out"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setProfileOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notification Panel */}
      {notificationPanelOpen && (
        <div className="absolute top-full right-4 mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 w-80">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Notifications</h3>
          </div>
          <div className="py-2 max-h-64 overflow-y-auto">
            {[
              { icon: "✅", text: "Your application for Data Engineer was accepted!", time: "2h ago", color: "text-green-600" },
              { icon: "🔔", text: "New quest available: UI/UX Designer at TechNova", time: "5h ago", color: "text-violet-600" },
              { icon: "📋", text: "Your quest application is under review", time: "1d ago", color: "text-blue-600" },
            ].map((n, i) => (
              <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex gap-3">
                <span className={`text-lg ${n.color}`}>{n.icon}</span>
                <div>
                  <p className="text-sm text-gray-800 leading-snug">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100 text-center">
            <button className="text-sm text-violet-600 font-medium hover:text-violet-800">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
