
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthLayout } from "@/components/auth-layout";
import { SocialButtons } from "@/components/social-buttons";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const registerSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required."),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required."),
    phoneNumber: z.string().min(10, "Please enter a valid phone number."),
    dob: z.string().min(1, "Date of birth is required."),
    gender: z.string().min(1, "Please select a gender."),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});


export default function RegisterPage() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            middleName: "",
            lastName: "",
            phoneNumber: "",
            dob: "",
            gender: "",
        },
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof z.infer<typeof registerSchema>)[] = [];
        if (step === 1) {
            fieldsToValidate = ['email', 'password', 'confirmPassword'];
        } else if (step === 2) {
            fieldsToValidate = ['firstName', 'lastName', 'phoneNumber'];
        }

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            nextStep();
        }
    };


    async function onSubmit(values: z.infer<typeof registerSchema>) {
         try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            
            // Initialize Firestore profile with all collected data
            await setDoc(doc(db, "users", user.uid), {
                email: values.email,
                firstName: values.firstName,
                middleName: values.middleName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                dob: values.dob,
                gender: values.gender,
                username: "goodluck",
                onboardingStage: 2, // Mark onboarding as complete
                createdAt: new Date(),
                usernameChangeCount: 0,
                dobChangeCount: 1, // Since it's set at registration
                genderChangeCount: 1, // Since it's set at registration
                isProfileVerified: false,
                photos: [],
            });

            toast({
                title: "Account Created",
                description: "Your profile is ready!",
            });
            setStep(4); // Move to the final confirmation step
        } catch (error: any) {
            let description = "An unexpected error occurred. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                description = "This email is already registered. Please log in.";
            }
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description,
            });
        }
    }

  return (
    <AuthLayout
        footerText={step < 4 ? "Join 142 people from your area today" : "Welcome to the community!"}
    >
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">Create your magic</CardTitle>
           <CardDescription>
            {step === 1 && "Join a community of authentic connections."}
            {step === 2 && "Tell us a bit about yourself."}
            {step === 3 && "Just a few more details."}
            {step === 4 && "You're all set!"}
          </CardDescription>
           <Progress value={(step / 4) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 && (
                        <>
                            <SocialButtons />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                    </span>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Email</Label>
                                        <FormControl>
                                            <Input type="email" placeholder="your.happiest@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Password</Label>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Confirm Password</Label>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" className="w-full" onClick={handleNextStep}>
                                Continue
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                         <>
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
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" className="w-full" onClick={prevStep}>Back</Button>
                                <Button type="button" className="w-full" onClick={handleNextStep}>Next</Button>
                            </div>
                        </>
                    )}

                     {step === 3 && (
                         <>
                             <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <Button type="button" variant="outline" className="w-full" onClick={prevStep}>Back</Button>
                                <Button type="submit" className="w-full">Create My Account</Button>
                            </div>
                        </>
                    )}


                    {step === 4 && (
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold">Welcome to goodluck!</h3>
                            <p className="text-muted-foreground">Your account has been created.</p>
                             <Button asChild className="w-full">
                                <Link href="/profile">Complete Your Profile</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/">Explore Matches</Link>
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" prefetch={false} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
