
"use client";

import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeShowcase } from "@/components/badge-showcase";
import { BrainCircuit, Heart, Laugh, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";

const matches = [
  { id: "user1", name: "Seraphina", age: 28, location: "Venice, Italy", imageUrl: "https://placehold.co/400x600/F5E0C3/2C2C2C.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "INFJ", loveLanguage: "Quality Time", humorStyle: "Witty", isVerified: true, bio: "A lover of ancient stories, hidden alleyways, and the scent of old books.", prompts: [{question: "A random skill I have is...", answer: "Perfectly recreating my grandmother's tiramisu recipe from memory."}, {question: "My ideal weekend involves...", answer: "Getting lost in a bookstore and then debating philosophy over espresso."}], selectedAvatar: { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' } },
  { id: "user2", name: "Julian", age: 31, location: "Kyoto, Japan", imageUrl: "https://placehold.co/400x600/2C2C2C/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ENTP", loveLanguage: "Physical Touch", humorStyle: "Sarcastic", isVerified: true, bio: "Wandering through timeless temples by day, debating in neon-lit izakayas by night.", prompts: [{question: "The key to my heart is...", answer: "Beating me at a game of Go. Or, you know, just being clever."}, {question: "A random skill I have is...", answer: "Finding the best ramen spot in any city within 24 hours."}], selectedAvatar: { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' } },
  { id: "user3", name: "Chloe", age: 26, location: "Austin, Texas", imageUrl: "https://placehold.co/400x600/FF6F61/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ESFP", loveLanguage: "Words of Affirmation", humorStyle: "Goofy", isVerified: false, bio: "Fueled by live music, tacos, and sunshine.", prompts: [{question: "My ideal weekend involves...", answer: "Two-stepping at The Continental Club, then paddleboarding on Lady Bird Lake."}, {question: "You should not go out with me if...", answer: "You can't handle spontaneous dance parties in the grocery store."}], selectedAvatar: { type: 'adventurer', emoji: '🗺️', title: 'Weekend Adventurer', description: 'Active & outgoing' } },
  { id: "user4", name: "Leo", age: 29, location: "Berlin, Germany", imageUrl: "https://placehold.co/400x600/009688/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ISTP", loveLanguage: "Acts of Service", humorStyle: "Dry", isVerified: true, bio: "Engineer by trade, artist by heart. I find beauty in brutalist architecture and techno beats.", prompts: [{question: "I fix things, including...", answer: "Bad days, leaky faucets, and poorly written code."}, {question: "My ideal weekend involves...", answer: "Exploring an abandoned factory, followed by a quiet beer at a kiez bar."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: "user5", name: "Elena", age: 24, location: "Barcelona, Spain", imageUrl: "https://placehold.co/400x600/BDBDBD/2C2C2C.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ENFP", loveLanguage: "Gifts", humorStyle: "Playful", isVerified: true, bio: "A whirlwind of creativity and passion, inspired by Gaudí's mosaics and the rhythm of flamenco.", prompts: [{question: "The key to my heart is...", answer: "A thoughtfully chosen souvenir from your travels, no matter how small."}, {question: "Let's debate this topic...", answer: "Whether churros are better with thick hot chocolate or dulce de leche."}], selectedAvatar: { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' } },
  { id: "user6", name: "Marcus", age: 33, location: "New York, USA", imageUrl: "https://placehold.co/400x600/795548/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ESTJ", loveLanguage: "Quality Time", humorStyle: "Observational", isVerified: false, bio: "Ambitious, driven, and always on the move.", prompts: [{question: "I'm looking for someone who...", answer: "Knows what they want and isn't afraid to go for it. Bonus points for a sharp suit."}, {question: "My ideal weekend involves...", answer: "Closing a deal and then celebrating with front-row tickets to a Broadway show."}], selectedAvatar: { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' } },
  { id: "user7", name: "Aisha", age: 27, location: "Dubai, UAE", imageUrl: "https://placehold.co/400x600/FFC107/2C2C2C.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ISFJ", loveLanguage: "Acts of Service", humorStyle: "Kind", isVerified: true, bio: "A blend of modern luxury and ancient traditions.", prompts: [{question: "The key to my heart is...", answer: "Remembering how I take my karak chai."}, {question: "My ideal weekend involves...", answer: "A serene desert safari followed by high tea at the Burj Al Arab."}], selectedAvatar: { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' } },
  { id: "user8", name: "Liam", age: 30, location: "Sydney, Australia", imageUrl: "https://placehold.co/400x600/4CAF50/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "INFP", loveLanguage: "Words of Affirmation", humorStyle: "Quirky", isVerified: true, bio: "Dreamer, surfer, and storyteller.", prompts: [{question: "I get way too excited about...", answer: "The possibility of writing a song about our first date."}, {question: "Let's debate this topic...", answer: "Is the ocean a metaphor for the subconscious, or just a really big body of water?"}], selectedAvatar: { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' } },
  { id: "user9", name: "Mei", age: 25, location: "Shanghai, China", imageUrl: "https://placehold.co/400x600/E91E63/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "INTJ", loveLanguage: "Physical Touch", humorStyle: "Intellectual", isVerified: false, bio: "A strategist in the world of finance and in life.", prompts: [{question: "I'm looking for someone who...", answer: "Appreciates efficiency, intelligence, and a well-executed plan."}, {question: "My ideal first date is...", answer: "A discussion about futurism over xiaolongbao, followed by a visit to the contemporary art scene in M50."}], selectedAvatar: { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' } },
  { id: "user10", name: "Javier", age: 32, location: "Mexico City, Mexico", imageUrl: "https://placehold.co/400x600/3F51B5/FAFAFA.png", photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"], mbti: "ESFJ", loveLanguage: "Gifts", humorStyle: "Charismatic", isVerified: true, bio: "My heart beats to the rhythm of mariachi music and the vibrant colors of Frida Kahlo's art.", prompts: [{question: "My simple pleasures...", answer: "Making people feel welcome in my city and sharing the best local food."}, {question: "A random skill I have is...", answer: "Making the perfect michelada from scratch."}], selectedAvatar: { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' } },
];


export default function ViewProfilePage() {
    const params = useParams();
    const name = decodeURIComponent(params.name as string);

    const profile = matches.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!profile) {
        notFound();
    }

    const { name: profileName, age, location, imageUrl, photos, bio, mbti, loveLanguage, humorStyle, isVerified, prompts } = profile;
    
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 bg-muted/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="overflow-hidden">
                                <div className="relative h-96 w-full">
                                    <Image src={imageUrl} alt={profileName} fill className="object-cover" data-ai-hint="person photo" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                      <div className="absolute bottom-0 left-0 p-4">
                                        <h1 className="text-3xl font-bold text-white">{profileName}, {age}</h1>
                                        <p className="text-lg text-white/90">{location}</p>
                                    </div>
                                    {isVerified && (
                                        <Badge variant="default" className="absolute right-4 top-4 bg-teal-500 text-white gap-1"><ShieldCheck className="h-4 w-4" />Verified</Badge>
                                    )}
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <p className="text-muted-foreground">{bio}</p>
                                    <div className="flex justify-center gap-4 pt-4">
                                         <Button className="w-full group-hover:animate-biorhythm-pulse" size="lg">Connect</Button>
                                    </div>
                                </CardContent>
                            </Card>
                             {photos && photos.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Photo Gallery</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {photos.map((photo: string, index: number) => (
                                                <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg">
                                                    <Image src={photo} alt={`${profileName}'s photo ${index + 1}`} fill className="object-cover transition-transform hover:scale-105" data-ai-hint="lifestyle photo" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personality Grid</CardTitle>
                                    <CardDescription>A glimpse into what makes them tick.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4">
                                            <BrainCircuit className="h-8 w-8 text-primary" />
                                            <span className="text-lg font-bold text-card-foreground">{mbti}</span>
                                            <span className="text-muted-foreground">MBTI</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4">
                                            <Heart className="h-8 w-8 text-accent" />
                                            <span className="text-lg font-bold text-card-foreground">{loveLanguage}</span>
                                            <span className="text-muted-foreground">Love Language</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4">
                                            <Laugh className="h-8 w-8 text-sky-500" />
                                            <span className="text-lg font-bold text-card-foreground">{humorStyle}</span>
                                            <span className="text-muted-foreground">Humor Style</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                             {prompts && prompts.length > 0 && (
                                <div className="space-y-6">
                                    {prompts.map((prompt, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle className="flex items-start gap-3">
                                                    <MessageSquareQuote className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                                    <span className="text-xl">{prompt.question}</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-lg text-foreground pl-9">{prompt.answer}</p>
                                            </CardContent>
                                            <CardContent>
                                                 <Button variant="outline" className="w-full">Comment on this</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                           
                            <BadgeShowcase />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
