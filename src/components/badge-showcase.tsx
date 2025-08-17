
"use client";

import {
  Gem,
  Crown,
  Sunset,
  Hourglass,
  Flame,
  Leaf,
  Medal,
  Swords,
  ShieldCheck,
  MessageSquareHeart,
  CalendarCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const allBadges = [
    {
        name: "Exclusive Circle",
        icon: Gem,
        unlocked: false,
        description: "Match with 3+ premium users to prove you're in the inner circle.",
        progress: { current: 2, max: 3, text: "2/3 VIP matches" },
        color: "text-violet-500",
    },
    {
        name: "Top 10% Trendsetter",
        icon: Crown,
        unlocked: true,
        description: "Be in the top 10% of most-liked profiles this month. Resets weekly!",
        color: "text-amber-500",
    },
    {
        name: "Golden Hour Rush",
        icon: Sunset,
        unlocked: true,
        description: "Uploaded a photo and sent 5 messages during the 5-6 PM golden hour.",
        color: "text-orange-500",
    },
    {
        name: "Last Chance Match",
        icon: Hourglass,
        unlocked: false,
        description: "Message a high-compatibility (>85%) match within 1 hour of matching.",
        progress: { current: 0, max: 1, text: "Message a new match quickly!" },
        color: "text-sky-500",
    },
    {
        name: "Streak Dominator",
        icon: Flame,
        unlocked: false,
        description: "Maintain a 30-day login and message streak. Don't break the chain!",
        progress: { current: 7, max: 30, text: "7-day streak!" },
        color: "text-red-500",
    },
    {
        name: "Seasonal Soul",
        icon: Leaf,
        unlocked: true,
        description: "Completed all 5 Fall '24 challenges.",
        color: "text-lime-600",
    },
    {
        name: "Matchmaker Royale",
        icon: Medal,
        unlocked: true,
        description: "Referred the most matches in your friend group last month.",
        color: "text-yellow-500",
    },
    {
        name: "Profile Clash Victor",
        icon: Swords,
        unlocked: false,
        description: "Win 3 profile 'duels' by getting more votes than your opponent.",
        progress: { current: 1, max: 3, text: "1/3 Duels Won" },
        color: "text-slate-500",
    },
    {
        name: "Authentic Soul",
        icon: ShieldCheck,
        unlocked: true,
        description: "Passed ID and live selfie verification.",
        color: "text-teal-500",
    },
    {
        name: "Conversation Starter",
        icon: MessageSquareHeart,
        unlocked: false,
        description: "Send 50+ icebreaker messages with an 80%+ reply rate.",
        progress: { current: 35, max: 50, text: "35/50 Messages Sent" },
        color: "text-pink-500",
    },
    {
        name: "Weekend Explorer",
        icon: CalendarCheck,
        unlocked: true,
        description: "Attended 3+ in-person meetups. This badge is stealable and resets monthly!",
        color: "text-indigo-500",
    },
];

export function BadgeShowcase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Showcase</CardTitle>
        <CardDescription>Flex your achievements. Pin your top 3 to show them off!</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {allBadges.map((badge) => (
                  <Tooltip key={badge.name}>
                    <TooltipTrigger asChild>
                      <button className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-lg border-2 text-center space-y-2 transition-all duration-300 aspect-square focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-110 hover:shadow-lg focus:scale-110 focus:shadow-lg",
                          badge.unlocked 
                          ? 'border-primary/50 bg-primary/10 shadow-md' 
                          : 'bg-muted/50 border-dashed opacity-70'
                      )}>
                          <badge.icon className={cn("h-10 w-10", badge.unlocked ? badge.color : "text-muted-foreground")} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm" side="bottom">
                      <div className="p-2 text-center">
                        <h3 className={cn("text-lg font-bold mb-1", badge.color)}>{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                        
                        {badge.progress && !badge.unlocked && (
                            <div>
                                <Progress value={(badge.progress.current / badge.progress.max) * 100} className="h-2 my-1"/>
                                <div className="text-xs font-semibold text-primary mt-1">
                                    {badge.progress.text}
                                </div>
                            </div>
                        )}
                        {badge.unlocked && (
                           <div className="text-sm font-semibold text-green-500">
                                Unlocked!
                           </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
              ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
