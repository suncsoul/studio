"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { suggestProfileImprovements, SuggestProfileImprovementsOutput } from "@/ai/flows/empathy-mirror";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  profileText: z.string().min(20, "Profile text must be at least 20 characters."),
  targetPersonality: z.string({ required_error: "Please select a target personality." }),
});

export function EmpathyMirror() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestProfileImprovementsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await suggestProfileImprovements(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate profile suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empathy Mirror</CardTitle>
        <CardDescription>
          See how your profile looks to others and get AI-powered tips to attract your ideal match.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="profileText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Profile Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste your profile bio here..." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetPersonality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optimize For Personality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a personality type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="adventurous">Adventurous</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="deep talks">Deep Talks</SelectItem>
                      <SelectItem value="intellectual">Intellectual</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Feedback
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-4 border-t pt-6 space-y-4">
            <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2"><Sparkles className="text-primary h-5 w-5"/>Suggested Improvement</h4>
                <p className="p-4 bg-secondary rounded-md text-secondary-foreground">{result.improvedProfileText}</p>
            </div>
             <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2"><Wand2 className="text-accent h-5 w-5"/>Explanation</h4>
                <p className="text-muted-foreground">{result.explanation}</p>
            </div>
        </CardContent>
      )}
    </Card>
  );
}
