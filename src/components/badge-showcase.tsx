
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const badges = [
  {
    tier: "Social Proof",
    items: [
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
    ],
  },
  {
    tier: "Urgency",
    items: [
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
    ],
  },
  {
    tier: "Scarcity",
    items: [
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
    ],
  },
  {
    tier: "Competition",
    items: [
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
    ]
  },
  {
    tier: "Authenticity & Engagement",
    items: [
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
    ],
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
          {badges.map((tier) => (
            <div key={tier.tier} className="mb-6 last:mb-0">
                <h3 className="font-semibold text-lg mb-3">{tier.tier}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tier.items.map((badge) => (
                        <Tooltip key={badge.name}>
                        <TooltipTrigger asChild>
                            <div className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-lg border-2 text-center space-y-2 transition-all duration-300",
                                badge.unlocked 
                                ? 'border-primary/50 bg-primary/10 shadow-lg' 
                                : 'bg-muted/50 border-dashed opacity-70'
                            )}>
                                <badge.icon className={cn("h-10 w-10", badge.unlocked ? badge.color : "text-muted-foreground")} />
                                <span className={cn(
                                    "font-semibold text-sm",
                                    badge.unlocked ? "text-foreground" : "text-muted-foreground"
                                )}>{badge.name}</span>
                                {badge.progress && !badge.unlocked && (
                                    <div className="w-full pt-1">
                                        <Progress value={(badge.progress.current / badge.progress.max) * 100} className="h-1"/>
                                    </div>
                                )}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[250px]">
                            <p className="font-bold mb-1">{badge.name}</p>
                            <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                            {badge.progress && !badge.unlocked && (
                                <div className="text-xs font-semibold text-primary">
                                    Progress: {badge.progress.text}
                                </div>
                            )}
                        </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </div>
          ))}
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
