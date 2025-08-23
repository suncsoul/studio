
'use client';

import { Header } from "@/components/header";
import {
  Heart,
  X,
  Users,
  Briefcase,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/match-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhosDownCard } from "@/components/whos-down-card";
import { HireCompanionCard } from "@/components/hire-companion-card";


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

const whosDownData = [
  { userName: "Chloe", userAvatarUrl: "https://placehold.co/100x100.png", activity: "Live music at The Continental", time: "Tonight, 9 PM", bondType: "event", vibe: "Chill", distance: "3 miles away" },
  { userName: "Julian", userAvatarUrl: "https://placehold.co/100x100.png", activity: "Weekend trip to Hakone", time: "This weekend", bondType: "travel", vibe: "Adventurous", distance: "Train ride away" },
  { userName: "Aisha", userAvatarUrl: "https://placehold.co/100x100.png", activity: "High tea at Burj Al Arab", time: "Tomorrow, 3 PM", bondType: "activity", vibe: "Luxury", distance: "5 miles away" },
];

const hireCompanionData = [
  { providerName: "Seraphina", providerAvatarUrl: "https://placehold.co/100x100.png", service: "Venice History Tour", rate: 75, isVerified: true, isBackgroundChecked: true, rating: 4.9 },
  { providerName: "Leo", providerAvatarUrl: "https://placehold.co/100x100.png", service: "Berlin Art Scene Guide", rate: 60, isVerified: true, isBackgroundChecked: false, rating: 4.8 },
  { providerName: "Javier", providerAvatarUrl: "https://placehold.co/100x100.png", service: "CDMX Street Food Expert", rate: 50, isVerified: true, isBackgroundChecked: true, rating: 5.0 },
];


export default function Home() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  
  const [profiles, setProfiles] = useState(matchesData);
  const [swipeAction, setSwipeAction] = useState<'like' | 'dislike' | null>(null);
  const [swipedProfileId, setSwipedProfileId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("matching");

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
       <main className="flex-1 flex flex-col items-center pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="matching"><Heart className="mr-2 h-4 w-4"/>Matching</TabsTrigger>
                <TabsTrigger value="whosdown"><Users className="mr-2 h-4 w-4"/>Who's Down</TabsTrigger>
                <TabsTrigger value="hire"><Briefcase className="mr-2 h-4 w-4"/>Hire</TabsTrigger>
            </TabsList>
            <TabsContent value="matching" className="flex-grow">
                 <div className="relative w-full h-[600px] flex items-center justify-center mt-4">
                    {profiles.length > 0 ? (
                        profiles.map((profile, index) => (
                            <MatchCard
                                key={profile.id}
                                profile={profile}
                                onSwipe={handleSwipe}
                                className={
                                    swipedProfileId === profile.id
                                    ? swipeAction === 'like' ? 'animate-swipe-right' : 'animate-swipe-left'
                                    : ''
                                }
                            />
                        )).slice(0,1)
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-2xl font-bold">That's everyone!</p>
                            <p className="text-muted-foreground">You've seen all the profiles for now. Check back later!</p>
                        </div>
                    )}
                </div>
            </TabsContent>
            <TabsContent value="whosdown">
                 <div className="space-y-4 py-4">
                    {whosDownData.map((item, index) => (
                        <WhosDownCard key={index} {...item} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="hire">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {hireCompanionData.map((item, index) => (
                        <HireCompanionCard key={index} {...item} />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </main>
        {activeTab === 'matching' && (
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
        )}
    </div>
  );
}
