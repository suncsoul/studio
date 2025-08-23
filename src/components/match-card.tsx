
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface Profile {
    id: string;
    name: string;
    age: number;
    location: string;
    imageUrl: string;
    prompts: { question: string; answer: string }[];
}

interface MatchCardProps {
    profile: Profile;
    onSwipe: (action: 'like' | 'dislike') => void;
    className?: string;
    style?: React.CSSProperties;
}

export function MatchCard({ profile, onSwipe, className, style }: MatchCardProps) {
  return (
    <div className={`absolute w-full h-full max-w-xs flex items-center justify-center ${className}`} style={style}>
        <Card className="w-full h-full overflow-hidden rounded-2xl shadow-2xl">
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
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col gap-4">
                <Link href={`/view-profile/${encodeURIComponent(profile.name)}`}>
                    <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
                    <p className="text-lg opacity-90">{profile.location}</p>
                </Link>

                {profile.prompts[0] && (
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-semibold text-sm">{profile.prompts[0].question}</p>
                        <p className="text-lg">{profile.prompts[0].answer}</p>
                        <Button className="w-full mt-2" onClick={() => onSwipe('like')}>Comment to Like</Button>
                    </div>
                )}
            </div>
            </div>
        </Card>
    </div>
  );
}
