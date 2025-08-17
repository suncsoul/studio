
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShieldCheck, Star, Briefcase } from "lucide-react";
import Link from "next/link";

interface HireCompanionCardProps {
    providerName: string;
    providerAvatarUrl: string;
    service: string;
    rate: number;
    isVerified: boolean;
    isBackgroundChecked: boolean;
    rating: number;
}

export function HireCompanionCard({
    providerName,
    providerAvatarUrl,
    service,
    rate,
    isVerified,
    isBackgroundChecked,
    rating,
}: HireCompanionCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg hover:border-holographic-purple/50">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link href={`/view-profile/${encodeURIComponent(providerName)}`} className="flex items-center gap-4 w-full sm:w-auto flex-1">
          <Avatar className="h-16 w-16 border-2 border-holographic-purple/50">
            <AvatarImage src={providerAvatarUrl} alt={providerName} data-ai-hint="person avatar" />
            <AvatarFallback>{providerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-card-foreground text-lg leading-tight">{providerName}</p>
            <p className="text-sm text-muted-foreground mt-1">{service}</p>
            <div className="flex items-center gap-2 mt-2">
                {isVerified && <Badge variant="outline" className="gap-1.5 border-teal-500/40 bg-teal-500/10 text-teal-500"><ShieldCheck className="h-3.5 w-3.5"/>ID Verified</Badge>}
                {isBackgroundChecked && <Badge variant="outline" className="gap-1.5 border-electric-blue/40 bg-electric-blue/10 text-electric-blue"><ShieldCheck className="h-3.5 w-3.5"/>Background Checked</Badge>}
            </div>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-cyber-yellow fill-cyber-yellow" />
                <span className="font-bold text-base">{rating}</span>
            </div>
            <p className="text-lg font-semibold"><span className="font-bold text-2xl">${rate}</span>/hr</p>
            <Button variant="default" className="bg-holographic-purple hover:bg-holographic-purple/90 text-white">
                <Briefcase className="mr-2 h-4 w-4"/>
                Book Session
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

    