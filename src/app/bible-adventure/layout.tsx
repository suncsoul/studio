import type { Metadata } from "next";
import { KidsProgressProvider } from "@/contexts/kids-progress";

export const metadata: Metadata = {
  title: "Bible Adventure | Kids Mode",
  description: "Fun, interactive Bible learning for kids with rewards and badges.",
};

export default function BibleAdventureLayout({ children }: { children: React.ReactNode }) {
  return (
    <KidsProgressProvider>
      <div className="min-h-screen bg-gradient-to-b from-ivory-white to-white">
        {children}
      </div>
    </KidsProgressProvider>
  );
}

