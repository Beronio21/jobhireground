import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "remote" | "hybrid" | "onsite" | "epic" | "outline";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  remote: "bg-purple-100 text-purple-700",
  hybrid: "bg-amber-100 text-amber-700",
  onsite: "bg-blue-100 text-blue-700",
  epic: "bg-gradient-to-r from-violet-600 to-purple-500 text-white",
  outline: "border border-gray-300 text-gray-600 bg-white",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
