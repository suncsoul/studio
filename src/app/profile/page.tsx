
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Camera, Trash2 } from "lucide-react";
import { Header } from "@/components/header";
import { Badges } from "@/components/badges";

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  profileText: z.string().min(20, "Bio must be at least 20 characters."),
});

const initialPhotos = [
  "https://placehold.co/400x400.png",
  "https://placehold.co/400x400.png",
  "https://placehold.co/400x400.png",
];

export default function ProfilePage() {
  const { toast } = useToast();
  const [usernameChangeCount, setUsernameChangeCount] = useState(0);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "julian_k",
      phoneNumber: "123-456-7890",
      email: "julian.k@example.com",
      profileText: "Just a guy who loves hiking, exploring new coffee shops, and debating about whether a hot dog is a sandwich. My humor is a bit dry, but my love for dogs is anything but. Looking for someone who doesn't take themselves too seriously.",
    },
  });
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== form.getValues("username")) {
        if (usernameChangeCount >= 2) {
             toast({
                variant: "destructive",
                title: "Cannot change username",
                description: "You have already changed your username twice.",
            });
            e.target.value = form.getValues("username");
        }
    }
    form.setValue("username", e.target.value);
  }

  function onSubmit(values: z.infer<typeof profileSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values);
    if(form.formState.dirtyFields.username){
        setUsernameChangeCount(prev => prev + 1);
    }
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    form.reset(values); // Resets the form's dirty state
  }

  const addPhoto = () => {
    setPhotos(prev => [...prev, "https://placehold.co/400x400.png"]);
  };

  const removePhoto = (index: number) => {
    if (photos.length > 3) {
      setPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      toast({
        variant: "destructive",
        title: "Minimum Photos Required",
        description: "You must have at least 3 photos.",
      });
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 bg-muted/20">
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Management</CardTitle>
                                <CardDescription>Manage your public profile and personal information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Profile Photos</h3>
                                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {photos.map((photo, index) => (
                                                    <div key={index} className="relative group aspect-square">
                                                        <Image src={photo} alt={`Profile photo ${index + 1}`} fill className="rounded-md object-cover" data-ai-hint="person photo" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                                            <Button type="button" variant="destructive" size="icon" onClick={() => removePhoto(index)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addPhoto} className="flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-md hover:bg-muted transition-colors">
                                                    <Camera className="h-8 w-8 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground mt-2">Add Photo</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>Name</Label>
                                                <Input value="Julian K." disabled />
                                                <p className="text-xs text-muted-foreground">Your name cannot be changed.</p>
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="e.g., cool_user_99" 
                                                                {...field}
                                                                onChange={handleUsernameChange}
                                                                disabled={usernameChangeCount >= 2}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                         <p className="text-xs text-muted-foreground">Changes remaining: {2 - usernameChangeCount}</p>
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="space-y-2">
                                                <Label>Date of Birth</Label>
                                                <Input value="October 23, 1992" disabled />
                                                <p className="text-xs text-muted-foreground">Your date of birth cannot be changed.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <Input value="Male" disabled />
                                                <p className="text-xs text-muted-foreground">Your gender cannot be changed.</p>
                                            </div>
                                             <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="your.email@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Phone Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter your phone number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                         <FormField
                                            control={form.control}
                                            name="profileText"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Your Profile Bio</FormLabel>
                                                <FormControl>
                                                    <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="Tell us about yourself..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />

                                        <div className="flex justify-end">
                                            <Button type="submit" disabled={!form.formState.isDirty}>Save Changes</Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-8">
                        <Badges />
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
