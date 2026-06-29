"use client";
import { useState } from "react";

export default function SettingsView() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [jobUpdates, setJobUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMap, setCompactMap] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            ⚙️ Settings
          </h1>
          <p className="text-gray-500 mt-1">Manage your experience and notification preferences</p>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Email alerts",
              desc: "Receive important application and account updates by email.",
              checked: emailAlerts,
              onChange: setEmailAlerts,
            },
            {
              title: "New quest alerts",
              desc: "Show notifications for new jobs that match your profile.",
              checked: jobUpdates,
              onChange: setJobUpdates,
            },
            {
              title: "Compact interface",
              desc: "Use denser spacing in lists and panels.",
              checked: compactMap,
              onChange: setCompactMap,
            },
            {
              title: "Dark mode preview",
              desc: "Mock-only toggle reserved for future theme support.",
              checked: darkMode,
              onChange: setDarkMode,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
              </div>
              <button
                onClick={() => item.onChange(!item.checked)}
                className={`relative w-12 h-7 rounded-full transition-colors ${item.checked ? "bg-violet-600" : "bg-gray-300"}`}
                aria-pressed={item.checked}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${item.checked ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}