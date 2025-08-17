
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AuthLayout } from "@/components/auth-layout";
import { SocialButtons } from "@/components/social-buttons";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const registerSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string()
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
            confirmPassword: ""
        },
    });

    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values);
         // ToDo: Implement Firebase createUserWithEmailAndPassword
        /*
        import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
        import { doc, setDoc } from "firebase/firestore"; 
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Initialize Firestore profile
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                onboardingStage: 1,
                createdAt: new Date(),
            });
            // Redirect to next step of onboarding
        })
        .catch((error) => {
            let description = "An unexpected error occurred. Please try again.";
            if (error.code === 'auth/email-already-in-use') {
                description = "This email is already registered. Please log in.";
            }
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description,
            });
        });
        */
        toast({
            title: "Account Created (Simulated)",
            description: "Please check your email for verification.",
        });
        setStep(2); // Move to a simulated next step
    }

  return (
    <AuthLayout
        footerText="Join 142 people from your area today"
    >
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">Create your magic</CardTitle>
          <CardDescription>
            Join a community of authentic connections. It only takes a minute.
          </CardDescription>
           <Progress value={step === 1 ? 20 : 100} className="w-full" />
        </CardHeader>
        <CardContent>
            {step === 1 && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                        <Button type="submit" className="w-full">
                            Build Your Magic →
                        </Button>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">Welcome to goodluck!</h3>
                    <p className="text-muted-foreground">Your account has been created. What's next?</p>
                    <Button asChild className="w-full">
                        <Link href="/profile">Complete Your Profile</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Explore Matches</Link>
                    </Button>
                </div>
            )}

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
