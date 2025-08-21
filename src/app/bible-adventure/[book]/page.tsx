"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getBibleBookById } from "@/lib/bible";
import { CharacterCard } from "@/components/kids/CharacterCard";
import { StoryCard } from "@/components/kids/StoryCard";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = String(params?.book);
  const book = useMemo(() => getBibleBookById(bookId), [bookId]);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <p className="text-muted-foreground">Please go back and pick another book.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center space-y-1">
        <div className="text-5xl" aria-hidden>{book.iconEmoji}</div>
        <h1 className="text-3xl font-extrabold">{book.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-3">
          {book.characters.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
          {book.characters.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Characters for this book are coming soon. Pick another book or check back later.
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          {book.characters.flatMap((c) => c.stories.map((s) => (
            <StoryCard key={`${c.id}:${s.id}`} bookId={book.id} characterId={c.id} story={s} />
          )))}
          {book.characters.every((c) => c.stories.length === 0) && (
            <div className="text-sm text-muted-foreground">
              Stories for this book are coming soon. Try another book to start collecting points!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

