export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string): string {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function getJobTypeColor(type: string): string {
  switch (type) {
    case "Remote": return "bg-purple-100 text-purple-700";
    case "Hybrid": return "bg-amber-100 text-amber-700";
    case "On-site": return "bg-blue-100 text-blue-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

export function getJobTypeMarkerColor(type: string): string {
  switch (type) {
    case "Remote": return "#8b5cf6";
    case "Hybrid": return "#f59e0b";
    case "On-site": return "#3b82f6";
    default: return "#6b7280";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "reviewed": return "bg-blue-100 text-blue-700";
    case "accepted": return "bg-green-100 text-green-700";
    case "rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}
