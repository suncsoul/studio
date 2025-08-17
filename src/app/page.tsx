
'use client';

import { Header } from "@/components/header";
import { MatchCard } from "@/components/match-card";
import { WhosDownCard } from "@/components/whos-down-card";
import { HireCompanionCard } from "@/components/hire-companion-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  Briefcase,
  Bot
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ToDo: Replace with actual auth state
const useAuth = () => ({
  isLoggedIn: false
});


const matches = [
  { name: "Seraphina", age: 28, location: "Venice, Italy", imageUrl: "https://placehold.co/400x600/F5E0C3/2C2C2C.png", mbti: "INFJ", loveLanguage: "Quality Time", humorStyle: "Witty", isVerified: true, bio: "A lover of ancient stories, hidden alleyways, and the scent of old books. Seeking a partner for moonlit gondola rides and philosophical debates over espresso. I believe every person is a story waiting to be told." },
  { name: "Julian", age: 31, location: "Kyoto, Japan", imageUrl: "https://placehold.co/400x600/2C2C2C/FAFAFA.png", mbti: "ENTP", loveLanguage: "Physical Touch", humorStyle: "Sarcastic", isVerified: true, bio: "Wandering through timeless temples by day, debating in neon-lit izakayas by night. My mind moves as fast as a Shinkansen. Challenge me to a game of Go, or join me in finding the best ramen in town." },
  { name: "Chloe", age: 26, location: "Austin, Texas", imageUrl: "https://placehold.co/400x600/FF6F61/FAFAFA.png", mbti: "ESFP", loveLanguage: "Words of Affirmation", humorStyle: "Goofy", isVerified: false, bio: "Fueled by live music, tacos, and sunshine. You can find me two-stepping at The Continental Club or paddleboarding on Lady Bird Lake. Looking for a spontaneous soul who can keep up with my energy." },
  { name: "Leo", age: 29, location: "Berlin, Germany", imageUrl: "https://placehold.co/400x600/009688/FAFAFA.png", mbti: "ISTP", loveLanguage: "Acts of Service", humorStyle: "Dry", isVerified: true, bio: "Engineer by trade, artist by heart. I find beauty in brutalist architecture and techno beats. My ideal date is exploring an abandoned factory, followed by a quiet beer at a kiez bar. I fix things, including bad days." },
  { name: "Elena", age: 24, location: "Barcelona, Spain", imageUrl: "https://placehold.co/400x600/BDBDBD/2C2C2C.png", mbti: "ENFP", loveLanguage: "Gifts", humorStyle: "Playful", isVerified: true, bio: "A whirlwind of creativity and passion, inspired by Gaudí's mosaics and the rhythm of flamenco. Let's get lost in the Gothic Quarter, share tapas until we're full, and dream up our next big adventure." },
  { name: "Marcus", age: 33, location: "New York, USA", imageUrl: "https://placehold.co/400x600/795548/FAFAFA.png", mbti: "ESTJ", loveLanguage: "Quality Time", humorStyle: "Observational", isVerified: false, bio: "Ambitious, driven, and always on the move. I thrive on the energy of this city, from Wall Street deals to Broadway shows. Looking for an equally ambitious partner who knows what they want and isn't afraid to go for it." },
  { name: "Aisha", age: 27, location: "Dubai, UAE", imageUrl: "https://placehold.co/400x600/FFC107/2C2C2C.png", mbti: "ISFJ", loveLanguage: "Acts of Service", humorStyle: "Kind", isVerified: true, bio: "A blend of modern luxury and ancient traditions. I enjoy serene desert safaris, high tea at the Burj Al Arab, and volunteering at the local souk. My loyalty is as strong as my karak chai." },
  { name: "Liam", age: 30, location: "Sydney, Australia", imageUrl: "https://placehold.co/400x600/4CAF50/FAFAFA.png", mbti: "INFP", loveLanguage: "Words of Affirmation", humorStyle: "Quirky", isVerified: true, bio: "Dreamer, surfer, and storyteller. I'm more at home in the ocean than on land. Let's watch the sunrise at Bondi Beach, have a deep conversation about the universe, and maybe write a song about it." },
  { name: "Mei", age: 25, location: "Shanghai, China", imageUrl: "https://placehold.co/400x600/E91E63/FAFAFA.png", mbti: "INTJ", loveLanguage: "Physical Touch", humorStyle: "Intellectual", isVerified: false, bio: "A strategist in the world of finance and in life. I appreciate efficiency, intelligence, and a well-executed plan. Let's discuss futurism over xiaolongbao or explore the contemporary art scene in M50." },
  { name: "Javier", age: 32, location: "Mexico City, Mexico", imageUrl: "https://placehold.co/400x600/3F51B5/FAFAFA.png", mbti: "ESFJ", loveLanguage: "Gifts", humorStyle: "Charismatic", isVerified: true, bio: "My heart beats to the rhythm of mariachi music and the vibrant colors of Frida Kahlo's art. I'm a fantastic host who loves to share the rich culture and cuisine of my city. Let me show you the real CDMX." },
];

const whosDownItems = [
    { userName: "Marco", userAvatarUrl: "https://placehold.co/100x100/9D00FF/FAFAFA.png", activity: "Coffee in 30 mins?", time: "2m ago", bondType: "activity" as const, vibe: "Casual Chat", distance: "0.5 miles away", bio: "Caffeine enthusiast looking for a quick chat before my next meeting. Let's talk about anything and everything." },
    { userName: "Anya", userAvatarUrl: "https://placehold.co/100x100/00F0FF/2C2C2C.png", activity: "Indie concert tonight, need a +1!", time: "1h ago", bondType: "event" as const, vibe: "Adventure Buddy", distance: "2 miles away", bio: "Music is my life. I have an extra ticket to see 'The Wandering Echoes' and I hate going alone. Let's vibe together!" },
    { userName: "Kenji", userAvatarUrl: "https://placehold.co/100x100/FFEE00/2C2C2C.png", activity: "Weekend trip to the coast, anyone?", time: "5h ago", bondType: "travel" as const, vibe: "Explorer", distance: "25 miles away", bio: "Spur-of-the-moment trip to the coast. I've got the car and the snacks, just need a co-pilot who loves the sea." },
    { userName: "Sofia", userAvatarUrl: "https://placehold.co/100x100/FF6347/FFFFFF.png", activity: "Morning yoga in the park", time: "15m ago", bondType: "activity" as const, vibe: "Wellness Seeker", distance: "1 mile away", bio: "Let's start the day with some sun salutations and good vibes. All levels welcome, just bring a mat and a positive attitude." },
    { userName: "Ben", userAvatarUrl: "https://placehold.co/100x100/4682B4/FFFFFF.png", activity: "Tech meetup downtown", time: "3h ago", bondType: "event" as const, vibe: "Networking", distance: "5 miles away", bio: "Heading to a talk on the future of AI. It would be great to connect with another tech enthusiast and exchange ideas." },
    { userName: "Lila", userAvatarUrl: "https://placehold.co/100x100/32CD32/2C2C2C.png", activity: "Volunteering at the animal shelter", time: "8h ago", bondType: "activity" as const, vibe: "Kindred Spirit", distance: "3 miles away", bio: "Need a fellow animal lover to help walk dogs and clean cages. It's rewarding work and the puppies are adorable!" },
    { userName: "Omar", userAvatarUrl: "https://placehold.co/100x100/FFD700/2C2C2C.png", activity: "Road trip to the mountains next weekend", time: "1d ago", bondType: "travel" as const, vibe: "Thrill Seeker", distance: "50 miles away", bio: "The mountains are calling! I'm planning a hiking and camping trip. If you're not afraid of a little dirt, let's go." },
    { userName: "Grace", userAvatarUrl: "https://placehold.co/100x100/BA55D3/FFFFFF.png", activity: "Book club meeting this evening", time: "45m ago", bondType: "event" as const, vibe: "Intellectual", distance: "1.5 miles away", bio: "We're discussing 'Project Hail Mary' tonight. Come join for some lively debate and literary chat. Wine will be provided." },
    { userName: "Alex", userAvatarUrl: "https://placehold.co/100x100/6A5ACD/FFFFFF.png", activity: "Late-night board games?", time: "5m ago", bondType: "activity" as const, vibe: "Gamer", distance: "0.2 miles away", bio: "My friends bailed on game night. I've got a closet full of board games and a competitive spirit. Up for a challenge?" },
    { userName: "Fatima", userAvatarUrl: "https://placehold.co/100x100/20B2AA/FFFFFF.png", activity: "Salsa dancing class", time: "2h ago", bondType: "activity" as const, vibe: "Dancer", distance: "4 miles away", bio: "The music is calling! Looking for a partner for a drop-in salsa class tonight. No experience necessary, just a willingness to move." },
    { userName: "Noah", userAvatarUrl: "https://placehold.co/100x100/778899/FFFFFF.png", activity: "Attending a film festival", time: "6h ago", bondType: "event" as const, vibe: "Cinephile", distance: "10 miles away", bio: "I have a pass for the indie film festival but no one to go with. Let's watch some obscure films and pretend we're critics." },
    { userName: "Priya", userAvatarUrl: "https://placehold.co/100x100/DC143C/FFFFFF.png", activity: "Spontaneous trip to Paris next month", time: "3d ago", bondType: "travel" as const, vibe: "Globetrotter", distance: "N/A", bio: "Booked a flight to Paris on a whim! Looking for a travel buddy to explore the city of lights with me. Must love croissants." },
    { userName: "Daniel", userAvatarUrl: "https://placehold.co/100x100/00FFFF/2C2C2C.png", activity: "Co-working at a cafe", time: "20m ago", bondType: "activity" as const, vibe: "Productive Pal", distance: "0.8 miles away", bio: "I work better with company. Let's grab a table, put on our headphones, and be productive together. We can celebrate with a pastry after." },
    { userName: "Eva", userAvatarUrl: "https://placehold.co/100x100/FF4500/FFFFFF.png", activity: "Food truck festival this weekend", time: "10h ago", bondType: "event" as const, vibe: "Foodie", distance: "6 miles away", bio: "So many food trucks, so little time. I need a partner in crime to help me sample as much as possible. Let's eat!" },
];

const hireCompanions = [
    { providerName: "Isabelle", providerAvatarUrl: "https://placehold.co/100x100/FF2A6D/FFFFFF.png", service: "Active Listener & Virtual Chat", rate: 35, isVerified: true, isBackgroundChecked: true, rating: 4.9, bio: "I offer a safe and non-judgmental space for you to share whatever is on your mind. With a background in psychology, I'm here to listen, support, and help you gain clarity. Let's talk it out." },
    { providerName: "David", providerAvatarUrl: "https://placehold.co/100x100/00FF87/2C2C2C.png", service: "Fitness Buddy & Motivator", rate: 50, isVerified: true, isBackgroundChecked: true, rating: 4.8, bio: "Need a push to reach your fitness goals? As a certified personal trainer, I'll be your virtual workout partner, motivator, and accountability coach. Let's sweat and get stronger together." },
    { providerName: "Sophia", providerAvatarUrl: "https://placehold.co/100x100/00F0FF/2C2C2C.png", service: "Event +1 & Social Navigator", rate: 60, isVerified: true, isBackgroundChecked: false, rating: 4.95, bio: "Nervous about attending a social or professional event alone? I'll be your charismatic and engaging plus-one, helping you break the ice, navigate conversations, and make a great impression." },
    { providerName: "Ethan", providerAvatarUrl: "https://placehold.co/100x100/FFD700/2C2C2C.png", service: "Career Coach & Mock Interviewer", rate: 75, isVerified: true, isBackgroundChecked: true, rating: 4.98, bio: "With 10+ years in HR at top tech companies, I provide expert career advice, resume reviews, and rigorous mock interviews to help you land your dream job. Invest in your future." },
    { providerName: "Olivia", providerAvatarUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF.png", service: "Museum & Art Gallery Guide", rate: 45, isVerified: true, isBackgroundChecked: true, rating: 4.85, bio: "As an art history graduate, I bring art to life. Join me for a curated tour of your local museum or gallery, where we'll uncover the hidden stories and meanings behind the masterpieces." },
    { providerName: "Michael", providerAvatarUrl: "https://placehold.co/100x100/5F9EA0/FFFFFF.png", service: "Deep Conversations & Philosophy", rate: 40, isVerified: true, isBackgroundChecked: false, rating: 4.92, bio: "Tired of small talk? Let's dive deep. From Stoicism to existentialism, I'm your companion for exploring the big questions in life. A judgment-free zone for intellectual curiosity." },
    { providerName: "Ava", providerAvatarUrl: "https://placehold.co/100x100/FF7F50/2C2C2C.png", service: "Personal Shopper & Style Consultant", rate: 65, isVerified: true, isBackgroundChecked: false, rating: 4.88, bio: "Let's reinvent your wardrobe! I'll help you discover your personal style, curate outfits that make you feel confident, and make shopping a fun and stress-free experience." },
    { providerName: "William", providerAvatarUrl: "https://placehold.co/100x100/6495ED/FFFFFF.png", service: "Travel Planner & Itinerary Builder", rate: 55, isVerified: true, isBackgroundChecked: true, rating: 4.96, bio: "Planning a trip can be overwhelming. I'll be your personal travel concierge, crafting a bespoke itinerary with hidden gems and local secrets to make your next vacation unforgettable." },
    { providerName: "Mia", providerAvatarUrl: "https://placehold.co/100x100/DC143C/FFFFFF.png", service: "Gourmet Cooking Companion", rate: 70, isVerified: false, isBackgroundChecked: false, rating: 4.82, bio: "Let's turn your kitchen into a culinary studio! As a former professional chef, I'll guide you through gourmet recipes, from mastering knife skills to plating like a pro. Fun and delicious." },
    { providerName: "James", providerAvatarUrl: "https://placehold.co/100x100/008B8B/FFFFFF.png", service: "Language Exchange Partner", rate: 30, isVerified: true, isBackgroundChecked: false, rating: 4.91, bio: "Practice your English with a native speaker in a relaxed, conversational setting. I'll help you improve your fluency, correct your grammar, and build your confidence. All levels welcome." },
    { providerName: "Charlotte", providerAvatarUrl: "https://placehold.co/100x100/B8860B/FFFFFF.png", service: "Mindfulness & Meditation Guide", rate: 40, isVerified: true, isBackgroundChecked: true, rating: 4.97, bio: "In a world of noise, find your center. I am a certified mindfulness instructor, and I will guide you through personalized meditation sessions to reduce stress, improve focus, and cultivate inner peace." },
    { providerName: "Benjamin", providerAvatarUrl: "https://placehold.co/100x100/483D8B/FFFFFF.png", service: "City Tour Guide", rate: 50, isVerified: true, isBackgroundChecked: true, rating: 4.89, bio: "Forget the tourist traps. As a lifelong local, I'll show you the real city—the hidden cafes, secret parks, and vibrant neighborhoods that make this place special. Let's go on an adventure." },
];

export default function Home() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged in, redirect them to the login page.
    // This is a placeholder for real authentication logic.
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // If not logged in, we can show a loading state or nothing, 
  // as the redirect will happen shortly.
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="matches" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid w-full grid-cols-4 md:w-[800px]">
                <TabsTrigger value="matches"><Heart className="mr-2 h-4 w-4"/>Find Matches</TabsTrigger>
                <TabsTrigger value="whos-down"><Users className="mr-2 h-4 w-4" />Companion Mode</TabsTrigger>
                <TabsTrigger value="hire-companion"><Briefcase className="mr-2 h-4 w-4" />Hire a Companion</TabsTrigger>
                <TabsTrigger value="ai-features" asChild>
                    <Link href="/ai-features"><Bot className="mr-2 h-4 w-4"/>AI Features</Link>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="matches" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {matches.map((match, index) => (
                        <MatchCard key={index} {...match} />
                    ))}
                </div>
            </TabsContent>
            
            <TabsContent value="whos-down" className="mt-6">
                <div className="max-w-3xl mx-auto space-y-4">
                    {whosDownItems.map((item, index) => (
                        <WhosDownCard key={index} {...item} />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="hire-companion" className="mt-6">
                 <div className="max-w-3xl mx-auto space-y-4">
                    {hireCompanions.map((item, index) => (
                        <HireCompanionCard key={index} {...item} />
                    ))}
                </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built for human connection. © {new Date().getFullYear()} goodluck Inc.
            </p>
        </div>
      </footer>
    </div>
  );
}
