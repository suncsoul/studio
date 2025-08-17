
import { Header } from "@/components/header";
import { MatchCard } from "@/components/match-card";
import { WhosDownCard } from "@/components/whos-down-card";
import { HireCompanionCard } from "@/components/hire-companion-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  Briefcase,
  Bot
} from "lucide-react";
import Link from "next/link";

const matches = [
  { name: "Seraphina", age: 28, location: "Venice, Italy", imageUrl: "https://placehold.co/400x600/F5E0C3/2C2C2C.png", mbti: "INFJ", loveLanguage: "Quality Time", humorStyle: "Witty", isVerified: true },
  { name: "Julian", age: 31, location: "Kyoto, Japan", imageUrl: "https://placehold.co/400x600/2C2C2C/FAFAFA.png", mbti: "ENTP", loveLanguage: "Phys. Touch", humorStyle: "Sarcastic", isVerified: true },
  { name: "Chloe", age: 26, location: "Austin, Texas", imageUrl: "https://placehold.co/400x600/FF6F61/FAFAFA.png", mbti: "ESFP", loveLanguage: "Words of Affirm.", humorStyle: "Goofy", isVerified: false },
  { name: "Leo", age: 29, location: "Berlin, Germany", imageUrl: "https://placehold.co/400x600/009688/FAFAFA.png", mbti: "ISTP", loveLanguage: "Acts of Service", humorStyle: "Dry", isVerified: true },
  { name: "Elena", age: 24, location: "Barcelona, Spain", imageUrl: "https://placehold.co/400x600/BDBDBD/2C2C2C.png", mbti: "ENFP", loveLanguage: "Gifts", humorStyle: "Playful", isVerified: true },
  { name: "Marcus", age: 33, location: "New York, USA", imageUrl: "https://placehold.co/400x600/795548/FAFAFA.png", mbti: "ESTJ", loveLanguage: "Quality Time", humorStyle: "Observational", isVerified: false },
  { name: "Aisha", age: 27, location: "Dubai, UAE", imageUrl: "https://placehold.co/400x600/FFC107/2C2C2C.png", mbti: "ISFJ", loveLanguage: "Acts of Service", humorStyle: "Kind", isVerified: true },
  { name: "Liam", age: 30, location: "Sydney, Australia", imageUrl: "https://placehold.co/400x600/4CAF50/FAFAFA.png", mbti: "INFP", loveLanguage: "Words of Affirm.", humorStyle: "Quirky", isVerified: true },
  { name: "Mei", age: 25, location: "Shanghai, China", imageUrl: "https://placehold.co/400x600/E91E63/FAFAFA.png", mbti: "INTJ", loveLanguage: "Phys. Touch", humorStyle: "Intellectual", isVerified: false },
  { name: "Javier", age: 32, location: "Mexico City, Mexico", imageUrl: "https://placehold.co/400x600/3F51B5/FAFAFA.png", mbti: "ESFJ", loveLanguage: "Gifts", humorStyle: "Charismatic", isVerified: true },
];

const whosDownItems = [
  { userName: "Marco", userAvatarUrl: "https://placehold.co/100x100/9D00FF/FAFAFA.png", activity: "Coffee in 30 mins?", time: "2m ago", bondType: "activity" as const, vibe: "Casual Chat", distance: "0.5 miles away" },
  { userName: "Anya", userAvatarUrl: "https://placehold.co/100x100/00F0FF/2C2C2C.png", activity: "Indie concert tonight, need a +1!", time: "1h ago", bondType: "event" as const, vibe: "Adventure Buddy", distance: "2 miles away" },
  { userName: "Kenji", userAvatarUrl: "https://placehold.co/100x100/FFEE00/2C2C2C.png", activity: "Weekend trip to the coast, anyone?", time: "5h ago", bondType: "travel" as const, vibe: "Explorer", distance: "25 miles away" },
  { userName: "Sofia", userAvatarUrl: "https://placehold.co/100x100/FF6347/FFFFFF.png", activity: "Morning yoga in the park", time: "15m ago", bondType: "activity" as const, vibe: "Wellness Seeker", distance: "1 mile away" },
  { userName: "Ben", userAvatarUrl: "https://placehold.co/100x100/4682B4/FFFFFF.png", activity: "Tech meetup downtown", time: "3h ago", bondType: "event" as const, vibe: "Networking", distance: "5 miles away" },
  { userName: "Lila", userAvatarUrl: "https://placehold.co/100x100/32CD32/2C2C2C.png", activity: "Volunteering at the animal shelter", time: "8h ago", bondType: "activity" as const, vibe: "Kindred Spirit", distance: "3 miles away" },
  { userName: "Omar", userAvatarUrl: "https://placehold.co/100x100/FFD700/2C2C2C.png", activity: "Road trip to the mountains next weekend", time: "1d ago", bondType: "travel" as const, vibe: "Thrill Seeker", distance: "50 miles away" },
  { userName: "Grace", userAvatarUrl: "https://placehold.co/100x100/BA55D3/FFFFFF.png", activity: "Book club meeting this evening", time: "45m ago", bondType: "event" as const, vibe: "Intellectual", distance: "1.5 miles away" },
  { userName: "Alex", userAvatarUrl: "https://placehold.co/100x100/6A5ACD/FFFFFF.png", activity: "Late-night board games?", time: "5m ago", bondType: "activity" as const, vibe: "Gamer", distance: "0.2 miles away" },
  { userName: "Fatima", userAvatarUrl: "https://placehold.co/100x100/20B2AA/FFFFFF.png", activity: "Salsa dancing class", time: "2h ago", bondType: "activity" as const, vibe: "Dancer", distance: "4 miles away" },
  { userName: "Noah", userAvatarUrl: "https://placehold.co/100x100/778899/FFFFFF.png", activity: "Attending a film festival", time: "6h ago", bondType: "event" as const, vibe: "Cinephile", distance: "10 miles away" },
  { userName: "Priya", userAvatarUrl: "https://placehold.co/100x100/DC143C/FFFFFF.png", activity: "Spontaneous trip to Paris next month", time: "3d ago", bondType: "travel" as const, vibe: "Globetrotter", distance: "N/A" },
  { userName: "Daniel", userAvatarUrl: "https://placehold.co/100x100/00FFFF/2C2C2C.png", activity: "Co-working at a cafe", time: "20m ago", bondType: "activity" as const, vibe: "Productive Pal", distance: "0.8 miles away" },
  { userName: "Eva", userAvatarUrl: "https://placehold.co/100x100/FF4500/FFFFFF.png", activity: "Food truck festival this weekend", time: "10h ago", bondType: "event" as const, vibe: "Foodie", distance: "6 miles away" },
];

const hireCompanions = [
    { providerName: "Isabelle", providerAvatarUrl: "https://placehold.co/100x100/FF2A6D/FFFFFF.png", service: "Active Listener & Virtual Chat", rate: 35, isVerified: true, isBackgroundChecked: true, rating: 4.9 },
    { providerName: "David", providerAvatarUrl: "https://placehold.co/100x100/00FF87/2C2C2C.png", service: "Fitness Buddy & Motivator", rate: 50, isVerified: true, isBackgroundChecked: true, rating: 4.8 },
    { providerName: "Sophia", providerAvatarUrl: "https://placehold.co/100x100/00F0FF/2C2C2C.png", service: "Event +1 & Social Navigator", rate: 60, isVerified: true, isBackgroundChecked: false, rating: 4.95 },
    { providerName: "Ethan", providerAvatarUrl: "https://placehold.co/100x100/FFD700/2C2C2C.png", service: "Career Coach & Mock Interviewer", rate: 75, isVerified: true, isBackgroundChecked: true, rating: 4.98 },
    { providerName: "Olivia", providerAvatarUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF.png", service: "Museum & Art Gallery Guide", rate: 45, isVerified: true, isBackgroundChecked: true, rating: 4.85 },
    { providerName: "Michael", providerAvatarUrl: "https://placehold.co/100x100/5F9EA0/FFFFFF.png", service: "Deep Conversations & Philosophy", rate: 40, isVerified: true, isBackgroundChecked: false, rating: 4.92 },
    { providerName: "Ava", providerAvatarUrl: "https://placehold.co/100x100/FF7F50/2C2C2C.png", service: "Personal Shopper & Style Consultant", rate: 65, isVerified: true, isBackgroundChecked: false, rating: 4.88 },
    { providerName: "William", providerAvatarUrl: "https://placehold.co/100x100/6495ED/FFFFFF.png", service: "Travel Planner & Itinerary Builder", rate: 55, isVerified: true, isBackgroundChecked: true, rating: 4.96 },
    { providerName: "Mia", providerAvatarUrl: "https://placehold.co/100x100/DC143C/FFFFFF.png", service: "Gourmet Cooking Companion", rate: 70, isVerified: false, isBackgroundChecked: false, rating: 4.82 },
    { providerName: "James", providerAvatarUrl: "https://placehold.co/100x100/008B8B/FFFFFF.png", service: "Language Exchange Partner", rate: 30, isVerified: true, isBackgroundChecked: false, rating: 4.91 },
    { providerName: "Charlotte", providerAvatarUrl: "https://placehold.co/100x100/B8860B/FFFFFF.png", service: "Mindfulness & Meditation Guide", rate: 40, isVerified: true, isBackgroundChecked: true, rating: 4.97 },
    { providerName: "Benjamin", providerAvatarUrl: "https://placehold.co/100x100/483D8B/FFFFFF.png", service: "City Tour Guide", rate: 50, isVerified: true, isBackgroundChecked: true, rating: 4.89 },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="matches" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full grid-cols-4 md:w-[800px]">
                <TabsTrigger value="matches"><Heart className="mr-2 h-4 w-4"/>Find Matches</TabsTrigger>
                <TabsTrigger value="whos-down"><Users className="mr-2 h-4 w-4" />Companion Mode</TabsTrigger>
                <TabsTrigger value="hire-companion"><Briefcase className="mr-2 h-4 w-4" />Hire a Companion</TabsTrigger>
                <TabsTrigger value="ai-features" asChild>
                    <Link href="/ai-features"><Bot className="mr-2 h-4 w-4"/>AI Features</Link>
                </TabsTrigger>
              </TabsList>
            </div>
            
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

            <TabsContent value="hire-companion" className="mt-6">
                 <div className="max-w-3xl mx-auto space-y-4">
                    {hireCompanions.map((item, index) => (
                        <HireCompanionCard key={index} {...item} />
                    ))}
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

    