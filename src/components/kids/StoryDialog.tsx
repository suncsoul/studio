"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Story } from '@/lib/kidsBibleData';
import { useRewards } from '@/contexts/rewards-context';

export function StoryDialog({ bookSlug, story }: { bookSlug: string; story: Story }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const { markStoryCompleted } = useRewards();

  const onChoice = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
  };

  const finish = () => {
    markStoryCompleted(bookSlug, story.id);
    setOpen(false);
    restart();
  };

  const total = story.questions.length;
  const isEnd = step >= total;

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) restart(); }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{story.emoji ?? '⭐'} {story.title}</DialogTitle>
        </DialogHeader>

        {!isEnd ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{story.summary}</p>
            <div className="rounded-xl p-4 bg-muted/40">
              <div className="text-sm font-semibold">Question {step + 1} of {total}</div>
              <div className="mt-2 text-base">{story.questions[step].question}</div>
              <div className="mt-3 grid gap-2">
                {story.questions[step].choices.map((c) => (
                  <Button key={c.id} variant="outline" className="justify-start" onClick={() => onChoice(c.isCorrect)}>
                    {c.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="text-4xl">🎉</div>
            <div className="text-lg font-bold">Great job!</div>
            <div className="text-sm text-muted-foreground">You scored {score} / {total}. You earned 10 points!</div>
            <div className="flex gap-2 justify-center">
              <Button onClick={finish} className="bg-emerald-500 hover:bg-emerald-600">Collect Reward</Button>
              <Button variant="outline" onClick={restart}>Replay</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

