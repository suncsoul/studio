"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { detectRedFlags, DetectRedFlagsOutput } from "@/ai/flows/ai-red-flag-detection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const formSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export function SafetyModeration() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectRedFlagsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const output = await detectRedFlags({ message: values.message });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check the message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Red Flag Detection</CardTitle>
        <CardDescription>
          Our safety AI analyzes messages for predatory language or potential scams to keep you safe.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message to Analyze</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste a message here to check for red flags..." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check Message
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent className="mt-4 border-t pt-4">
            <Alert variant={result.hasRedFlags ? "destructive" : "default"} className={!result.hasRedFlags ? "border-green-500" : ""}>
                {result.hasRedFlags ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4 text-green-500" />}
                <AlertTitle>{result.hasRedFlags ? "Red Flag Detected" : "Message Seems Safe"}</AlertTitle>
                <AlertDescription>
                {result.hasRedFlags ? result.flagDetails : "Our AI did not detect any immediate red flags in this message. Always use your best judgment."}
                </AlertDescription>
            </Alert>
        </CardContent>
      )}
    </Card>
  );
}
