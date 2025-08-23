
'use client';

import { Header } from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Sparkles,
  MessageSquare,
  Bell,
  X,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, DocumentData, addDoc, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
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
  { id: 'user21', name: 'Grace', age: 25, location: 'San Francisco, USA', imageUrl: 'https://placehold.co/400x600/45B8AC/FFFFFF.png', mbti: 'INTP', loveLanguage: 'Acts of Service', humorStyle: 'Nerdy', isVerified: true, bio: 'Data scientist and rock climber.', prompts: [{question: "I love solving complex problems, whether...", answer: "On a climbing wall or in a dataset."}, {question: "Let's talk about...", answer: "AI ethics or go bouldering."}], selectedAvatar: { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' } },
  { id: 'user22', name: 'Andrei', age: 32, location: 'Moscow, Russia', imageUrl: 'https://placehold.co/400x600/3D405B/FFFFFF.png', mbti: 'INTJ', loveLanguage: 'Quality Time', humorStyle: 'Ironic', isVerified: false, bio: 'Classical musician and chess enthusiast.', prompts: [{question: "I appreciate the beauty of...", answer: "A complex symphony and a well-played game of chess."}, {question: "Join me for...", answer: "A concert at the Tchaikovsky Conservatory."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: 'user23', name: 'Sofia', age: 28, location: 'Buenos Aires, Argentina', imageUrl: 'https://placehold.co/400x600/F2C5B6/3A3B3C.png', mbti: 'ISFJ', loveLanguage: 'Physical Touch', humorStyle: 'Playful', isVerified: true, bio: 'Tango instructor and hopeless romantic.', prompts: [{question: "I believe...", answer: "Dance is the language of the soul."}, {question: "Let's get lost in...", answer: "The music and the cobblestone streets of San Telmo."}], selectedAvatar: { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' } },
  { id: 'user24', name: 'Ben', age: 30, location: 'Chicago, USA', imageUrl: 'https://placehold.co/400x600/8D99AE/FFFFFF.png', mbti: 'ENTP', loveLanguage: 'Words of Affirmation', humorStyle: 'Sarcastic', isVerified: true, bio: 'Improv comedian and architecture nerd.', prompts: [{question: "I can...", answer: "Tell you a joke and then explain the history of the building behind you."}, {question: "Let's catch a show at...", answer: "Second City or go on an architecture boat tour."}], selectedAvatar: { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' } },
  { id: 'user25', name: 'Amara', age: 27, location: 'Lagos, Nigeria', imageUrl: 'https://placehold.co/400x600/E07A5F/3D405B.png', mbti: 'ESTJ', loveLanguage: 'Acts of Service', humorStyle: 'Bold', isVerified: false, bio: 'Fashion entrepreneur with a love for Afrobeats and spicy jollof rice.', prompts: [{question: "My energy is...", answer: "Infectious. Try to keep up."}, {question: "Let's go to...", answer: "A gallery opening or dance the night away at the New Afrika Shrine."}], selectedAvatar: { type: 'adventurer', emoji: '🗺️', title: 'Weekend Adventurer', description: 'Active & outgoing' } },
  { id: 'user26', name: 'Lucas', age: 29, location: 'Stockholm, Sweden', imageUrl: 'https://placehold.co/400x600/BEE5BF/3A3B3C.png', mbti: 'ISTP', loveLanguage: 'Quality Time', humorStyle: 'Dry', isVerified: true, bio: 'Furniture designer and nature lover.', prompts: [{question: "I appreciate...", answer: "Simplicity, functionality, and a good fika."}, {question: "Let's take a ferry to...", answer: "The archipelago or explore the design shops in Södermalm."}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
  { id: 'user27', name: 'Jamila', age: 31, location: 'Cape Town, South Africa', imageUrl: 'https://placehold.co/400x600/FAD02C/3A3B3C.png', mbti: 'ENFJ', loveLanguage: 'Gifts', humorStyle: 'Warm', isVerified: true, bio: 'Marine biologist and activist.', prompts: [{question: "I'm passionate about...", answer: "Protecting our oceans. It's a big deal."}, {question: "Let's hike...", answer: "Table Mountain for sunrise or go wine tasting in Stellenbosch."}], selectedAvatar: { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' } },
  { id: 'user28', name: 'Finn', age: 26, location: 'Reykjavik, Iceland', imageUrl: 'https://placehold.co/400x600/8FCACA/3A3B3C.png', mbti: 'INFP', loveLanguage: 'Physical Touch', humorStyle: 'Quirky', isVerified: false, bio: 'Musician inspired by sagas and folklore.', prompts: [{question: "My life is the soundtrack to...", answer: "An indie film you haven't heard of yet."}, {question: "Let's chase...", answer: "The Northern Lights or find a hidden hot spring."}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
  { id: 'user29', name: 'Anong', age: 30, location: 'Bangkok, Thailand', imageUrl: 'https://placehold.co/400x600/EF476F/FFFFFF.png', mbti: 'ESFP', loveLanguage: 'Words of Affirmation', humorStyle: 'Energetic', isVerified: true, bio: 'Street food blogger and Muay Thai practitioner.', prompts: [{question: "I can be...", answer: "Sweet or spicy. Depends on the day."}, {question: "I know the best spots for...", answer: "Boat noodles and mango sticky rice. Don't question me on this."}], selectedAvatar: { type: 'adventurer', emoji: '🗺️', title: 'Weekend Adventurer', description: 'Active & outgoing' } },
  { id: 'user30', name: 'Santiago', age: 34, location: 'Havana, Cuba', imageUrl: 'https://placehold.co/400x600/FFD166/3A3B3C.png', mbti: 'ESTP', loveLanguage: 'Quality Time', humorStyle: 'Charismatic', isVerified: true, bio: 'Musician and classic car restorer.', prompts: [{question: "My life has a...", answer: "Rhythm and a vintage filter."}, {question: "Let's drive down...", answer: "The Malecón in a '57 Chevy and dance salsa until dawn."}], selectedAvatar: { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' } },
];


export default function Home() {
  const { isLoggedIn, loading, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profiles, setProfiles] = useState(matchesData);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [isLikesLoading, setIsLikesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("matches");

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);
  
  useEffect(() => {
    if (user) {
      const fetchLikes = async () => {
        setIsLikesLoading(true);
        try {
          const likesQuery = query(collection(db, 'likes'), where('likedId', '==', user.uid));
          const likesSnapshot = await getDocs(likesQuery);
          
          const likersPromises = likesSnapshot.docs.map(likeDoc => {
              const likerId = likeDoc.data().likerId;
              const likerProfile = matchesData.find(m => m.id === likerId);
              return likerProfile ? { ...likerProfile, likeId: likeDoc.id } : null;
          });
  
          const likers = (await Promise.all(likersPromises)).filter(Boolean);
          setLikes(likers as DocumentData[]);
        } catch (error) {
          console.error("Error fetching likes:", error);
        } finally {
          setIsLikesLoading(false);
        }
      };
      
      fetchLikes();
    }
  }, [user]);

  const handleSwipe = (action: 'like' | 'dislike') => {
    const swipedProfile = profiles[0];
    
    // For "like", a comment is required. This would be handled in the MatchCard component
    // which would call this function with the comment. For now, we'll simulate.
    if (action === 'like') {
        toast({
            title: "Comment to Like!",
            description: `To connect with ${swipedProfile.name}, you must comment on their profile.`,
            variant: "default",
        });
        // In a real implementation, we wouldn't swipe yet.
        // We'd show a comment modal. For now, we'll just swipe.
    }
    
    console.log(`${action}d ${swipedProfile.name}`);

    // Remove the profile from the stack.
    setProfiles(prev => prev.slice(1));
  };


  if (loading || !isLoggedIn) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  const tabs = [
    { value: "matches", icon: Users, label: "Matches", color: "hover:text-red-500 data-[state=active]:text-red-500" },
    { value: "likes", icon: Bell, label: "Likes", color: "hover:text-pink-500 data-[state=active]:text-pink-500" },
    { value: "messages", icon: MessageSquare, label: "Messages", color: "hover:text-blue-500 data-[state=active]:text-blue-500" },
    { value: "ai-features", icon: Sparkles, label: "AI Features", color: "hover:text-yellow-400 data-[state=active]:text-yellow-400", href: "/ai-features" },
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-muted/20">
      <Header />
       <main className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="flex-1 relative">
                <TabsContent value="matches" className="w-full h-full m-0">
                    {profiles.length > 0 ? (
                        profiles.slice(0, 2).map((profile, index) => (
                            <MatchCard
                                key={profile.id}
                                profile={profile}
                                onSwipe={handleSwipe}
                                style={{ 
                                    zIndex: profiles.length - index,
                                    transform: `scale(${1 - (profiles.length - index - 1) * 0.05}) translateY(${(profiles.length - index - 1) * -10}px)`,
                                    opacity: index === profiles.length - 1 ? 1 : 0.8,
                                }}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-2xl font-bold">That's everyone!</p>
                            <p className="text-muted-foreground">You've seen all the profiles for now. Check back later!</p>
                        </div>
                    )}
                </TabsContent>
                
                <TabsContent value="likes" className="mt-6">
                    <div className="container mx-auto px-4">
                    {isLikesLoading ? (
                        <div className="text-center py-16">Loading likes...</div>
                    ) : likes.length === 0 ? (
                        <div className="text-center py-16">
                        <h2 className="text-2xl font-bold">Likes You</h2>
                        <p className="text-muted-foreground">People who have liked you will show up here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {likes.map((like) => (
                            <Card key={like.id} className="group w-full max-w-sm block overflow-hidden">
                                <CardHeader className="relative p-0">
                                <div className="relative h-72 w-full bg-muted flex items-center justify-center">
                                    {like.selectedAvatar ? (
                                    <div className="flex flex-col items-center justify-center text-center p-4">
                                        <span className="text-8xl">{like.selectedAvatar.emoji}</span>
                                        <p className="mt-2 text-lg font-bold text-foreground">{like.selectedAvatar.title}</p>
                                    </div>
                                    ) : (
                                    <div className="flex flex-col items-center justify-center text-center p-4 filter blur-md transition-all duration-300 group-hover:blur-sm">
                                        <Image src={like.imageUrl} alt="Blurred profile" fill className="object-cover" />
                                    </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                </CardHeader>
                                <CardContent className="p-4 bg-card/80 flex-grow text-center">
                                <h3 className="font-semibold text-lg">Someone's interested!</h3>
                                <p className="text-sm text-muted-foreground">Connect with them to reveal their profile.</p>
                                <Button className="mt-4 w-full">Connect Back</Button>
                                </CardContent>
                            </Card>
                        ))}
                        </div>
                    )}
                    </div>
                </TabsContent>

                 <TabsContent value="messages" className="mt-6">
                    <div className="container mx-auto px-4">
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold">Your Messages</h2>
                        <p className="text-muted-foreground">Conversations with your connections will appear here.</p>
                    </div>
                    </div>
                </TabsContent>
            </div>
            <footer className="sticky bottom-0 w-full bg-background/80 backdrop-blur-sm border-t">
                <div className="container mx-auto px-4 py-2">
                    {activeTab === 'matches' && profiles.length > 0 && (
                        <div className="flex justify-center items-center gap-4 mb-2">
                            <Button onClick={() => handleSwipe('dislike')} variant="outline" className="h-16 w-16 rounded-full border-4 border-destructive text-destructive hover:bg-destructive/10">
                                <X className="h-12 w-12" />
                            </Button>
                            <Button onClick={() => handleSwipe('like')} variant="outline" className="h-16 w-16 rounded-full border-4 border-green-500 text-green-500 hover:bg-green-500/10">
                                <Heart className="h-12 w-12" />
                            </Button>
                        </div>
                    )}
                     <TooltipProvider>
                        <TabsList className="grid w-full grid-cols-4">
                        {tabs.map((tab) => (
                            <Tooltip key={tab.value}>
                            <TooltipTrigger asChild>
                                <TabsTrigger value={tab.value} asChild={!!tab.href} onClick={() => !tab.href && setActiveTab(tab.value)}>
                                {tab.href ? (
                                    <Link href={tab.href}>
                                    <tab.icon className={`h-5 w-5 transition-colors ${tab.color}`} />
                                    </Link>
                                ) : (
                                    <tab.icon className={`h-5 w-5 transition-colors ${tab.color}`} />
                                )}
                                </TabsTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tab.label}</p>
                            </TooltipContent>
                            </Tooltip>
                        ))}
                        </TabsList>
                    </TooltipProvider>
                </div>
            </footer>
          </Tabs>
      </main>
    </div>
  );
}
