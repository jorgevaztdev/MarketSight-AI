// This is an AI-powered function that determines whether detected changes in competitor data are significant enough to warrant an alert.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChangeTypeSchema = z.enum(['PRICE', 'FEATURE', 'RELEASE_NOTE']);
export type ChangeType = z.infer<typeof ChangeTypeSchema>;

const CompetitorDataSchema = z.object({
  name: z.string().describe('Name of the competitor.'),
  url: z.string().url().describe('URL of the competitor website.'),
  changeType: ChangeTypeSchema.describe('The type of change detected.'),
  details: z.string().describe('Details of the change, such as previous and current pricing or added/removed features.'),
});

export type CompetitorData = z.infer<typeof CompetitorDataSchema>;

const DetectSignificantChangesInputSchema = z.object({
  competitorData: CompetitorDataSchema.describe('Competitor data that has changed.'),
  context: z.string().optional().describe('Additional context about the market or competitor.'),
});

export type DetectSignificantChangesInput = z.infer<
  typeof DetectSignificantChangesInputSchema
>;

const DetectSignificantChangesOutputSchema = z.object({
  isSignificant: z.boolean().describe('Whether the change is significant enough to warrant an alert.'),
  reason: z.string().describe('The reason for the significance determination.'),
});

export type DetectSignificantChangesOutput = z.infer<
  typeof DetectSignificantChangesOutputSchema
>;

export async function detectSignificantChanges(
  input: DetectSignificantChangesInput
): Promise<DetectSignificantChangesOutput> {
  return detectSignificantChangesFlow(input);
}

const detectSignificantChangesPrompt = ai.definePrompt({
  name: 'detectSignificantChangesPrompt',
  input: {schema: DetectSignificantChangesInputSchema},
  output: {schema: DetectSignificantChangesOutputSchema},
  prompt: `You are an AI assistant that analyzes changes in competitor data and determines if the change is significant enough to warrant an alert.

  Given the following competitor data and market context, determine if the change is significant. Provide a reason for your determination.

  Competitor Name: {{{competitorData.name}}}
  Competitor URL: {{{competitorData.url}}}
  Change Type: {{{competitorData.changeType}}}
  Change Details: {{{competitorData.details}}}
  Market Context: {{{context}}}
  \n  Is the change significant? Answer either true or false.
  Reason:
  `,
});

const detectSignificantChangesFlow = ai.defineFlow(
  {
    name: 'detectSignificantChangesFlow',
    inputSchema: DetectSignificantChangesInputSchema,
    outputSchema: DetectSignificantChangesOutputSchema,
  },
  async input => {
    const {output} = await detectSignificantChangesPrompt(input);
    return output!;
  }
);
