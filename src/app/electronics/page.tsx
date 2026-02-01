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

const electronicsServices = [
  { id: 'electronics-tv-repair', name: 'TV Repair' },
  { id: 'electronics-ac-repair', name: 'AC Service & Repair' },
  { id: 'electronics-washing-machine', name: 'Washing Machine Repair' },
  { id: 'electronics-geyser', name: 'Geyser Repair' },
];

export default function ElectronicsPage() {
  const router = useRouter();
  const heroImages = PlaceHolderImages.filter(
    (img) => img.id.startsWith('electronics-hero')
  );
  const adImages = PlaceHolderImages.filter((img) => img.id.startsWith('ad-hero'));
  
  const adPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const servicePlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Electronics</h1>
      </header>
      <main className="pb-8 pt-6 space-y-6">
        <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            plugins={[adPlugin.current]}
            onMouseEnter={adPlugin.current.stop}
            onMouseLeave={adPlugin.current.reset}
        >
          <CarouselContent>
            {adImages.map((image, index) => (
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
        <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            plugins={[servicePlugin.current]}
            onMouseEnter={servicePlugin.current.stop}
            onMouseLeave={servicePlugin.current.reset}
        >
          <CarouselContent>
            {heroImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="px-4">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-[2/1]"
                    data-ai-hint={image.imageHint}
                    priority={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="px-4">
            <ServiceGrid services={electronicsServices} />
        </div>
      </main>
    </div>
  );
}
