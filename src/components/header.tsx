
"use client";

import React from "react";
import Link from "next/link";
import { GoodluckLogo } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, EyeOff, LogIn, LogOut, Settings, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const statuses = [
    "Ready to Connect! 💬",
    "Seeking Deep Conversations 🌌",
    "Adventure Buddy Wanted! 🗺️",
    "Open to Slow Burn ❤️🔥",
    "Flirty & Fun Tonight 😉",
    "Let’s Skip Small Talk 🎯"
];

// ToDo: Replace with actual auth state
const useAuth = () => ({
    isLoggedIn: false
});

export function Header() {
  const { isLoggedIn } = useAuth();
  const [status, setStatus] = React.useState(statuses[0]);
  const [incognito, setIncognito] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
            <GoodluckLogo />
        </Link>
        
        {isLoggedIn ? (
            <div className="flex items-center gap-4">
                <p className="hidden text-sm text-muted-foreground md:block">{status}</p>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                        <h4 className="font-medium leading-none">Temporal Status</h4>
                        <p className="text-sm text-muted-foreground">
                            Let others know your current vibe.
                        </p>
                        </div>
                        <div className="grid gap-2">
                            <Select onValueChange={setStatus} defaultValue={status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="@user" data-ai-hint="profile picture" />
                        <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile" passHref>
                        <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center justify-between">
                        <Label htmlFor="incognito-mode" className="flex items-center gap-2 cursor-pointer">
                        <EyeOff className="h-4 w-4" />
                        <span>Incognito Mode</span>
                        </Label>
                        <Switch
                        id="incognito-mode"
                        checked={incognito}
                        onCheckedChange={setIncognito}
                        />
                    </DropdownMenuItem>
                    <Link href="/settings" passHref>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
         ) : (
            <div className="flex items-center gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Sign Up <LogIn className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
         )}

      </div>
    </header>
  );
}
