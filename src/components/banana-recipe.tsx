'use client';

import { useState, useTransition } from 'react';
import { suggestBananaRecipe, type SuggestBananaRecipeOutput } from '@/ai/flows/suggest-banana-recipe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function BananaRecipe({ initialRecipe }: { initialRecipe: SuggestBananaRecipeOutput }) {
  const [recipe, setRecipe] = useState(initialRecipe);
  const [isPending, startTransition] = useTransition();

  const handleGetNewRecipe = () => {
    startTransition(async () => {
      const newRecipe = await suggestBananaRecipe();
      setRecipe(newRecipe);
    });
  };

  return (
    <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <ChefHat className="w-8 h-8 text-primary" />
          Recipe Idea
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-xl mb-3 font-headline text-accent-foreground">{recipe.recipeName}</h3>
            <p className="whitespace-pre-wrap leading-relaxed">{recipe.instructions}</p>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetNewRecipe} disabled={isPending} className="w-full" size="lg">
          {isPending ? <Loader2 className="animate-spin" /> : 'Suggest a Recipe'}
        </Button>
      </CardFooter>
    </Card>
  );
}
