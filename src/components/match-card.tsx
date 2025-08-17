"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BrainCircuit, Heart, Laugh, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

interface MatchCardProps {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  mbti: string;
  loveLanguage: string;
  humorStyle: string;
  isVerified: boolean;
}

export function MatchCard({
  name,
  age,
  imageUrl,
  location,
  mbti,
  loveLanguage,
  humorStyle,
  isVerified,
}: MatchCardProps) {
  return (
    <Card className="group w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="relative p-0">
        <div className="relative h-72 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="person photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <CardTitle className="text-2xl font-bold text-white">
            {name}, {age}
          </CardTitle>
          <p className="text-sm text-white/90">{location}</p>
        </div>
        {isVerified && (
          <Badge
            variant="default"
            className="absolute right-4 top-4 bg-teal-500 text-white gap-1"
          >
            <ShieldCheck className="h-4 w-4" />
            Verified
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 bg-card/80">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground/80">
            Personality Grid
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <span className="font-medium text-card-foreground">{mbti}</span>
              <span className="text-card-foreground/70">MBTI</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2">
              <Heart className="h-5 w-5 text-accent" />
              <span className="font-medium text-card-foreground">{loveLanguage}</span>
              <span className="text-card-foreground/70">Love Lang.</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2">
              <Laugh className="h-5 w-5 text-sky-500" />
              <span className="font-medium text-card-foreground">{humorStyle}</span>
              <span className="text-card-foreground/70">Humor</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-card/80 p-4 pt-0 flex gap-2">
        <Button variant="outline" className="w-full">Pass</Button>
        <Button className="w-full group-hover:animate-biorhythm-pulse">Connect</Button>
      </CardFooter>
    </Card>
  );
}
