
"use client";

import { Award, BookOpen, Compass, Crown, MessageSquare, Moon, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { BadgeType } from "@/types/badges";

const allBadges: BadgeType[] = [
    { id: 'firstImpression', name: 'First Impression', icon: Sparkles, unlocked: true, description: 'Complete 100% profile setup (bio + 5 photos + personality quiz).' },
    { id: 'authenticSoul', name: 'Authentic Soul', icon: ShieldCheck, unlocked: true, description: 'Pass ID + live selfie verification.' },
    { id: 'conversationStarter', name: 'Conversation Starter', icon: MessageSquare, unlocked: false, description: 'Send 50+ icebreaker messages with 80%+ reply rate.' },
    { id: 'weekendExplorer', name: 'Weekend Explorer', icon: Compass, unlocked: true, description: 'Attend 3+ in-person meetups (verified via location check-in).' },
    { id: 'goodKarma', name: 'Good Karma', icon: Award, unlocked: false, description: 'Get 10+ "positive vibe" ratings from matches.' },
    { id: 'nightOwl', name: 'Night Owl', icon: Moon, unlocked: true, description: 'Active during late-night (12–3AM) for 7+ days.' },
    { id: 'vipTrendsetter', name: 'VIP Trendsetter', icon: Crown, unlocked: false, description: 'Invite 5 friends who complete profiles + get 50+ likes.' },
    { id: 'openBook', name: 'Open Book', icon: BookOpen, unlocked: true, description: 'Answer 20+ personality questions in "Deep Layer" profile.' },
];

export function Badges() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements unlocked through your journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="grid grid-cols-4 gap-4">
                        {allBadges.map((badge) => (
                            <Tooltip key={badge.id}>
                                <TooltipTrigger asChild>
                                    <div className={`relative flex flex-col items-center justify-center aspect-square p-2 border rounded-lg transition-all
                                        ${badge.unlocked ? 'border-primary/50 bg-primary/10' : 'border-dashed opacity-50'}`}>
                                        <badge.icon className={`h-8 w-8 ${badge.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                                         <p className={`mt-2 text-xs text-center font-medium ${badge.unlocked ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                                            {badge.name}
                                        </p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-bold">{badge.name}</p>
                                    <p>{badge.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card>
    );
}
