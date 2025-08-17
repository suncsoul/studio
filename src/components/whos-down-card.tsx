import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface WhosDownCardProps {
  userName: string;
  userAvatarUrl: string;
  activity: string;
  time: string;
  bondType: "event" | "travel" | "activity";
}

export function WhosDownCard({
  userName,
  userAvatarUrl,
  activity,
  time,
  bondType,
}: WhosDownCardProps) {
  const getBadgeColor = () => {
    switch (bondType) {
      case "event":
        return "bg-purple-500";
      case "travel":
        return "bg-blue-500";
      case "activity":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="flex items-center justify-between p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={userAvatarUrl} alt={userName} data-ai-hint="person avatar" />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground">{activity}</p>
          <p className="text-sm text-muted-foreground">
            Posted by {userName} &bull; {time}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={`${getBadgeColor()} text-white capitalize`}>{bondType} Bond</Badge>
        <Button>Join</Button>
      </div>
    </Card>
  );
}
