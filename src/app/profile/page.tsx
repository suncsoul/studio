
"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
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
import { BadgeShowcase } from "@/components/badge-showcase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar, Avatar as AvatarType } from "@/lib/avatars";
import { allAvatars } from "@/lib/avatars";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  profileText: z.string().min(20, "Bio must be at least 20 characters."),
  photos: z.array(z.string()).min(1, "You must have at least 1 photo to complete your profile."),
  dob: z.string().min(1, "Date of birth is required."),
  gender: z.string().min(1, "Please select a gender."),
  selectedAvatar: z.custom<AvatarType>(),
});

const initialPhotos: string[] = [];

export default function ProfilePage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [usernameChangeCount, setUsernameChangeCount] = useState(0);
    const [dobChangeCount, setDobChangeCount] = useState(0);
    const [genderChangeCount, setGenderChangeCount] = useState(0);
    const [isProfileVerified, setIsProfileVerified] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            username: "goodluck",
            phoneNumber: "",
            email: "",
            profileText: "",
            photos: initialPhotos,
            dob: "",
            gender: "",
            selectedAvatar: allAvatars[0],
        },
    });

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    form.reset({
                        firstName: data.firstName || "",
                        middleName: data.middleName || "",
                        lastName: data.lastName || "",
                        username: data.username || "goodluck",
                        phoneNumber: data.phoneNumber || "",
                        email: data.email || user.email || "",
                        profileText: data.profileText || "",
                        photos: data.photos || [],
                        dob: data.dob || "",
                        gender: data.gender || "",
                        selectedAvatar: data.selectedAvatar || allAvatars[0],
                    });
                    setUsernameChangeCount(data.usernameChangeCount || 0);
                    setDobChangeCount(data.dobChangeCount || 0);
                    setGenderChangeCount(data.genderChangeCount || 0);
                    setIsProfileVerified(data.isProfileVerified || false);
                } else {
                     form.reset({
                        ...form.getValues(),
                        email: user.email || "",
                     });
                }
            };
            fetchProfile();
        }
    }, [user, form.formState.isSubmitSuccessful, form]);
    

    const photos = form.watch("photos");
    const selectedAvatar = form.watch("selectedAvatar");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (usernameChangeCount >= 2) {
             toast({
                variant: "destructive",
                title: "Cannot change username",
                description: "You have already changed your username twice.",
            });
            return;
        }
        form.setValue("username", e.target.value, { shouldDirty: true });
    }

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        if (!user) {
            toast({ variant: "destructive", title: "Error", description: "You must be logged in." });
            return;
        }
        
        let newUsernameCount = usernameChangeCount;
        let newDobCount = dobChangeCount;
        let newGenderCount = genderChangeCount;

        if (form.formState.dirtyFields.username) {
            newUsernameCount++;
        }
        if (form.formState.dirtyFields.dob) {
            newDobCount++;
        }
        if (form.formState.dirtyFields.gender) {
            newGenderCount++;
        }
        
        const profileCompleted = !!(
            values.firstName &&
            values.lastName &&
            values.dob &&
            values.gender &&
            values.profileText &&
            values.photos.length > 0
        );

        const profileData = {
            ...values,
            usernameChangeCount: newUsernameCount,
            dobChangeCount: newDobCount,
            genderChangeCount: newGenderCount,
            updatedAt: new Date(),
            isProfileVerified: isProfileVerified || profileCompleted,
        };

        try {
            await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
            
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Could not update profile.",
            });
        }
    }
  
    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newPhotos = [...form.getValues("photos"), reader.result as string];
            form.setValue("photos", newPhotos, { shouldDirty: true, shouldValidate: true });
        };
        reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    }

    const removePhoto = (index: number) => {
        const currentPhotos = form.getValues("photos");
        const newPhotos = currentPhotos.filter((_, i) => i !== index);
        form.setValue("photos", newPhotos, { shouldDirty: true, shouldValidate: true });
    };

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1 bg-muted/20">
            <div className="container mx-auto px-4 py-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Management</CardTitle>
                                    <CardDescription>Manage your public profile and personal information.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Profile Photos</h3>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
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
                                            <button type="button" onClick={triggerFileUpload} className="flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-md hover:bg-muted transition-colors p-2">
                                                <Camera className="h-8 w-8 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground mt-2 text-center">Add Photo</span>
                                            </button>
                                            <FormControl>
                                                <Input 
                                                    type="file" 
                                                    className="hidden" 
                                                    ref={fileInputRef}
                                                    onChange={handlePhotoUpload}
                                                    accept="image/*"
                                                />
                                            </FormControl>
                                        </div>
                                         <FormMessage>{form.formState.errors.photos?.message}</FormMessage>
                                    </div>
                                    
                                    <FormField
                                        control={form.control}
                                        name="selectedAvatar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-medium">Choose Your Avatar</FormLabel>
                                                <CardDescription>This represents you before you match with someone. Can be changed once a week.</CardDescription>
                                                <FormControl>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                                                        {allAvatars.map((avatar) => (
                                                            <button 
                                                                type="button"
                                                                key={avatar.type} 
                                                                onClick={() => field.onChange(avatar)}
                                                                className={cn(
                                                                    "p-4 rounded-lg border-2 text-center transition-all space-y-2",
                                                                    selectedAvatar?.type === avatar.type 
                                                                        ? "border-primary bg-primary/10 shadow-lg scale-105"
                                                                        : "border-border bg-card hover:border-primary/50"
                                                                )}
                                                            >
                                                                <span className="text-4xl">{avatar.emoji}</span>
                                                                <p className="font-semibold text-card-foreground">{avatar.title}</p>
                                                                <p className="text-xs text-muted-foreground">{avatar.description}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl><Input placeholder="Your first name" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl><Input placeholder="Your last name" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="middleName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Middle Name (Optional)</FormLabel>
                                                    <FormControl><Input placeholder="Your middle name" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                                                     <p className="text-xs text-muted-foreground">Changes remaining: {Math.max(0, 2 - usernameChangeCount)}</p>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="dob"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} disabled={dobChangeCount >= 1} />
                                                    </FormControl>
                                                     <p className="text-xs text-muted-foreground">You can only set your date of birth once.</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                       <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value} disabled={genderChangeCount >= 1}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                     <p className="text-xs text-muted-foreground">You can only set your gender once.</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-8">
                           <BadgeShowcase unlockedBadges={isProfileVerified ? ["Profile Verified"] : []}/>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    </div>
  );
}
