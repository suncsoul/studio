"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BibleCharacter } from "@/lib/bible";

type CharacterCardProps = {
  character: BibleCharacter;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const gradient = `linear-gradient(135deg, ${character.color ?? "#FFD54F"} 0%, #ffffff 130%)`;
  return (
    <Card className="overflow-hidden border-4 border-transparent rounded-xl shadow">
      <CardHeader className="pb-2" style={{ background: gradient }}>
        <CardTitle className="text-xl font-extrabold text-foreground drop-shadow">{character.name}</CardTitle>
        {character.funFact && (
          <CardDescription className="text-foreground/80 font-semibold">{character.funFact}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-sm text-muted-foreground">{character.stories.length} fun stor{character.stories.length === 1 ? 'y' : 'ies'}</div>
      </CardContent>
    </Card>
  );
}

