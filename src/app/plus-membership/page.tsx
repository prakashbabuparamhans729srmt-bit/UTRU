
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PlusMembershipPage() {
  const router = useRouter();
  const robotImage = PlaceHolderImages.find((img) => img.id === 'plus-membership-robot');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-card flex items-center gap-4 sticky top-0 z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold">Membership</h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Oops, you haven't placed an order yet</h2>
        <p className="text-muted-foreground mb-6">[Text Widget]</p>
        {robotImage && (
            <Image
                src={robotImage.imageUrl}
                alt={robotImage.description}
                width={300}
                height={300}
                className="object-contain"
                data-ai-hint={robotImage.imageHint}
            />
        )}
      </main>
    </div>
  );
}

    