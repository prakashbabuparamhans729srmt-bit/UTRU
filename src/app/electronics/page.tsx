
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

const electronicsServices = [
  { id: 'electronics-tv-repair', name: 'TV Repair' },
  { id: 'electronics-ac-repair', name: 'AC Service & Repair' },
  { id: 'electronics-washing-machine', name: 'Washing Machine Repair' },
  { id: 'electronics-geyser', name: 'Geyser Repair' },
];

export default function ElectronicsPage() {
  const router = useRouter();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'electronics-hero');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Electronics</h1>
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
            <ServiceGrid services={electronicsServices} />
        </div>
      </main>
    </div>
  );
}

    