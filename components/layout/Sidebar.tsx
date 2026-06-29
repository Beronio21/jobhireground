"use client";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

export default function Sidebar() {
  const { activeTab, setActiveTab, user, notifications } = useAppStore();

  const xpPercent = Math.round((user.xp / user.maxXp) * 100);
  const unreadNotifications = notifications.filter((notification) => !notification.isRead).length;

  const navItems = [
    { id: "explore",      label: "Explore Map",        icon: "🗺️"  },
    { id: "quests",       label: "Quest Board",        icon: "📋", badge: 12 },
    { id: "applications", label: "My Applications",    icon: "📄"  },
    { id: "saved",        label: "Saved Quests",       icon: "🔖"  },
    { id: "profile",      label: "My Profile",         icon: "👤"  },
    { id: "notifications", label: "Notifications",     icon: "🔔", badge: unreadNotifications || undefined },
    { id: "messages",     label: "Messages",           icon: "✉️"  },
    { id: "companies",    label: "Companies (Guilds)", icon: "🏢" },
    { id: "leaderboard",  label: "Leaderboard",        icon: "🏆"  },
    { id: "settings",     label: "Settings",           icon: "⚙️"  },
  ];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
            🧭
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900 leading-tight">JobHireGround</div>
            <div className="text-xs text-gray-500 leading-tight">Find Jobs. Build Your Future.</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 relative text-left",
                isActive
                  ? "sidebar-item-active shadow-sm mx-1 w-[calc(100%-8px)] rounded-lg"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="flex-1 leading-tight">{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                  isActive ? "bg-white/25 text-white" : "bg-red-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* City Overview */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">City Overview</div>
        <div className="font-semibold text-sm text-gray-900">Valencia City</div>
        <div className="text-xs text-gray-500 mb-2">Bukidnon, Philippines</div>
        <div className="flex gap-3 text-center mb-2">
          <div>
            <div className="font-bold text-sm text-gray-900">2,341</div>
            <div className="text-xs text-gray-500">Explorers</div>
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">127</div>
            <div className="text-xs text-gray-500">Guilds</div>
          </div>
          <div>
            <div className="font-bold text-sm text-gray-900">348</div>
            <div className="text-xs text-gray-500">Active Quests</div>
          </div>
        </div>
        <button className="text-xs text-violet-600 font-medium flex items-center gap-1 hover:text-violet-800 transition-colors">
          View City Details <span>→</span>
        </button>
      </div>

      {/* User Card */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2.5 mb-2">
          <Avatar name={user.name} size="md" />
          <div className="min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">{user.name}</div>
            <div className="text-xs text-gray-500">Explorer Level {user.level}</div>
          </div>
        </div>
        {/* XP Bar */}
        <div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {user.xp} / {user.maxXp} XP
          </div>
        </div>
      </div>
    </aside>
  );
}
