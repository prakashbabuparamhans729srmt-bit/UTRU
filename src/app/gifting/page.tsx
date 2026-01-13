
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import ServiceGrid from '@/components/ServiceGrid';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const giftingServices = [
    { id: 'gifting-hamper', name: 'Gift Hampers' },
    { id: 'gifting-flowers', name: 'Flower Delivery' },
    { id: 'gifting-cake', name: 'Cake Delivery' },
    { id: 'gifting-personalized', name: 'Personalized Gifts' },
];

export default function GiftingPage() {
  const router = useRouter();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'gifting-hero');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Gifting</h1>
      </header>
      <main className="pb-8">
        <Carousel className="w-full mb-6" opts={{ loop: true }}>
            <CarouselContent>
                {heroImage && (
                <CarouselItem>
                    <div className="px-4">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        width={600}
                        height={300}
                        className="rounded-lg object-cover w-full aspect-[2/1]"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                    </div>
                </CarouselItem>
                )}
            </CarouselContent>
        </Carousel>
        <div className="px-4">
            <ServiceGrid services={giftingServices} />
        </div>
      </main>
    </div>
  );
}

    