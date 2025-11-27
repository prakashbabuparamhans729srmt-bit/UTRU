'use server';

/**
 * @fileOverview Flow for generating a fun fact about bananas.
 *
 * - generateBananaFact - A function that returns a fun fact about bananas.
 * - GenerateBananaFactInput - The input type for the generateBananaFact function. (void)
 * - GenerateBananaFactOutput - The return type for the generateBananaFact function. (string)
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBananaFactInputSchema = z.void();
export type GenerateBananaFactInput = z.infer<typeof GenerateBananaFactInputSchema>;

const GenerateBananaFactOutputSchema = z.string();
export type GenerateBananaFactOutput = z.infer<typeof GenerateBananaFactOutputSchema>;

export async function generateBananaFact(): Promise<GenerateBananaFactOutput> {
  return generateBananaFactFlow({});
}

const bananaFactPrompt = ai.definePrompt({
  name: 'bananaFactPrompt',
  input: {schema: GenerateBananaFactInputSchema},
  output: {schema: GenerateBananaFactOutputSchema},
  prompt: `You are a fun fact generator specializing in bananas.  Generate one interesting fact about bananas.`,
});

const generateBananaFactFlow = ai.defineFlow(
  {
    name: 'generateBananaFactFlow',
    inputSchema: GenerateBananaFactInputSchema,
    outputSchema: GenerateBananaFactOutputSchema,
  },
  async () => {
    const {text} = await bananaFactPrompt({});
    return text!;
  }
);
