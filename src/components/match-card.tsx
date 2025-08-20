
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BrainCircuit, Heart, Laugh, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Avatar as AvatarType } from "@/lib/avatars";

interface MatchCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  mbti: string;
  loveLanguage: string;
  humorStyle: string;
  isVerified: boolean;
  selectedAvatar?: AvatarType;
}

export function MatchCard({
  id,
  name,
  age,
  imageUrl,
  location,
  mbti,
  loveLanguage,
  humorStyle,
  isVerified,
  selectedAvatar,
}: MatchCardProps) {

  return (
    <div className="group w-full h-full block">
      <Card className="w-full h-full overflow-hidden transition-all duration-300 rounded-xl border-0">
        <div className="relative h-full w-full bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            data-ai-hint="person photo"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {name}, {age}
              {isVerified && (
                <ShieldCheck className="h-6 w-6 text-white fill-blue-500" />
              )}
            </h2>
            <p className="text-lg">{location}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
