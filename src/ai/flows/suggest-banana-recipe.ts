'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting banana recipes.
 *
 * - suggestBananaRecipe - A function that suggests a recipe incorporating bananas.
 * - SuggestBananaRecipeInput - The input type for the suggestBananaRecipe function (void).
 * - SuggestBananaRecipeOutput - The return type for the suggestBananaRecipe function, containing the recipe name and instructions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBananaRecipeInputSchema = z.void();
export type SuggestBananaRecipeInput = z.infer<typeof SuggestBananaRecipeInputSchema>;

const SuggestBananaRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the suggested recipe.'),
  instructions: z.string().describe('Instructions for preparing the suggested recipe.'),
});
export type SuggestBananaRecipeOutput = z.infer<typeof SuggestBananaRecipeOutputSchema>;


export async function suggestBananaRecipe(): Promise<SuggestBananaRecipeOutput> {
  return suggestBananaRecipeFlow();
}

const getBananaRecipe = ai.defineTool(
  {
    name: 'getBananaRecipe',
    description: 'Returns a recipe incorporating bananas from a database of recipes.',
    inputSchema: z.void(),
    outputSchema: z.object({
      recipeName: z.string(),
      instructions: z.string(),
    }),
  },
  async () => {
    // In a real application, this would query a database or external API.
    // For this example, we return a hardcoded recipe.
    return {
      recipeName: 'Peanut Butter Banana Smoothie',
      instructions: '1. Blend 1 frozen banana, 1 cup milk, 2 tbsp peanut butter, and 1 tbsp honey until smooth. 2. Enjoy!',
    };
  }
);

const suggestBananaRecipePrompt = ai.definePrompt({
  name: 'suggestBananaRecipePrompt',
  tools: [getBananaRecipe],
  prompt: `Suggest a simple recipe incorporating bananas. Use the getBananaRecipe tool to get a recipe from the database. Return the recipe name and instructions.`,
  input: { schema: SuggestBananaRecipeInputSchema },
  output: { schema: SuggestBananaRecipeOutputSchema },
});

const suggestBananaRecipeFlow = ai.defineFlow(
  {
    name: 'suggestBananaRecipeFlow',
    inputSchema: SuggestBananaRecipeInputSchema,
    outputSchema: SuggestBananaRecipeOutputSchema,
  },
  async () => {
    const { output } = await suggestBananaRecipePrompt();
    return output!;
  }
);
