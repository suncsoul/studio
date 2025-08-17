
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
  UserCheck,
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
        name: "Profile Verified",
        icon: UserCheck,
        description: "Completed your profile with all required information and a profile photo.",
        color: "text-green-500",
    },
    {
        name: "Exclusive Circle",
        icon: Gem,
        description: "Match with 3+ premium users to prove you're in the inner circle.",
        progress: { current: 0, max: 3, text: "0/3 VIP matches" },
        color: "text-holographic-purple",
    },
    {
        name: "Top 10% Trendsetter",
        icon: Crown,
        description: "Be in the top 10% of most-liked profiles this month. Resets weekly!",
        color: "text-cyber-yellow",
    },
    {
        name: "Golden Hour Rush",
        icon: Sunset,
        description: "Uploaded a photo and sent 5 messages during the 5-6 PM golden hour.",
        color: "text-orange-fusion",
    },
    {
        name: "Last Chance Match",
        icon: Hourglass,
        description: "Message a high-compatibility (>85%) match within 1 hour of matching.",
        progress: { current: 0, max: 1, text: "Message a new match quickly!" },
        color: "text-laser-pink",
    },
    {
        name: "Streak Dominator",
        icon: Flame,
        description: "Maintain a 30-day login and message streak. Don't break the chain!",
        progress: { current: 0, max: 30, text: "0-day streak!" },
        color: "text-toxic-green",
    },
    {
        name: "Seasonal Soul",
        icon: Leaf,
        description: "Completed all 5 Fall '24 challenges.",
        color: "text-lime-600",
    },
    {
        name: "Matchmaker Royale",
        icon: Medal,
        description: "Referred the most matches in your friend group last month.",
        color: "text-yellow-500",
    },
    {
        name: "Profile Clash Victor",
        icon: Swords,
        description: "Win 3 profile 'duels' by getting more votes than your opponent.",
        progress: { current: 0, max: 3, text: "0/3 Duels Won" },
        color: "text-toxic-green",
    },
    {
        name: "Authentic Soul",
        icon: ShieldCheck,
        description: "Passed ID and live selfie verification.",
        color: "text-teal-500",
    },
    {
        name: "Conversation Starter",
        icon: MessageSquareHeart,
        description: "Send 50+ icebreaker messages with an 80%+ reply rate.",
        progress: { current: 0, max: 50, text: "0/50 Messages Sent" },
        color: "text-electric-blue",
    },
    {
        name: "Weekend Explorer",
        icon: CalendarCheck,
        description: "Attended 3+ in-person meetups. This badge is stealable and resets monthly!",
        color: "text-indigo-500",
    },
];

interface BadgeShowcaseProps {
    unlockedBadges?: string[];
}

export function BadgeShowcase({ unlockedBadges = [] }: BadgeShowcaseProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Showcase</CardTitle>
        <CardDescription>Flex your achievements. Pin your top 3 to show them off!</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {allBadges.map((badge) => {
                  const isUnlocked = unlockedBadges.includes(badge.name);
                  return (
                  <Tooltip key={badge.name}>
                    <TooltipTrigger asChild>
                      <button className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-lg border-2 text-center space-y-2 transition-all duration-300 aspect-square focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-110 hover:shadow-lg focus:scale-110 focus:shadow-lg",
                          isUnlocked 
                          ? 'border-primary/50 bg-primary/10 shadow-md' 
                          : 'bg-muted/50 border-dashed opacity-70'
                      )}>
                          <badge.icon className={cn("h-full w-full", isUnlocked ? badge.color : "text-muted-foreground")} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs" side="bottom">
                      <div className="p-2 text-left space-y-1">
                        <h3 className={cn("text-base font-bold", badge.color)}>{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        
                        {(badge as any).progress && !isUnlocked && (
                            <div className="space-y-1 pt-2">
                                <Progress value={((badge as any).progress.current / (badge as any).progress.max) * 100} className="h-2"/>
                                <div className="text-xs font-semibold text-primary">
                                    {(badge as any).progress.text}
                                </div>
                            </div>
                        )}
                        {isUnlocked && (
                           <div className="text-sm font-bold text-green-500 mt-2">
                                Unlocked!
                           </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
              )})}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
