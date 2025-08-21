"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type EarnedBadge = {
  id: string;
  title: string;
  emoji: string;
  description?: string;
  earnedAt: number;
};

type RewardsContextValue = {
  points: number;
  badges: EarnedBadge[];
  markStoryCompleted: (bookSlug: string, storyId: string) => void;
  hasCompletedStory: (bookSlug: string, storyId: string) => boolean;
};

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined);

const STORAGE_KEY = 'kids-bible-rewards';

type StoredState = {
  points: number;
  badges: EarnedBadge[];
  completed: Record<string, string[]>; // bookSlug -> storyIds
};

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>({ points: 0, badges: [], completed: {} });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(JSON.parse(raw));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const markStoryCompleted = (bookSlug: string, storyId: string) => {
    setState((prev) => {
      const already = new Set(prev.completed[bookSlug] || []);
      if (already.has(storyId)) {
        return prev;
      }
      const newCompleted = { ...prev.completed, [bookSlug]: [...already, storyId] as string[] };
      const newPoints = prev.points + 10; // award 10 points per story
      const newlyEarned: EarnedBadge[] = [];

      if (newPoints >= 50 && !prev.badges.find((b) => b.id === 'bronze-explorer')) {
        newlyEarned.push({ id: 'bronze-explorer', title: 'Bronze Explorer', emoji: '🥉', description: '50 points!', earnedAt: Date.now() });
      }
      if ((newCompleted[bookSlug]?.length || 0) >= 3 && !prev.badges.find((b) => b.id === `triple-${bookSlug}`)) {
        newlyEarned.push({ id: `triple-${bookSlug}`, title: 'Story Sprinter', emoji: '⚡', description: 'Completed 3 stories in one book!', earnedAt: Date.now() });
      }

      return {
        points: newPoints,
        badges: [...prev.badges, ...newlyEarned],
        completed: newCompleted,
      };
    });
  };

  const hasCompletedStory = (bookSlug: string, storyId: string): boolean => {
    return Boolean(state.completed[bookSlug]?.includes(storyId));
  };

  const value = useMemo<RewardsContextValue>(() => ({ points: state.points, badges: state.badges, markStoryCompleted, hasCompletedStory }), [state.points, state.badges]);

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}

export function useRewards() {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error('useRewards must be used within RewardsProvider');
  return ctx;
}

