"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BibleBook } from "@/lib/bible";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: BibleBook;
  progressPercent?: number;
  onClick?: () => void;
};

export function BookCard({ book, progressPercent = 0, onClick }: BookCardProps) {
  const gradient = `linear-gradient(135deg, ${book.themeColor} 0%, #ffffff 120%)`;

  return (
    <button onClick={onClick} className="text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl">
      <Card className="overflow-hidden rounded-xl border-4 border-transparent transition-transform hover:scale-[1.02] shadow-md">
        <CardContent className="p-4" style={{ background: gradient }}>
          <div className="flex items-center justify-between">
            <div className="text-3xl" aria-hidden>{book.iconEmoji}</div>
            <div className="text-xs font-semibold bg-white/70 text-foreground px-2 py-1 rounded-full shadow">{progressPercent}%</div>
          </div>
          <div className="mt-3">
            <h3 className={cn("text-lg font-extrabold drop-shadow-sm", "text-foreground")}>{book.name}</h3>
            <Progress value={progressPercent} className="h-2 mt-2 bg-white/50" />
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

