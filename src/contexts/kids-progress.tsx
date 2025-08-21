"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BibleBook, BibleCharacter, BibleStory, getAllBibleBooks } from "@/lib/bible";

type StoryKey = string; // `${bookId}:${characterId}:${storyId}`

type KidsProgressState = {
  points: number;
  completions: Record<StoryKey, boolean>;
  badges: string[];
};

type CompleteStoryInput = {
  bookId: string;
  characterId: string;
  storyId: string;
  points?: number;
};

type CompleteStoryResult = {
  pointsAwarded: number;
  newBadges: string[];
  alreadyCompleted: boolean;
};

type KidsProgressContextType = {
  state: KidsProgressState;
  isStoryCompleted: (bookId: string, characterId: string, storyId: string) => boolean;
  completeStory: (input: CompleteStoryInput) => CompleteStoryResult;
  getBookProgress: (bookId: string) => { completed: number; total: number; percent: number };
  reset: () => void;
};

const STORAGE_KEY = "kids-progress-v1";

const defaultState: KidsProgressState = {
  points: 0,
  completions: {},
  badges: [],
};

const KidsProgressContext = createContext<KidsProgressContextType | undefined>(undefined);

function makeKey(bookId: string, characterId: string, storyId: string): StoryKey {
  return `${bookId}:${characterId}:${storyId}`;
}

function loadState(): KidsProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      points: typeof parsed.points === "number" ? parsed.points : 0,
      completions: parsed.completions ?? {},
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    } as KidsProgressState;
  } catch {
    return defaultState;
  }
}

function saveState(state: KidsProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function evaluateBadges(state: KidsProgressState): string[] {
  const unlocked: string[] = [];
  const has = (name: string) => state.badges.includes(name) || unlocked.includes(name);

  // Badge: First Steps (complete any story)
  if (!has("First Steps") && Object.values(state.completions).some(Boolean)) {
    unlocked.push("First Steps");
  }

  // Badge: Ten Stories (complete 10 stories)
  const totalCompleted = Object.values(state.completions).filter(Boolean).length;
  if (!has("Ten Stories") && totalCompleted >= 10) {
    unlocked.push("Ten Stories");
  }

  // Badge: Genesis Explorer (complete 3 Genesis stories)
  const genesisCompleted = Object.keys(state.completions)
    .filter((k) => state.completions[k] && k.startsWith("genesis:"))
    .length;
  if (!has("Genesis Explorer") && genesisCompleted >= 3) {
    unlocked.push("Genesis Explorer");
  }

  // Badge: Sea Walker (complete Exodus: Red Sea story)
  if (!has("Sea Walker") && state.completions[makeKey("exodus", "moses", "red-sea")]) {
    unlocked.push("Sea Walker");
  }

  // Badge: Rainbow Friend (complete Noah's Ark story)
  if (!has("Rainbow Friend") && state.completions[makeKey("genesis", "noah", "ark")]) {
    unlocked.push("Rainbow Friend");
  }

  return unlocked;
}

export function KidsProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<KidsProgressState>(defaultState);

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const isStoryCompleted = useCallback((bookId: string, characterId: string, storyId: string) => {
    return !!state.completions[makeKey(bookId, characterId, storyId)];
  }, [state.completions]);

  const completeStory = useCallback((input: CompleteStoryInput): CompleteStoryResult => {
    const key = makeKey(input.bookId, input.characterId, input.storyId);
    const alreadyCompleted = !!state.completions[key];
    if (alreadyCompleted) {
      return { pointsAwarded: 0, newBadges: [], alreadyCompleted: true };
    }

    const pointsAwarded = Math.max(1, input.points ?? 5);
    const nextState: KidsProgressState = {
      points: state.points + pointsAwarded,
      completions: { ...state.completions, [key]: true },
      badges: [...state.badges],
    };

    const newlyUnlocked = evaluateBadges(nextState);
    if (newlyUnlocked.length > 0) {
      nextState.badges = Array.from(new Set([...nextState.badges, ...newlyUnlocked]));
    }

    setState(nextState);
    return { pointsAwarded, newBadges: newlyUnlocked, alreadyCompleted: false };
  }, [state]);

  const getBookProgress = useCallback((bookId: string) => {
    const books = getAllBibleBooks();
    const book = books.find((b) => b.id === bookId);
    if (!book) return { completed: 0, total: 0, percent: 0 };
    const allStories = book.characters.flatMap((c) => c.stories.map((s) => makeKey(bookId, c.id, s.id)));
    const total = allStories.length;
    const completed = allStories.filter((k) => state.completions[k]).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percent };
  }, [state.completions]);

  const reset = useCallback(() => setState(defaultState), []);

  const value = useMemo<KidsProgressContextType>(() => ({
    state,
    isStoryCompleted,
    completeStory,
    getBookProgress,
    reset,
  }), [state, isStoryCompleted, completeStory, getBookProgress, reset]);

  return (
    <KidsProgressContext.Provider value={value}>{children}</KidsProgressContext.Provider>
  );
}

export function useKidsProgress(): KidsProgressContextType {
  const ctx = useContext(KidsProgressContext);
  if (!ctx) throw new Error("useKidsProgress must be used within KidsProgressProvider");
  return ctx;
}

