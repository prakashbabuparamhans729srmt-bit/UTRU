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
import { cn } from '@/lib/utils';
import { Phone, Loader2, Mail } from 'lucide-react';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useUser } from '@/firebase';
import Link from 'next/link';


export default function EntryPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const { isPending } = useAuthUI();
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
    if (!userLoading && user) {
      router.replace('/');
    }
  }, [user, userLoading, router]);


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
  
  if (userLoading || user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                className="object-cover opacity-50"
                data-ai-hint={image.imageHint}
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-black/20 via-black/50 to-black/80">
        <div className="w-full max-w-sm text-center">
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg [font-family:var(--font-headline)]">UCLAP</h1>
            <p className="text-lg text-white/90 mb-10 drop-shadow-md">Your Services, On Demand</p>

            <div className="space-y-4">
              <Button
                className="w-full bg-white text-black rounded-full h-14 text-lg font-semibold hover:bg-gray-200"
                onClick={() => router.push('/email-signup')}
                disabled={isPending}
              >
                <Mail className="mr-3 h-6 w-6" />
                Sign up with Email
              </Button>

              <Button
                className="w-full bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-full h-14 text-lg font-semibold hover:bg-white/30"
                onClick={() => router.push('/phone-login')}
                disabled={isPending}
              >
                 <Phone className="mr-3 h-6 w-6" />
                Continue with Phone
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-white/80">
              Already have an account?{' '}
              <Link href="/email-login" className="font-bold text-white hover:underline">
                Log In
              </Link>
            </p>
        </div>
         <div className="absolute bottom-8 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-1 w-6 rounded-full transition-all duration-500',
                current === i ? 'bg-white w-8' : 'bg-white/50'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
