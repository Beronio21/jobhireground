"use client";
import { getInitials, getAvatarColor } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export default function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  const colorClass = getAvatarColor(name);
  const sizeClass = sizeMap[size];
  return (
    <div
      className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
