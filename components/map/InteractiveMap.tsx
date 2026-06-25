"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { mockJobs, mockCompanies, cities, getJobsByCity } from "@/lib/mock-data";
import { getJobTypeMarkerColor } from "@/lib/utils";
import MapLegend from "./MapLegend";

// Decorative tree positions
const trees = [
  { x: 5, y: 5 }, { x: 10, y: 8 }, { x: 8, y: 20 }, { x: 3, y: 35 },
  { x: 15, y: 55 }, { x: 5, y: 70 }, { x: 12, y: 80 }, { x: 25, y: 88 },
  { x: 35, y: 92 }, { x: 50, y: 88 }, { x: 60, y: 92 }, { x: 75, y: 85 },
  { x: 85, y: 78 }, { x: 92, y: 65 }, { x: 88, y: 45 }, { x: 95, y: 30 },
  { x: 90, y: 15 }, { x: 80, y: 5 }, { x: 65, y: 8 }, { x: 50, y: 5 },
  { x: 30, y: 75 }, { x: 22, y: 68 }, { x: 57, y: 45 }, { x: 82, y: 40 },
];

// User avatar positions on map
const mapUsers = [
  { name: "Maria Santos", x: 44, y: 22, color: "#8b5cf6" },
  { name: "Ana Reyes",    x: 62, y: 50, color: "#10b981" },
  { name: "Juan DC",      x: 20, y: 48, color: "#3b82f6" },
];

// Job markers on the map (sampled)
const jobMarkers = [
  { jobId: "job-1", x: 71, y: 35, type: "Hybrid",  count: 5  },
  { jobId: "job-2", x: 66, y: 25, type: "Remote",  count: 8  },
  { jobId: "job-3", x: 39, y: 10, type: "On-site", count: 3  },
  { jobId: "job-4", x: 22, y: 44, type: "Hybrid",  count: 10 },
  { jobId: "job-5", x: 48, y: 66, type: "On-site", count: 4  },
  { jobId: "job-8", x: 74, y: 32, type: "On-site", count: 7  },
  { jobId: "job-9", x: 44, y: 14, type: "Remote",  count: 3  },
];

// Company building positions
const buildingPositions = [
  { companyId: "comp-1", x: 68, y: 30, cityName: "Valencia City" },
  { companyId: "comp-2", x: 40, y: 14, cityName: "Malaybalay City" },
  { companyId: "comp-3", x: 20, y: 42, cityName: "Maramag" },
  { companyId: "comp-4", x: 47, y: 60, cityName: "Don Carlos" },
  { companyId: "comp-5", x: 72, y: 58, cityName: "Quezon" },
];

interface MarkerProps {
  x: number;
  y: number;
  color: string;
  count: number;
  onClick?: () => void;
}

function QuestMarker({ x, y, color, count, onClick }: MarkerProps) {
  return (
    <button
      onClick={onClick}
      className="absolute quest-marker hover:z-30 focus:outline-none group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)" }}
    >
      <div className="relative">
        {/* Count badge */}
        <div
          className="absolute -top-2 -right-2 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white z-10"
          style={{ background: color }}
        >
          {count}
        </div>
        {/* Marker pin */}
        <div
          className="w-9 h-9 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-sm"
          style={{ background: color }}
        >
          💼
        </div>
        {/* Pin tail */}
        <div
          className="w-2 h-3 mx-auto rounded-b-full -mt-1"
          style={{ background: color }}
        />
      </div>
    </button>
  );
}

function BuildingMarker({ x, y, logo, name, onClick }: { x: number; y: number; logo: string; name: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="absolute map-building focus:outline-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-20 pointer-events-none">
          {name}
        </div>
      )}
      {/* Building SVG icon */}
      <div className="w-12 h-14 flex flex-col items-center">
        <div className="w-11 h-11 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg border-2 border-blue-500 shadow-md flex items-center justify-center relative overflow-hidden">
          {/* Windows */}
          <div className="grid grid-cols-3 gap-0.5 p-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-300 rounded-sm opacity-80" />
            ))}
          </div>
          {/* Logo overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-0.5">
            <span className="text-xs font-bold text-white/90 bg-blue-700/60 px-1 rounded text-[9px]">{logo}</span>
          </div>
        </div>
        {/* Building base */}
        <div className="w-9 h-1.5 bg-blue-600 rounded-sm shadow" />
        {/* Tiny green indicator */}
        <div className="w-2 h-2 bg-emerald-400 rounded-full border border-white mt-0.5 shadow" />
      </div>
    </button>
  );
}

function UserMarker({ x, y, name, color }: { x: number; y: number; name: string; color: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <div
      className="user-avatar-marker absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        background: color,
      }}
    >
      <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold">
        {initials}
      </div>
    </div>
  );
}

function CityLabel({ city }: { city: typeof cities[0] }) {
  const jobs = getJobsByCity(city.name);
  const jobCount = city.jobCount;
  const compCount = city.companyCount;

  return (
    <div
      className="city-label"
      style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -130%)" }}
    >
      <div className="text-[11px] font-black tracking-wider mb-0.5">{city.name.toUpperCase()}</div>
      <div className="text-[10px] text-gray-300 font-normal">{jobCount} Jobs • {compCount} Companies</div>
    </div>
  );
}

export default function InteractiveMap() {
  const { selectedJob, setSelectedJob, mapZoom, zoomIn, zoomOut, activeJobTypeFilter, setActiveJobTypeFilter } = useAppStore();

  const filteredMarkers = jobMarkers.filter((m) => {
    if (activeJobTypeFilter === "All") return true;
    return m.type === activeJobTypeFilter;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-gray-100">
      {/* Map Controls Bar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        {/* Region Dropdown */}
        <div className="bg-white rounded-xl border border-gray-200 shadow px-3 py-1.5 text-sm font-medium text-gray-700 flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Region</span>
          <span className="font-bold text-gray-900">Bukidnon</span>
          <span className="text-gray-400 text-xs">▼</span>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={zoomIn}
          className="w-8 h-8 bg-white border border-gray-200 rounded-lg shadow flex items-center justify-center text-gray-700 font-bold hover:bg-violet-50 hover:border-violet-300 transition-all text-lg"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="w-8 h-8 bg-white border border-gray-200 rounded-lg shadow flex items-center justify-center text-gray-700 font-bold hover:bg-violet-50 hover:border-violet-300 transition-all text-lg"
        >
          −
        </button>
      </div>

      {/* Map Canvas */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="map-container w-full h-full"
          style={{
            transform: `scale(${mapZoom})`,
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Decorative trees */}
          {trees.map((t, i) => (
            <div
              key={i}
              className="map-tree select-none"
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
              🌲
            </div>
          ))}

          {/* Roads */}
          {/* Horizontal roads */}
          <div className="map-road" style={{ left: "10%", top: "32%", width: "80%", height: "8px", transform: "rotate(-3deg)" }} />
          <div className="map-road" style={{ left: "20%", top: "62%", width: "60%", height: "8px", transform: "rotate(2deg)" }} />
          <div className="map-road" style={{ left: "35%", top: "22%", width: "45%", height: "7px", transform: "rotate(-1deg)" }} />

          {/* Vertical/diagonal roads */}
          <div className="map-road" style={{ left: "42%", top: "10%", width: "7px", height: "55%", transform: "rotate(5deg)" }} />
          <div className="map-road" style={{ left: "68%", top: "20%", width: "7px", height: "48%", transform: "rotate(-3deg)" }} />

          {/* River */}
          <div
            className="map-river"
            style={{
              left: "50%",
              top: "8%",
              width: "14px",
              height: "75%",
              transform: "rotate(8deg)",
              transformOrigin: "top center",
            }}
          />
          {/* River tributary */}
          <div
            className="map-river"
            style={{
              left: "35%",
              top: "45%",
              width: "12px",
              height: "35%",
              transform: "rotate(-15deg)",
              transformOrigin: "top center",
            }}
          />

          {/* Lighthouse / landmark */}
          <div
            className="absolute text-2xl select-none"
            style={{ left: "55%", top: "78%", transform: "translate(-50%, -50%)" }}
          >
            🏠
          </div>

          {/* Sailboat on water */}
          <div
            className="absolute text-xl select-none"
            style={{ left: "60%", top: "85%", transform: "translate(-50%, -50%)" }}
          >
            ⛵
          </div>

          {/* City Labels */}
          {cities.map((city) => (
            <CityLabel key={city.id} city={city} />
          ))}

          {/* Buildings */}
          {buildingPositions.map((bp) => {
            const company = mockCompanies.find((c) => c.id === bp.companyId);
            if (!company) return null;
            return (
              <BuildingMarker
                key={bp.companyId}
                x={bp.x}
                y={bp.y}
                logo={company.logo}
                name={company.name}
                onClick={() => {
                  const job = mockJobs.find((j) => j.companyId === bp.companyId);
                  if (job) setSelectedJob(job);
                }}
              />
            );
          })}

          {/* Job Quest Markers */}
          {filteredMarkers.map((marker) => {
            const job = mockJobs.find((j) => j.id === marker.jobId);
            return (
              <QuestMarker
                key={marker.jobId}
                x={marker.x}
                y={marker.y}
                color={getJobTypeMarkerColor(marker.type)}
                count={marker.count}
                onClick={() => job && setSelectedJob(job)}
              />
            );
          })}

          {/* User Avatars */}
          {mapUsers.map((u) => (
            <UserMarker key={u.name} x={u.x} y={u.y} name={u.name} color={u.color} />
          ))}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center gap-1 px-2 py-1.5">
          {[
            { icon: "🎯", label: "My Location" },
            { icon: "🔧", label: "Filter" },
            { icon: "🔍", label: "Zoom In",  action: zoomIn },
            { icon: "🔎", label: "Zoom Out", action: zoomOut },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex flex-col items-center px-4 py-1.5 text-gray-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-all gap-0.5"
            >
              <span className="text-base">{btn.icon}</span>
              <span className="text-xs font-medium">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-3 right-3 z-10">
        <MapLegend />
      </div>
    </div>
  );
}
