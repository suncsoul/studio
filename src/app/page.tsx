
'use client';

import { Header } from "@/components/header";
import {
  Heart,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { MatchCard } from "@/components/match-card";


const matchesData = [
  { id: "user1", name: "Seraphina", age: 28, location: "Venice, Italy", imageUrl: "https://placehold.co/400x600/F5E0C3/2C2C2C.png", mbti: "INFJ", loveLanguage: "Quality Time", humorStyle: "Witty", isVerified: true, bio: "A lover of ancient stories, hidden alleyways, and the scent of old books.", prompts: [{question: "A random skill I have is...", answer: "Perfectly recreating my grandmother's tiramisu recipe from memory."}, {question: "My ideal weekend involves...", answer: "Getting lost in a bookstore and then debating philosophy over espresso."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
  { id: "user2", name: "Julian", age: 31, location: "Kyoto, Japan", imageUrl: "https://placehold.co/400x600/2C2C2C/FAFAFA.png", mbti: "ENTP", loveLanguage: "Physical Touch", humorStyle: "Sarcastic", isVerified: true, bio: "Wandering through timeless temples by day, debating in neon-lit izakayas by night.", prompts: [{question: "The key to my heart is...", answer: "Beating me at a game of Go. Or, you know, just being clever."}, {question: "A random skill I have is...", answer: "Finding the best ramen spot in any city within 24 hours."}], selectedAvatar: { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' } },
  { id: "user3", name: "Chloe", age: 26, location: "Austin, Texas", imageUrl: "https://placehold.co/400x600/FF6F61/FAFAFA.png", mbti: "ESFP", loveLanguage: "Words of Affirmation", humorStyle: "Goofy", isVerified: false, bio: "Fueled by live music, tacos, and sunshine.", prompts: [{question: "My ideal weekend involves...", answer: "Two-stepping at The Continental Club, then paddleboarding on Lady Bird Lake."}, {question: "You should not go out with me if...", answer: "You can't handle spontaneous dance parties in the grocery store."}], selectedAvatar: { type: 'adventurer', emoji: '🗺️', title: 'Weekend Adventurer', description: 'Active & outgoing' } },
  { id: "user4", name: "Leo", age: 29, location: "Berlin, Germany", imageUrl: "https://placehold.co/400x600/009688/FAFAFA.png", mbti: "ISTP", loveLanguage: "Acts of Service", humorStyle: "Dry", isVerified: true, bio: "Engineer by trade, artist by heart. I find beauty in brutalist architecture and techno beats.", prompts: [{question: "I fix things, including...", answer: "Bad days, leaky faucets, and poorly written code."}, {question: "My ideal weekend involves...", answer: "Exploring an abandoned factory, followed by a quiet beer at a kiez bar."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: "user5", name: "Elena", age: 24, location: "Barcelona, Spain", imageUrl: "https://placehold.co/400x600/BDBDBD/2C2C2C.png", mbti: "ENFP", loveLanguage: "Gifts", humorStyle: "Playful", isVerified: true, bio: "A whirlwind of creativity and passion, inspired by Gaudí's mosaics and the rhythm of flamenco.", prompts: [{question: "The key to my heart is...", answer: "A thoughtfully chosen souvenir from your travels, no matter how small."}, {question: "Let's debate this topic...", answer: "Whether churros are better with thick hot chocolate or dulce de leche."}], selectedAvatar: { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' } },
  { id: "user6", name: "Marcus", age: 33, location: "New York, USA", imageUrl: "https://placehold.co/400x600/795548/FAFAFA.png", mbti: "ESTJ", loveLanguage: "Quality Time", humorStyle: "Observational", isVerified: false, bio: "Ambitious, driven, and always on the move.", prompts: [{question: "I'm looking for someone who...", answer: "Knows what they want and isn't afraid to go for it. Bonus points for a sharp suit."}, {question: "My ideal weekend involves...", answer: "Closing a deal and then celebrating with front-row tickets to a Broadway show."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: "user7", name: "Aisha", age: 27, location: "Dubai, UAE", imageUrl: "https://placehold.co/400x600/FFC107/2C2C2C.png", mbti: "ISFJ", loveLanguage: "Acts of Service", humorStyle: "Kind", isVerified: true, bio: "A blend of modern luxury and ancient traditions.", prompts: [{question: "The key to my heart is...", answer: "Remembering how I take my karak chai."}, {question: "My ideal weekend involves...", answer: "A serene desert safari followed by high tea at the Burj Al Arab."}], selectedAvatar: { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' } },
  { id: "user8", name: "Liam", age: 30, location: "Sydney, Australia", imageUrl: "https://placehold.co/400x600/4CAF50/FAFAFA.png", mbti: "INFP", loveLanguage: "Words of Affirmation", humorStyle: "Quirky", isVerified: true, bio: "Dreamer, surfer, and storyteller.", prompts: [{question: "I get way too excited about...", answer: "The possibility of writing a song about our first date."}, {question: "Let's debate this topic...", answer: "Is the ocean a metaphor for the subconscious, or just a really big body of water?"}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
  { id: "user9", name: "Mei", age: 25, location: "Shanghai, China", imageUrl: "https://placehold.co/400x600/E91E63/FAFAFA.png", mbti: "INTJ", loveLanguage: "Physical Touch", humorStyle: "Intellectual", isVerified: false, bio: "A strategist in the world of finance and in life.", prompts: [{question: "I'm looking for someone who...", answer: "Appreciates efficiency, intelligence, and a well-executed plan."}, {question: "My ideal first date is...", answer: "A discussion about futurism over xiaolongbao, followed by a visit to the contemporary art scene in M50."}], selectedAvatar: { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' } },
  { id: "user10", name: "Javier", age: 32, location: "Mexico City, Mexico", imageUrl: "https://placehold.co/400x600/3F51B5/FAFAFA.png", mbti: "ESFJ", loveLanguage: "Gifts", humorStyle: "Charismatic", isVerified: true, bio: "My heart beats to the rhythm of mariachi music and the vibrant colors of Frida Kahlo's art.", prompts: [{question: "My simple pleasures...", answer: "Making people feel welcome in my city and sharing the best local food."}, {question: "A random skill I have is...", answer: "Making the perfect michelada from scratch."}], selectedAvatar: { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' } },
  { id: 'user11', name: 'Nora', age: 29, location: 'Dublin, Ireland', imageUrl: 'https://placehold.co/400x600/D2B48C/3A3B3C.png', mbti: 'INFP', loveLanguage: 'Quality Time', humorStyle: 'Self-deprecating', isVerified: true, bio: 'Librarian with a love for rainy days, trad music sessions in cozy pubs, and hiking the Wicklow Mountains.', prompts: [{question: "The key to my heart is...", answer: "A perfectly poured pint of Guinness and a good story."}, {question: "My ideal weekend involves...", answer: "Getting lost in a new city or an old book."}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
  { id: 'user12', name: 'Kenji', age: 34, location: 'Tokyo, Japan', imageUrl: 'https://placehold.co/400x600/222222/E0E0E0.png', mbti: 'ISTJ', loveLanguage: 'Acts of Service', humorStyle: 'Deadpan', isVerified: true, bio: 'Software architect by day, photographer by night.', prompts: [{question: "I value...", answer: "Clean code, minimalist design, and quiet corners of the city."}, {question: "You should not go out with me if...", answer: "You prefer tourist traps to hidden gems."}], selectedAvatar: { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' } },
  { id: 'user13', name: 'Fatima', age: 27, location: 'Marrakech, Morocco', imageUrl: 'https://placehold.co/400x600/C06C84/FFFFFF.png', mbti: 'ENFJ', loveLanguage: 'Words of Affirmation', humorStyle: 'Warm', isVerified: true, bio: 'Textile designer inspired by the vibrant colors of the souk.', prompts: [{question: "My simple pleasures...", answer: "Spending hours haggling for spices or watching the sunset over the Atlas Mountains."}, {question: "Let's debate this topic...", answer: "Is mint tea better with or without sugar?"}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
  { id: 'user14', name: 'David', age: 30, location: 'Toronto, Canada', imageUrl: 'https://placehold.co/400x600/6C5B7B/FFFFFF.png', mbti: 'ENTJ', loveLanguage: 'Quality Time', humorStyle: 'Witty', isVerified: false, bio: 'Startup founder with a passion for disruptive tech and a good debate.', prompts: [{question: "I'm looking for someone who...", answer: "Challenges me and makes me laugh, preferably at the same time."}, {question: "I de-stress by...", answer: "Playing hockey and trying new IPAs."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: 'user15', name: 'Isabella', age: 26, location: 'Rio de Janeiro, Brazil', imageUrl: 'https://placehold.co/400x600/F8B195/3A3B3C.png', mbti: 'ESFP', loveLanguage: 'Physical Touch', humorStyle: 'Flirty', isVerified: true, bio: 'Samba dancer and beach lover. Life is a party, and I\'m always on the dance floor.', prompts: [{question: "My motto is...", answer: "Life is a party, so let's dance!"}, {question: "My ideal first date is...", answer: "Sharing a caipirinha on Ipanema beach."}], selectedAvatar: { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' } },
  { id: 'user16', name: 'Omar', age: 35, location: 'Cairo, Egypt', imageUrl: 'https://placehold.co/400x600/F67280/FFFFFF.png', mbti: 'ISFP', loveLanguage: 'Gifts', humorStyle: 'Gentle', isVerified: false, bio: 'Archaeologist who feels more at home in the past.', prompts: [{question: "I dream of...", answer: "Uncovering a hidden tomb."}, {question: "Let's...", answer: "Play a game of senet and I'll tell you stories about the pharaohs."}], selectedAvatar: { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' } },
  { id: 'user17', name: 'Hana', age: 28, location: 'Seoul, South Korea', imageUrl: 'https://placehold.co/400x600/355C7D/FFFFFF.png', mbti: 'INFJ', loveLanguage: 'Acts of Service', humorStyle: 'Cute', isVerified: true, bio: 'Webtoon artist and cafe hopper. I\'m fueled by iced Americanos and dramatic K-dramas.', prompts: [{question: "I get way too excited about...", answer: "Finding the coziest cafe in Seoul."}, {question: "My ideal first date is...", answer: "We draw each other while drinking coffee."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
  { id: 'user18', name: 'Alex', age: 31, location: 'London, UK', imageUrl: 'https://placehold.co/400x600/99B898/3A3B3C.png', mbti: 'ESTP', loveLanguage: 'Quality Time', humorStyle: 'Banter', isVerified: true, bio: 'Fintech trader who works hard and plays harder.', prompts: [{question: "I know the best...", answer: "Speakeasies in London. Challenge me."}, {question: "On weekends, you can find me...", answer: "At a football match or exploring a new neighbourhood."}], selectedAvatar: { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' } },
  { id: 'user19', name: 'Priya', age: 29, location: 'Mumbai, India', imageUrl: 'https://placehold.co/400x600/A8A0B1/3A3B3C.png', mbti: 'ENFP', loveLanguage: 'Words of Affirmation', humorStyle: 'Dramatic', isVerified: false, bio: 'Aspiring Bollywood actress with a flair for the dramatic.', prompts: [{question: "I love...", answer: "Street food, monsoon rains, and dancing like nobody\'s watching."}, {question: "Let's...", answer: "Recreate a scene from our favorite movie."}], selectedAvatar: { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' } },
  { id: 'user20', name: 'Matteo', age: 33, location: 'Rome, Italy', imageUrl: 'https://placehold.co/400x600/E84A5F/FFFFFF.png', mbti: 'ESFJ', loveLanguage: 'Gifts', humorStyle: 'Charming', isVerified: true, bio: 'Chef who believes the best conversations happen over a plate of pasta.', prompts: [{question: "I learned all my best recipes from...", answer: "My grandmother. Non-negotiable."}, {question: "Let me...", answer: "Cook for you and we'll talk about art, history, and the meaning of la dolce vita."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
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
       <main className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative w-full h-full max-w-sm flex items-center justify-center">
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
      </main>
        <footer className="sticky bottom-0 w-full bg-transparent py-4">
            <div className="container mx-auto px-4">
                {profiles.length > 0 && (
                    <div className="flex justify-center items-center gap-8">
                        <Button onClick={() => handleSwipe('dislike')} variant="outline" className="h-20 w-20 rounded-full border-4 border-destructive text-destructive hover:bg-destructive/10">
                            <X className="h-12 w-12" />
                        </Button>
                        <Button onClick={() => handleSwipe('like')} variant="outline" className="h-20 w-20 rounded-full border-4 border-green-500 text-green-500 hover:bg-green-500/10">
                            <Heart className="h-12 w-12" />
                        </Button>
                    </div>
                )}
            </div>
        </footer>
    </div>
  );
}
