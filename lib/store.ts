import { create } from "zustand";
import { Job, Application, Notification, mockApplications, mockNotifications, savedQuestIds, currentUser, User, cities } from "./mock-data";

interface AppState {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Selected Job (quest details panel)
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;

  // Applications
  applications: Application[];
  applyToJob: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;

  // Saved quests
  savedQuests: string[];
  toggleSaveQuest: (jobId: string) => void;
  isQuestSaved: (jobId: string) => boolean;

  // Map region
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;

  // Map city
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Filter
  activeJobTypeFilter: string;
  setActiveJobTypeFilter: (type: string) => void;

  // User
  user: User;
  addPoints: (pts: number) => void;

  // Notification panel
  notificationPanelOpen: boolean;
  toggleNotificationPanel: () => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Map zoom
  mapZoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: "explore",
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),

  applications: [...mockApplications],
  applyToJob: (jobId) => {
    const { applications, hasApplied, user, addPoints } = get();
    if (hasApplied(jobId)) return;
    const newApp: Application = {
      id: `app-${Date.now()}`,
      userId: user.id,
      jobId,
      status: "pending",
      appliedAt: new Date().toISOString().split("T")[0],
    };
    set({ applications: [...applications, newApp] });
    addPoints(10);
  },
  hasApplied: (jobId) => {
    return get().applications.some((a) => a.userId === get().user.id && a.jobId === jobId);
  },

  savedQuests: [...savedQuestIds],
  toggleSaveQuest: (jobId) => {
    const { savedQuests, addPoints } = get();
    if (savedQuests.includes(jobId)) {
      set({ savedQuests: savedQuests.filter((id) => id !== jobId) });
    } else {
      set({ savedQuests: [...savedQuests, jobId] });
      addPoints(5);
    }
  },
  isQuestSaved: (jobId) => get().savedQuests.includes(jobId),

  selectedRegion: "Bukidnon",
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  selectedCity: cities[1].name,
  setSelectedCity: (city) => set({ selectedCity: city }),

  activeJobTypeFilter: "All",
  setActiveJobTypeFilter: (type) => set({ activeJobTypeFilter: type }),

  user: { ...currentUser },
  addPoints: (pts) => {
    const { user } = get();
    const newXp = Math.min(user.xp + pts, user.maxXp);
    const levelUp = newXp >= user.maxXp;
    set({
      user: {
        ...user,
        points: user.points + pts,
        xp: levelUp ? newXp - user.maxXp : newXp,
        level: levelUp ? user.level + 1 : user.level,
      },
    });
  },

  notificationPanelOpen: false,
  toggleNotificationPanel: () =>
    set((state) => ({ notificationPanelOpen: !state.notificationPanelOpen })),

  notifications: [...mockNotifications],
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      ),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    })),

  mapZoom: 1,
  zoomIn: () => set((state) => ({ mapZoom: Math.min(state.mapZoom + 0.15, 1.8) })),
  zoomOut: () => set((state) => ({ mapZoom: Math.max(state.mapZoom - 0.15, 0.6) })),
}));
