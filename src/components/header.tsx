
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
import { EyeOff, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar as AvatarType } from "@/lib/avatars";


export function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const [incognito, setIncognito] = React.useState(false);
  const [profileAvatar, setProfileAvatar] = React.useState<AvatarType | null>(null);
  const [profilePhoto, setProfilePhoto] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setProfileAvatar(data.selectedAvatar || null);
          setProfilePhoto(data.photos?.[0] || null);
        }
      });
      return () => unsub();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
            <GoodluckLogo />
        </Link>
        
        {isLoggedIn ? (
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                         {profileAvatar ? (
                            <span className="text-xl">{profileAvatar.emoji}</span>
                         ) : profilePhoto ? (
                            <AvatarImage src={profilePhoto} alt="@user" data-ai-hint="profile picture" />
                         ) : (
                            <AvatarFallback>A</AvatarFallback>
                         )}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
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
