
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
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const premiumServices = [
    { id: 'premium-deep-cleaning', name: 'Deep Home Cleaning' },
    { id: 'premium-pest-control', name: 'Pest Control' },
    { id: 'premium-sofa-cleaning', name: 'Sofa & Carpet Cleaning' },
    { id: 'premium-car-cleaning', name: 'Car Cleaning' },
];


export default function PremiumPage() {
  const router = useRouter();
  const heroImages = PlaceHolderImages.filter((img) => img.id.startsWith('premium-hero'));

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Premium</h1>
      </header>
      <main className="pb-8">
        <Carousel 
            className="w-full mb-6" 
            opts={{ loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {heroImages.map((image, index) => (
                    <CarouselItem key={image.id}>
                        <div className="px-4">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={600}
                            height={300}
                            className="rounded-lg object-cover w-full aspect-[2/1]"
                            data-ai-hint={image.imageHint}
                            priority={index === 0}
                        />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        <div className="px-4">
            <ServiceGrid services={premiumServices} />
        </div>
      </main>
    </div>
  );
}
