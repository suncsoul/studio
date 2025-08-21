"use client";

import { useMemo, useState } from "react";
import { getAllBibleBooks } from "@/lib/bible";
import { BookCard } from "@/components/kids/BookCard";
import { useKidsProgress } from "@/contexts/kids-progress";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { BadgeShowcase } from "@/components/badge-showcase";

export default function BibleAdventurePage() {
  const books = useMemo(() => getAllBibleBooks(), []);
  const { getBookProgress, state } = useKidsProgress();
  const [query, setQuery] = useState("");

  const filtered = books.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold">Bible Adventure</h1>
          <p className="text-muted-foreground">Collect points, unlock badges, and explore all 66 books!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BadgeShowcase unlockedBadges={state.badges} />
        </div>

        <div className="max-w-md mx-auto">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a book (e.g., Genesis, John)"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((book) => {
            const progress = getBookProgress(book.id).percent;
            return (
              <Link key={book.id} href={`/bible-adventure/${book.id}`}>
                <BookCard book={book} progressPercent={progress} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

