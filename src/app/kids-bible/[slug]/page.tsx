'use client';

import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/kidsBibleData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRewards } from '@/contexts/rewards-context';
import { useMemo } from 'react';
import { StoryDialog } from '@/components/kids/StoryDialog';

export default function BookDetail({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);
  const { markStoryCompleted, hasCompletedStory } = useRewards();

  if (!book) return notFound();

  const storyProgress = useMemo(() => book.stories.map((s) => ({ id: s.id, done: hasCompletedStory(book.slug, s.id) })), [book.slug]);

  return (
    <div className="min-h-screen w-full">
      <div className="container py-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">{book.emoji ?? '📖'} {book.name}</h1>
          <p className="text-muted-foreground">Meet the heroes and play through the stories.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden border-0 shadow-md">
            <div className={`h-24 bg-gradient-to-br ${book.color}`} />
            <div className="p-4">
              <h2 className="font-bold text-lg">Characters</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {book.characters.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2">Coming soon.</p>
                )}
                {book.characters.map((c) => (
                  <div key={c.id} className="rounded-lg bg-muted/40 p-3 flex items-center gap-2">
                    <span className="text-2xl">{c.emoji ?? '🙂'}</span>
                    <div>
                      <div className="font-semibold leading-tight">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.summary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md sm:col-span-2 lg:col-span-2">
            <div className={`h-24 bg-gradient-to-br ${book.color}`} />
            <div className="p-4">
              <h2 className="font-bold text-lg">Stories</h2>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                {book.stories.length === 0 && (
                  <p className="text-sm text-muted-foreground col-span-2">Interactive stories coming soon.</p>
                )}
                {book.stories.map((s) => {
                  const done = hasCompletedStory(book.slug, s.id);
                  return (
                    <div key={s.id} className="rounded-xl p-4 bg-gradient-to-br from-white to-muted">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{s.emoji ?? '⭐'}</span>
                          <div>
                            <div className="font-semibold">{s.title}</div>
                            <div className="text-xs text-muted-foreground">{s.summary}</div>
                          </div>
                        </div>
                        {done ? (
                          <span className="text-sm font-medium text-emerald-600">Completed ✓</span>
                        ) : null}
                      </div>
                      <div className="mt-3 flex gap-2">
                        {!done && (
                          <Button onClick={() => markStoryCompleted(book.slug, s.id)} size="sm" className="bg-emerald-500 hover:bg-emerald-600">Quick Complete</Button>
                        )}
                        <StoryDialog bookSlug={book.slug} story={s} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

