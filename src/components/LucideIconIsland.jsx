import React from "react";
import * as icons from "lucide-react";

export default function LucideIconIsland({ name, size = 32, strokeWidth = 2 }) {
  const Icon = icons[name.charAt(0).toUpperCase() + name.slice(1)] || icons["Circle"];
  return <Icon size={size} strokeWidth={strokeWidth} />;
}
