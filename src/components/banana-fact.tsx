'use client';

import { useState, useTransition } from 'react';
import { generateBananaFact } from '@/ai/flows/generate-banana-fact';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function BananaFact({ initialFact }: { initialFact: string }) {
  const [fact, setFact] = useState(initialFact);
  const [isPending, startTransition] = useTransition();

  const handleGetNewFact = () => {
    startTransition(async () => {
      const newFact = await generateBananaFact();
      setFact(newFact);
    });
  };

  return (
    <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
          <Lightbulb className="w-8 h-8 text-primary" />
          Did You Know?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p className="text-lg leading-relaxed">{fact}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetNewFact} disabled={isPending} className="w-full" size="lg">
          {isPending ? <Loader2 className="animate-spin" /> : 'Get Another Fact'}
        </Button>
      </CardFooter>
    </Card>
  );
}
