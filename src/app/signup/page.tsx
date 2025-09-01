
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        // In a real app, you'd call an API to register the user.
        // For this prototype, we'll simulate a successful signup and login.
        console.log('Signing up with:', { name, email, password });
        localStorage.setItem('isLoggedIn', 'true');
        // You might also want to save user info to localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        router.push('/account');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/30 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create an Account</h1>
                    <p className="text-muted-foreground">Join KOKIYUM to start your style journey</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
