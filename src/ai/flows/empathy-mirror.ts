'use server';

/**
 * @fileOverview Suggests improvements to a user's profile based on how it appears to different personality types.
 *
 * - suggestProfileImprovements - A function that handles the profile improvement suggestions.
 * - SuggestProfileImprovementsInput - The input type for the suggestProfileImprovements function.
 * - SuggestProfileImprovementsOutput - The return type for the suggestProfileImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProfileImprovementsInputSchema = z.object({
  profileText: z.string().describe('The user profile text to be analyzed.'),
  targetPersonality: z
    .string()
    .describe(
      'The personality type to optimize the profile for (e.g., adventurous, chill, deep talks).'
    ),
});
export type SuggestProfileImprovementsInput = z.infer<
  typeof SuggestProfileImprovementsInputSchema
>;

const SuggestProfileImprovementsOutputSchema = z.object({
  improvedProfileText: z
    .string()
    .describe('The improved profile text tailored for the target personality.'),
  explanation: z
    .string()
    .describe(
      'Explanation of why the profile was improved and how it caters to the target personality.'
    ),
});
export type SuggestProfileImprovementsOutput = z.infer<
  typeof SuggestProfileImprovementsOutputSchema
>;

export async function suggestProfileImprovements(
  input: SuggestProfileImprovementsInput
): Promise<SuggestProfileImprovementsOutput> {
  return suggestProfileImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProfileImprovementsPrompt',
  input: {schema: SuggestProfileImprovementsInputSchema},
  output: {schema: SuggestProfileImprovementsOutputSchema},
  prompt: `You are an AI profile optimization expert. Given a user profile and a target personality type, rewrite the profile to be more appealing to that personality, also explain your re-writing.

User Profile: {{{profileText}}}
Target Personality: {{{targetPersonality}}}

Rewrite the profile to be more appealing to this personality and include an explanation.

Ensure that your response conforms to the output schema.
`,
});

const suggestProfileImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestProfileImprovementsFlow',
    inputSchema: SuggestProfileImprovementsInputSchema,
    outputSchema: SuggestProfileImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
