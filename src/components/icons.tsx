"use client";

import { HeartHandshake } from "lucide-react";

export function GoodLuckLogo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <HeartHandshake className="h-7 w-7" />
      <span className="text-xl font-bold text-foreground">GoodLuck</span>
    </div>
  );
}
