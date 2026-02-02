'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { UserPlus } from 'lucide-react';

export default function EntryPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const images = [
    { id: 'entry-hero-1', hint: 'cleaning service' },
    { id: 'entry-hero-2', hint: 'repair service' },
    { id: 'entry-hero-3', hint: 'beauty service' },
    { id: 'entry-hero-4', hint: 'delivery person' },
    { id: 'entry-hero-5', hint: 'car wash' },
    { id: 'entry-hero-6', hint: 'food delivery' }
  ].map(imgData => {
    const pImage = PlaceHolderImages.find(p => p.id === imgData.id);
    return {
      id: imgData.id,
      imageUrl: pImage?.imageUrl || `https://picsum.photos/seed/${imgData.id}/800/1200`,
      description: pImage?.description || imgData.hint,
      imageHint: pImage?.imageHint || imgData.hint
    }
  });


  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);
  

  return (
    <div className="relative h-screen w-full bg-black">
      <Carousel 
        setApi={setApi} 
        className="w-full h-full" 
        opts={{ loop: true }} 
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="flex justify-center gap-2 mb-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-1 w-6 rounded-full transition-all',
                current === i ? 'bg-white w-8' : 'bg-white/50'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <Button
          className="w-full bg-black text-white rounded-full h-14 text-lg border-2 border-gray-500 hover:bg-gray-800"
          onClick={() => router.push('/phone-login')}
        >
          <UserPlus className="mr-2 h-6 w-6" />
          {(translations as any).entry?.signUp || 'Sign Up'}
        </Button>
      </div>
    </div>
  );
}
