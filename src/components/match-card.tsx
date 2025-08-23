"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";

interface Profile {
    id: string;
    name: string;
    age: number;
    location: string;
    imageUrl: string;
}

interface MatchCardProps {
    profile: Profile;
    onSwipe: (action: 'like' | 'dislike') => void;
}

export function MatchCard({ profile, onSwipe }: MatchCardProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full h-full aspect-[9/16] max-w-full max-h-full overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-full w-full">
            <Image
                src={profile.imageUrl}
                alt={profile.name}
                fill
                className="object-cover"
                data-ai-hint="person photo"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Link href={`/view-profile/${encodeURIComponent(profile.name)}`}>
                <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
                <p className="text-lg opacity-90">{profile.location}</p>
                </Link>
            </div>
            </div>
        </Card>
    </div>
  );
}
