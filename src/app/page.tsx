
'use client';

import { Header } from "@/components/header";
import {
  Heart,
  X,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { MatchCard } from "@/components/match-card";


const matchesData = [
    { id: 'user11', name: 'Nora', age: 29, location: 'Dublin, Ireland', imageUrl: 'https://placehold.co/400x600/D2B48C/3A3B3C.png', prompts: [{question: "The key to my heart is...", answer: "A perfectly poured pint of Guinness and a good story."}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
    { id: 'user12', name: 'Kenji', age: 34, location: 'Tokyo, Japan', imageUrl: 'https://placehold.co/400x600/222222/E0E0E0.png', prompts: [{question: "I value...", answer: "Clean code, minimalist design, and quiet corners of the city."}], selectedAvatar: { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' } },
    { id: 'user13', name: 'Fatima', age: 27, location: 'Marrakech, Morocco', imageUrl: 'https://placehold.co/400x600/C06C84/FFFFFF.png', prompts: [{question: "My simple pleasures...", answer: "Spending hours haggling for spices or watching the sunset over the Atlas Mountains."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
    { id: 'user14', name: 'David', age: 30, location: 'Toronto, Canada', imageUrl: 'https://placehold.co/400x600/6C5B7B/FFFFFF.png', prompts: [{question: "I'm looking for someone who...", answer: "Challenges me and makes me laugh, preferably at the same time."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
    { id: 'user15', name: 'Isabella', age: 26, location: 'Rio de Janeiro, Brazil', imageUrl: 'https://placehold.co/400x600/F8B195/3A3B3C.png', prompts: [{question: "My motto is...", answer: "Life is a party, so let's dance!"}], selectedAvatar: { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' } },
    { id: 'user16', name: 'Omar', age: 35, location: 'Cairo, Egypt', imageUrl: 'https://placehold.co/400x600/F67280/FFFFFF.png', prompts: [{question: "I dream of...", answer: "Uncovering a hidden tomb."}], selectedAvatar: { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' } },
    { id: 'user17', name: 'Hana', age: 28, location: 'Seoul, South Korea', imageUrl: 'https://placehold.co/400x600/355C7D/FFFFFF.png', prompts: [{question: "I get way too excited about...", answer: "Finding the coziest cafe in Seoul."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
    { id: 'user18', name: 'Alex', age: 31, location: 'London, UK', imageUrl: 'https://placehold.co/400x600/99B898/3A3B3C.png', prompts: [{question: "I know the best...", answer: "Speakeasies in London. Challenge me."}], selectedAvatar: { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' } },
    { id: 'user19', name: 'Priya', age: 29, location: 'Mumbai, India', imageUrl: 'https://placehold.co/400x600/A8A0B1/3A3B3C.png', prompts: [{question: "I love...", answer: "Street food, monsoon rains, and dancing like nobody's watching."}], selectedAvatar: { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' } },
    { id: 'user20', name: 'Matteo', age: 33, location: 'Rome, Italy', imageUrl: 'https://placehold.co/400x600/E84A5F/FFFFFF.png', prompts: [{question: "Let me...", answer: "Cook for you and we'll talk about art, history, and the meaning of la dolce vita."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
];


export default function Home() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  
  const [profiles, setProfiles] = useState(matchesData);
  const [swipeAction, setSwipeAction] = useState<'like' | 'dislike' | null>(null);
  const [swipedProfileId, setSwipedProfileId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);
  
  const handleSwipe = (action: 'like' | 'dislike') => {
    if (profiles.length === 0) return;
    
    const swipedProfile = profiles[0];
    setSwipedProfileId(swipedProfile.id);
    setSwipeAction(action);
    
    setTimeout(() => {
        setProfiles(prev => prev.slice(1));
        setSwipeAction(null);
        setSwipedProfileId(null);
    }, 500); // Corresponds to animation duration
  };

  if (loading || !isLoggedIn) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-muted/20">
      <Header />
       <main className="flex-1 flex flex-col items-center justify-center pt-4">
         <div className="relative w-full h-full max-w-xs flex items-center justify-center">
            {profiles.length > 0 ? (
                profiles.map((profile, i) => (
                    <MatchCard
                        key={profile.id}
                        profile={profile}
                        onSwipe={handleSwipe}
                        style={{
                            transform: `scale(${1 - (profiles.length - 1 - i) * 0.05}) translateY(-${(profiles.length - 1 - i) * 10}px)`,
                            opacity: 1 - (profiles.length - 1 - i) * 0.1,
                            zIndex: 10 - i,
                        }}
                        className={
                            swipedProfileId === profile.id
                            ? swipeAction === 'like' ? 'animate-swipe-right' : 'animate-swipe-left'
                            : ''
                        }
                    />
                )).reverse().slice(0, 2)
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-2xl font-bold">That's everyone!</p>
                    <p className="text-muted-foreground">You've seen all the profiles for now. Check back later!</p>
                </div>
            )}
        </div>
      </main>
      <footer className="sticky bottom-0 w-full bg-transparent py-4">
        <div className="container mx-auto px-4">
            {profiles.length > 0 && (
                <div className="flex justify-center items-center gap-8">
                      <div className="action-btn dislike" onClick={() => handleSwipe('dislike')}>
                        <X className="h-8 w-8"/>
                    </div>
                    <div className="action-btn super-like">
                        <Star className="h-8 w-8" />
                    </div>
                    <div className="action-btn like" onClick={() => handleSwipe('like')}>
                        <Heart className="h-8 w-8"/>
                    </div>
                </div>
            )}
        </div>
    </footer>
    </div>
  );
}
