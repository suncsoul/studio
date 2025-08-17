'use server';
/**
 * @fileOverview An AI agent for detecting red flags in user messages.
 *
 * - detectRedFlags - A function that analyzes messages for suspicious content.
 * - DetectRedFlagsInput - The input type for the detectRedFlags function.
 * - DetectRedFlagsOutput - The return type for the detectRedFlags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectRedFlagsInputSchema = z.object({
  message: z.string().describe('The message to analyze for red flags.'),
  userProfile: z.string().optional().describe('The user profile of the message sender.')
});
export type DetectRedFlagsInput = z.infer<typeof DetectRedFlagsInputSchema>;

const DetectRedFlagsOutputSchema = z.object({
  hasRedFlags: z.boolean().describe('Whether the message contains red flags.'),
  flagDetails: z.string().optional().describe('Details about the detected red flags.'),
});
export type DetectRedFlagsOutput = z.infer<typeof DetectRedFlagsOutputSchema>;

export async function detectRedFlags(input: DetectRedFlagsInput): Promise<DetectRedFlagsOutput> {
  return detectRedFlagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectRedFlagsPrompt',
  input: {schema: DetectRedFlagsInputSchema},
  output: {schema: DetectRedFlagsOutputSchema},
  prompt: `You are an AI assistant specialized in detecting potential red flags in user messages related to scams, predatory language, or other harmful content.
  Analyze the provided message and user profile (if available) to determine if there are any suspicious elements.

  Message: {{{message}}}
  User Profile: {{{userProfile}}}

  Consider factors such as:
  - Unusual requests or offers
  - Suspicious links or contact information
  - Language that suggests coercion or manipulation
  - Attempts to obtain sensitive information

  Based on your analysis, set the hasRedFlags output field to true if any red flags are detected. Provide a detailed explanation in the flagDetails output field.
  If no red flags are detected, set hasRedFlags to false, and leave flagDetails empty.

  Ensure the output is concise and actionable.
  `,
});

const detectRedFlagsFlow = ai.defineFlow(
  {
    name: 'detectRedFlagsFlow',
    inputSchema: DetectRedFlagsInputSchema,
    outputSchema: DetectRedFlagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
