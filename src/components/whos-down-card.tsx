
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Users, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

interface WhosDownCardProps {
  userName: string;
  userAvatarUrl: string;
  activity: string;
  time: string;
  bondType: "event" | "travel" | "activity";
  vibe: string;
  distance: string;
}

export function WhosDownCard({
  userName,
  userAvatarUrl,
  activity,
  time,
  bondType,
  vibe,
  distance,
}: WhosDownCardProps) {
  
  const BondInfo = {
    event: {
      color: "bg-holographic-purple/20 text-holographic-purple border-holographic-purple/40",
      icon: Calendar,
      text: "Event"
    },
    travel: {
        color: "bg-electric-blue/20 text-electric-blue border-electric-blue/40",
        icon: Users,
        text: "Travel"
    },
    activity: {
        color: "bg-toxic-green/20 text-toxic-green border-toxic-green/40",
        icon: MapPin,
        text: "Activity"
    },
  };
  
  const { color, icon: Icon, text } = BondInfo[bondType];

  return (
    <Card className="transition-all hover:shadow-lg hover:border-primary/50">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href={`/view-profile/${encodeURIComponent(userName)}`} className="flex items-center gap-4 w-full sm:w-auto flex-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userAvatarUrl} alt={userName} data-ai-hint="person avatar" />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground text-base leading-tight">{activity}</p>
            <div className="text-sm text-muted-foreground mt-1 flex items-center flex-wrap gap-x-2">
                <span>by {userName}</span>
                <span className="text-muted-foreground/50 hidden sm:inline">&bull;</span>
                <span className="hidden sm:inline">{time}</span>
                 <span className="text-muted-foreground/50">&bull;</span>
                <span>{distance}</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
           <div className="flex items-center gap-3">
            <Badge variant="outline" className="capitalize gap-1.5 bg-background">
                    <Sparkles className="h-3.5 w-3.5 text-orange-fusion"/>
                    {vibe}
                </Badge>
            <Badge variant="outline" className={`capitalize gap-1.5 ${color}`}>
                <Icon className="h-3.5 w-3.5" />
                {text}
            </Badge>
           </div>
          <Button>Request</Button>
        </div>
      </CardContent>
    </Card>
  );
}
