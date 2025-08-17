
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
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
    const { toast } = useToast();
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        console.log(values);
        setEmail(values.email);
        // ToDo: Implement Firebase sendPasswordResetEmail
        /*
        import { getAuth, sendPasswordResetEmail } from "firebase/auth";
        const auth = getAuth();
        sendPasswordResetEmail(auth, values.email)
        .then(() => {
            setSubmitted(true);
        })
        .catch((error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not send reset link. Please check your email and try again.",
            });
        });
        */
        setSubmitted(true);
    }

  return (
    <AuthLayout
        footerText="No spam ever. Pinky promise."
    >
        {submitted ? (
             <Card className="mx-auto max-w-sm w-full text-center">
                <CardHeader>
                     <CheckCircle className="mx-auto h-12 w-12 text-toxic-green" />
                    <CardTitle className="text-2xl">Magic Link Sent!</CardTitle>
                    <CardDescription>
                        Check your inbox at <strong>{email}</strong> for a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/login">Back to Login</Link>
                    </Button>
                     <p className="mt-4 text-xs text-muted-foreground">
                        Didn't receive an email? Check your spam folder or try again.
                    </p>
                </CardContent>
            </Card>
        ) : (
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                <CardTitle className="text-2xl">Forgot Password?</CardTitle>
                <CardDescription>
                    No worries! We'll help you reset in seconds.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Your rescue email</Label>
                                        <FormControl>
                                            <Input type="email" placeholder="your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Send Magic Link
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Remember your password?{" "}
                        <Link href="/login" prefetch={false} className="underline">
                        Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        )}
    </AuthLayout>
  );
}
