
'use client';

import { ChevronLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';

export default function PlusMembershipPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const robotImage = PlaceHolderImages.find((img) => img.id === 'plus-membership-robot');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-card flex items-center gap-4 sticky top-0 z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.plusMembership.title}</h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Star className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{translations.plusMembership.oops}</h2>
        <p className="text-muted-foreground mb-6">{translations.plusMembership.textWidget}</p>
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
