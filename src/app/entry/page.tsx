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
import { Phone, Loader2 } from 'lucide-react';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';


const GoogleIcon = () => (
  <svg className="mr-2 h-6 w-6" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);


export default function EntryPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { items: cartItems } = useCart();
  const { signInWithGoogle, isPending } = useAuthUI();
  const { toast } = useToast();
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
  
  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      toast({
        title: "Login Successful!",
        description: "Welcome to the app.",
      });
      const redirectPath = cartItems.length > 0 ? '/checkout' : '/';
      router.replace(redirectPath);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not sign you in with Google. Please try again.",
      });
    }
  };

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
        <div className="flex justify-center gap-2 mb-6">
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
        <div className="w-full max-w-sm space-y-4">
          <Button
            className="w-full bg-white text-black rounded-full h-14 text-lg hover:bg-gray-200"
            onClick={handleGoogleSignIn}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <><GoogleIcon /> Sign Up with Google</>}
          </Button>
          <Button
            className="w-full bg-black text-white rounded-full h-14 text-lg border-2 border-gray-500 hover:bg-gray-800"
            onClick={() => router.push('/phone-login')}
            disabled={isPending}
          >
            <Phone className="mr-2 h-6 w-6" />
            {(translations as any).login?.continueWithPhone || 'Continue with Phone'}
          </Button>
        </div>
      </div>
    </div>
  );
}
