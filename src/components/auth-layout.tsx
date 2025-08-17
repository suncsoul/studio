
import React from "react";
import { GoodluckLogo } from "./icons";
import Link from "next/link";
import { Heart } from "lucide-react";


interface AuthLayoutProps {
    children: React.ReactNode;
    footerText?: string;
}

export function AuthLayout({ children, footerText }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/30">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/">
                    <GoodluckLogo />
                </Link>
                 <Button asChild variant="ghost">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
            {children}
        </main>
        {footerText && (
             <footer className="py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-center gap-2 md:h-24">
                     <p className="text-center text-sm font-semibold text-muted-foreground flex items-center gap-2">
                        <Heart className="h-4 w-4 text-accent" />
                        {footerText}
                    </p>
                </div>
            </footer>
        )}
    </div>
  );
}

// Dummy Button component for structure, assuming it exists in ui/button
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: string }) => {
    const Comp = props.asChild ? "div" : "button";
    return <Comp {...props}>{children}</Comp>;
};
