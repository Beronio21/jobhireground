"use client";
import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { timeAgo } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  "Application Update": "bg-violet-50 text-violet-700 border-violet-200",
  "New Job": "bg-blue-50 text-blue-700 border-blue-200",
  "Company Message": "bg-emerald-50 text-emerald-700 border-emerald-200",
  System: "bg-gray-50 text-gray-700 border-gray-200",
  Reward: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function NotificationsView() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();

  const unreadCount = useMemo(() => notifications.filter((notification) => !notification.isRead).length, [notifications]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              🔔 Notifications
            </h1>
            <p className="text-gray-500 mt-1">Track application updates, new jobs, and system messages</p>
          </div>
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors"
          >
            Mark all as read
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Total</div>
            <div className="text-2xl font-black text-gray-900 mt-1">{notifications.length}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Unread</div>
            <div className="text-2xl font-black text-violet-600 mt-1">{unreadCount}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Updates</div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {notifications.filter((notification) => notification.type === "Application Update").length}
            </div>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-3">🔔</div>
            <div className="font-semibold text-gray-700">No notifications yet</div>
            <div className="text-sm text-gray-400 mt-1">Updates will appear here as you explore quests.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => markNotificationRead(notification.id)}
                className={`w-full text-left bg-white border rounded-2xl p-4 transition-all hover:shadow-md card-hover ${
                  notification.isRead ? "border-gray-200" : "border-violet-200 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${typeStyles[notification.type]}`}>
                    {notification.type}
                  </div>
                  {!notification.isRead && <div className="w-2.5 h-2.5 rounded-full bg-violet-500 mt-2" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-gray-900">{notification.title}</div>
                        <div className="text-sm text-gray-500 mt-1 leading-relaxed">{notification.message}</div>
                      </div>
                      <div className="text-xs text-gray-400 shrink-0">{timeAgo(notification.createdAt)}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}