"use client";

import React from "react";
import { GoodLuckLogo } from "./icons";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, EyeOff, LogOut, Moon, Settings, Sun } from "lucide-react";

export function Header() {
  const [status, setStatus] = React.useState("Ready to connect!");
  const [incognito, setIncognito] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <GoodLuckLogo />
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
                  <Input
                    id="status"
                    defaultValue={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder='e.g. "Looking for deep convos"'
                  />
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
              <DropdownMenuItem className="flex items-center justify-between">
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
