"use client";

import Image from "next/image";
import Link from "next/link";

interface Profile {
    id: string;
    name: string;
    age: number;
    location: string;
    imageUrl: string;
}

interface MatchCardProps {
    profile: Profile;
    style?: React.CSSProperties;
}

export function MatchCard({ profile, style }: MatchCardProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4" style={style}>
      <div className="relative h-full w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl">
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
    </div>
  );
}
