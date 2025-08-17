"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestDateIdeas, SuggestDateIdeasOutput } from "@/ai/flows/ai-date-planner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Lightbulb, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userInterests: z.string().min(3, "Please list at least one interest."),
  matchInterests: z.string().min(3, "Please list at least one interest for your match."),
  location: z.string().min(2, "Please provide a location."),
});

export function DatePlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestDateIdeasOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInterests: "",
      matchInterests: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await suggestDateIdeas(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate date ideas. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Date Planner</CardTitle>
        <CardDescription>
          Let our GoodLuck Concierge plan the perfect date based on your mutual interests.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="userInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., hiking, sushi, jazz music" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matchInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match's Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., art galleries, spicy food, dogs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (City)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Plan Date
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-4 border-t pt-4">
          <h3 className="font-semibold text-lg mb-4">Your Date Plan:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2"><Lightbulb className="text-primary h-5 w-5"/>Date Ideas</h4>
              <ul className="list-disc list-inside space-y-2">
                {result.dateIdeas.map((idea, index) => (
                  <li key={index}>{idea}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2"><MapPin className="text-accent h-5 w-5" />Suggested Locations</h4>
              <ul className="list-disc list-inside space-y-2">
                {result.dateLocations.map((loc, index) => (
                  <li key={index}>{loc}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
