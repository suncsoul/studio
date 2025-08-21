"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BibleStory } from "@/lib/bible";
import { useKidsProgress } from "@/contexts/kids-progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type StoryCardProps = {
  bookId: string;
  characterId: string;
  story: BibleStory;
};

export function StoryCard({ bookId, characterId, story }: StoryCardProps) {
  const { isStoryCompleted, completeStory } = useKidsProgress();
  const { toast } = useToast();
  const [answer, setAnswer] = useState("");

  const completed = isStoryCompleted(bookId, characterId, story.id);

  const onComplete = () => {
    const result = completeStory({ bookId, characterId, storyId: story.id, points: story.points });
    if (result.alreadyCompleted) {
      toast({ title: "Already completed", description: "Great job! Try another story." });
      return;
    }
    toast({
      title: `+${result.pointsAwarded} points!`,
      description: result.newBadges.length > 0 ? `Unlocked: ${result.newBadges.join(", ")}` : "Nice progress!",
    });
  };

  return (
    <Card className={`border-2 ${completed ? 'border-green-400' : 'border-transparent'} rounded-xl shadow-sm`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{story.title}</CardTitle>
          {completed && (
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">Done</span>
          )}
        </div>
        <CardDescription>{story.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {story.prompt && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Try this:</div>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={story.prompt}
              className="resize-none"
            />
          </div>
        )}
        <Button disabled={completed} onClick={onComplete} className="w-full">
          {completed ? "Completed" : "Submit & Collect Reward"}
        </Button>
      </CardContent>
    </Card>
  );
}

