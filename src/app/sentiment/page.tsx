"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { summarizeSentiment, SummarizeSentimentInput } from "@/ai/flows/summarize-sentiment";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";

export default function SentimentPage() {
  const [reviews, setReviews] = React.useState("");
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!reviews.trim()) {
      toast({
        title: "Input Required",
        description: "Please paste some reviews to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary(null);

    try {
      const input: SummarizeSentimentInput = { reviews };
      const result = await summarizeSentiment(input);
      setSummary(result.sentimentSummary);
    } catch (error) {
      console.error("Error summarizing sentiment:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze sentiment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Sentiment Radar" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyze Review Sentiment</CardTitle>
            <CardDescription>
              Paste user reviews (separated by new lines) to get an AI-powered sentiment summary.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste reviews here...\nExample: This product is amazing!\nAnother review: I'm not too happy with the latest update."
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              rows={10}
              className="min-h-[200px] focus:ring-accent"
              aria-label="User reviews input"
            />
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto group">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              )}
              Analyze Sentiment
            </Button>
          </CardContent>
        </Card>

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Sentiment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{summary}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
