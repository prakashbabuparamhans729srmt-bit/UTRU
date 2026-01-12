
'use server';

/**
 * @fileOverview A chatbot flow that can answer questions about the application.
 *
 * - appChat - A function that takes a user query and returns a response.
 * - AppChatInput - The input type for the appChat function.
 * - AppChatOutput - The return type for the appChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AppChatInputSchema = z.object({
  userQuery: z.string().describe('The question asked by the user.'),
  history: z.array(z.string()).optional().describe('The chat history.'),
});
export type AppChatInput = z.infer<typeof AppChatInputSchema>;

const AppChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user query.'),
});
export type AppChatOutput = z.infer<typeof AppChatOutputSchema>;

export async function appChat(input: AppChatInput): Promise<AppChatOutput> {
  return appChatFlow(input);
}

const appInfoPrompt = ai.definePrompt({
  name: 'appInfoPrompt',
  input: { schema: AppChatInputSchema },
  output: { schema: AppChatOutputSchema },
  system: `You are a helpful AI assistant for an e-commerce web application.
Your goal is to answer questions from users about the application itself.

Here is some context about the application's tech stack and features:
- It is a modern web application built with Next.js and React.
- The user interface is built using ShadCN UI components and styled with Tailwind CSS.
- The application supports multiple languages and has a theme switcher for light and dark modes.
- It has features like product search, shopping cart, user profiles, and an admin dashboard.
- AI features are powered by Google's models through Genkit.

When a user asks a question, use this context to provide a helpful and accurate answer.
Be friendly and conversational. If you don't know the answer, say that you are an expert on the application's features and can't answer questions outside of that scope.

Chat History:
{{#if history}}
{{#each history}}
- {{this}}
{{/each}}
{{/if}}`,
  prompt: `User's question: {{{userQuery}}}`,
});

const appChatFlow = ai.defineFlow(
  {
    name: 'appChatFlow',
    inputSchema: AppChatInputSchema,
    outputSchema: AppChatOutputSchema,
  },
  async (input) => {
    const { output } = await appInfoPrompt(input);
    return output!;
  }
);

    