
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
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
    email: z.string().min(1, "Please enter a valid email address."),
    password: z.string().min(1, "Password must be at least 8 characters."),
});

export default function LoginPage() {
    const { toast } = useToast();
    const { login } = useAuth();
    const router = useRouter();


    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        if (values.email === "Admin" && values.password === "Admin") {
            login();
            toast({
                title: "Logged In as Admin",
                description: "Redirecting you to the main app...",
            });
            router.push('/');
        } else {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid credentials. Please check your email and password.",
            });
        }
    }

  return (
    <AuthLayout
        footerText="3,247 connections made today"
    >
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                                    <Input type="text" placeholder="your.email@example.com" {...field} />
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
                                 <div className="flex items-center">
                                    <Label>Password</Label>
                                    <Link href="/forgot-password" prefetch={false} className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Find My Matches →
                    </Button>
                </form>
            </Form>
          <div className="mt-4 text-center text-sm">
            New here?{" "}
            <Link href="/register" prefetch={false} className="underline">
              Create magic
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
