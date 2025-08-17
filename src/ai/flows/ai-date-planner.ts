
'use server';
/**
 * @fileOverview This file defines the AI-powered date planning flow for the goodluck app.
 *
 * - suggestDateIdeas - A function that suggests date ideas and locations based on user and match interests.
 * - SuggestDateIdeasInput - The input type for the suggestDateIdeas function.
 * - SuggestDateIdeasOutput - The return type for the suggestDateIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDateIdeasInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A comma-separated list of the user\u2019s interests.'),
  matchInterests: z
    .string()
    .describe('A comma-separated list of the match\u2019s interests.'),
  location: z.string().describe('The city where the date will take place.'),
});
export type SuggestDateIdeasInput = z.infer<typeof SuggestDateIdeasInputSchema>;

const SuggestDateIdeasOutputSchema = z.object({
  dateIdeas: z
    .array(z.string())
    .describe('An array of date ideas based on mutual interests and location.'),
  dateLocations: z
    .array(z.string())
    .describe(
      'An array of specific locations (e.g., restaurants, venues) for the suggested date ideas.'
    ),
});
export type SuggestDateIdeasOutput = z.infer<typeof SuggestDateIdeasOutputSchema>;

export async function suggestDateIdeas(
  input: SuggestDateIdeasInput
): Promise<SuggestDateIdeasOutput> {
  return suggestDateIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDateIdeasPrompt',
  input: {schema: SuggestDateIdeasInputSchema},
  output: {schema: SuggestDateIdeasOutputSchema},
  prompt: `You are a date planning assistant for the goodluck app. Given the user's interests,
and their match's interests, and the location, suggest a few date ideas and specific locations
for those dates.  Be creative and specific.

User Interests: {{{userInterests}}}
Match Interests: {{{matchInterests}}}
Location: {{{location}}}

Date Ideas and Locations:
`,
});

const suggestDateIdeasFlow = ai.defineFlow(
  {
    name: 'suggestDateIdeasFlow',
    inputSchema: SuggestDateIdeasInputSchema,
    outputSchema: SuggestDateIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
