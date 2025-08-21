'use client';

import Link from 'next/link';
import { books } from '@/lib/kidsBibleData';
import { Card } from '@/components/ui/card';

export default function KidsBibleHome() {
  return (
    <div className="min-h-screen w-full">
      <div className="container py-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Kids Bible Adventure</h1>
          <p className="text-muted-foreground">Explore all 66 books with colorful, interactive stories.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {books.map((book) => (
            <Link key={book.slug} href={`/kids-bible/${book.slug}`}>
              <Card className="group overflow-hidden border-0 shadow-md transition-all hover:shadow-xl">
                <div className={`h-32 w-full bg-gradient-to-br ${book.color} flex items-center justify-center relative` }>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_40%)]" />
                  <span className="text-5xl drop-shadow">{book.emoji ?? '📖'}</span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg leading-tight">{book.name}</h3>
                  <p className="text-xs text-muted-foreground">Tap to meet characters and play stories</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

