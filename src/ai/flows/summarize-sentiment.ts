'use server';

/**
 * @fileOverview Summarizes the overall sentiment from user reviews.
 *
 * - summarizeSentiment - A function that summarizes user review sentiment.
 * - SummarizeSentimentInput - The input type for the summarizeSentiment function.
 * - SummarizeSentimentOutput - The return type for the summarizeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSentimentInputSchema = z.object({
  reviews: z
    .string()
    .describe('A list of user reviews to analyze, separated by newlines.'),
});
export type SummarizeSentimentInput = z.infer<typeof SummarizeSentimentInputSchema>;

const SummarizeSentimentOutputSchema = z.object({
  sentimentSummary: z
    .string()
    .describe('A summary of the overall sentiment expressed in the reviews.'),
});
export type SummarizeSentimentOutput = z.infer<typeof SummarizeSentimentOutputSchema>;

export async function summarizeSentiment(input: SummarizeSentimentInput): Promise<SummarizeSentimentOutput> {
  return summarizeSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSentimentPrompt',
  input: {schema: SummarizeSentimentInputSchema},
  output: {schema: SummarizeSentimentOutputSchema},
  prompt: `You are an AI expert in sentiment analysis. Please summarize the sentiment of the following user reviews:

Reviews:
{{reviews}}

Summary:`,
});

const summarizeSentimentFlow = ai.defineFlow(
  {
    name: 'summarizeSentimentFlow',
    inputSchema: SummarizeSentimentInputSchema,
    outputSchema: SummarizeSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
