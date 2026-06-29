"use client";
import { useAppStore } from "@/lib/store";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import InteractiveMap from "@/components/map/InteractiveMap";
import ExploreByType from "@/components/map/ExploreByType";
import QuestDetailsPanel from "@/components/map/QuestDetailsPanel";
import QuestBoard from "@/components/views/QuestBoard";
import MyApplications from "@/components/views/MyApplications";
import SavedQuests from "@/components/views/SavedQuests";
import MyProfile from "@/components/views/MyProfile";
import CompaniesView from "@/components/views/CompaniesView";
import Leaderboard from "@/components/views/Leaderboard";
import NotificationsView from "@/components/views/NotificationsView";
import SettingsView from "@/components/views/SettingsView";

function MapView() {
  const { selectedJob } = useAppStore();
  return (
    <div className="flex flex-1 min-h-0">
      {/* Map + bottom strip */}
      <div className="flex flex-col flex-1 min-w-0">
        <InteractiveMap />
        <ExploreByType />
      </div>
      {/* Quest details panel */}
      {selectedJob && <QuestDetailsPanel />}
    </div>
  );
}

function MessagesView() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-5xl mb-3">✉️</div>
        <div className="font-bold text-gray-700 text-xl">Messages</div>
        <div className="text-gray-400 mt-2">Chat system coming soon!</div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { activeTab } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case "explore":      return <MapView />;
      case "quests":       return <QuestBoard />;
      case "applications": return <MyApplications />;
      case "saved":        return <SavedQuests />;
      case "profile":      return <MyProfile />;
      case "messages":     return <MessagesView />;
      case "notifications": return <NotificationsView />;
      case "companies":    return <CompaniesView />;
      case "leaderboard":  return <Leaderboard />;
      case "settings":     return <SettingsView />;
      default:             return <MapView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex flex-1 min-h-0 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
