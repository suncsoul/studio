import { Header } from "@/components/header";
import { MatchCard } from "@/components/match-card";
import { WhosDownCard } from "@/components/whos-down-card";
import { DatePlanner } from "@/components/date-planner";
import { SafetyModeration } from "@/components/safety-moderation";
import { EmpathyMirror } from "@/components/empathy-mirror";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  Bot,
} from "lucide-react";

const matches = [
  { name: "Seraphina", age: 28, location: "Venice, Italy", imageUrl: "https://placehold.co/400x600/F5E0C3/2C2C2C.png", mbti: "INFJ", loveLanguage: "Quality Time", humorStyle: "Witty", isVerified: true },
  { name: "Julian", age: 31, location: "Kyoto, Japan", imageUrl: "https://placehold.co/400x600/2C2C2C/FAFAFA.png", mbti: "ENTP", loveLanguage: "Phys. Touch", humorStyle: "Sarcastic", isVerified: true },
  { name: "Chloe", age: 26, location: "Austin, Texas", imageUrl: "https://placehold.co/400x600/FF6F61/FAFAFA.png", mbti: "ESFP", loveLanguage: "Words of Affirm.", humorStyle: "Goofy", isVerified: false },
  { name: "Leo", age: 29, location: "Berlin, Germany", imageUrl: "https://placehold.co/400x600/009688/FAFAFA.png", mbti: "ISTP", loveLanguage: "Acts of Service", humorStyle: "Dry", isVerified: true },
];

const whosDownItems = [
  { userName: "Marco", userAvatarUrl: "https://placehold.co/100x100/673AB7/FAFAFA.png", activity: "Coffee in 30 mins?", time: "2m ago", bondType: "activity" as const },
  { userName: "Anya", userAvatarUrl: "https://placehold.co/100x100/42A5F5/FAFAFA.png", activity: "Indie concert tonight, need a +1!", time: "1h ago", bondType: "event" as const },
  { userName: "Kenji", userAvatarUrl: "https://placehold.co/100x100/FFC107/2C2C2C.png", activity: "Weekend trip to the coast, anyone?", time: "5h ago", bondType: "travel" as const },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
              <TabsTrigger value="matches"><Heart className="mr-2 h-4 w-4"/>Find Matches</TabsTrigger>
              <TabsTrigger value="whos-down"><Users className="mr-2 h-4 w-4" />Who's Down?</TabsTrigger>
              <TabsTrigger value="ai-tools"><Bot className="mr-2 h-4 w-4" />AI Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {matches.map((match, index) => (
                        <MatchCard key={index} {...match} />
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="whos-down" className="mt-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    {whosDownItems.map((item, index) => (
                        <WhosDownCard key={index} {...item} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="ai-tools" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                  <DatePlanner />
                  <SafetyModeration />
                </div>
                <div>
                   <EmpathyMirror />
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built for human connection. © {new Date().getFullYear()} GoodLuck Inc.
            </p>
        </div>
      </footer>
    </div>
  );
}
