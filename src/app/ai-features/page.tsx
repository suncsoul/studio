
import { Header } from "@/components/header";
import { DatePlanner } from "@/components/date-planner";
import { SafetyModeration } from "@/components/safety-moderation";
import { EmpathyMirror } from "@/components/empathy-mirror";
import {
  Bot,
} from "lucide-react";

export default function AiFeaturesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8">
                <Bot className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">googluck AI Suite</h1>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <DatePlanner />
                <EmpathyMirror />
                <div className="lg:col-span-2">
                    <SafetyModeration />
                </div>
            </div>
        </div>
      </main>
       <footer className="py-6 md:px-8 md:py-0 border-t bg-muted/20">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built for human connection. © {new Date().getFullYear()} googluck Inc.
            </p>
        </div>
      </footer>
    </div>
  );
}
