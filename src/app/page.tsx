
'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Search,
  X,
  Mic,
  ShoppingCart,
  MapPin,
  LayoutGrid,
  SlidersHorizontal,
  Menu,
  PlaySquare,
  LogOut,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import FloatingActionButton from '@/components/FloatingActionButton';
import { mainFooterNavLinks, homeCategoryLinks, sideNavLinks } from '@/lib/navigation.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import ServiceGrid from '@/components/ServiceGrid';
import { servicesData } from '@/lib/services';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { translations } = useLanguage();
  const { items: cartItems, deliveryAddress } = useCart();
  const featuredServices = servicesData.filter(s => ['cleaning-deep-cleaning', 'beauty-salon', 'electronics-ac-repair', 'car-full-service'].includes(s.id));
  const { openModal: openVoiceModal } = useVoiceSearch();

  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { signOut, isPending: signOutPending } = useAuthUI();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc(userProfileRef);

  const handleSignOut = async () => {
    await signOut();
    clearCart();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };
  
  const isLoading = userLoading || profileLoading;

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const adImages = PlaceHolderImages.filter((img) => img.id.startsWith('ad-hero'));
  const carouselImages = PlaceHolderImages.filter(img => 
    img.id === 'city-night' || img.id === 'product-collage'
  );
  const shortsImages = PlaceHolderImages.filter(img => img.id.startsWith('shorts-'));
  
  const shortsData = [
    { id: 'shorts-1', title: "'DANGEROUS food'", views: '20M views', imageId: 'shorts-dangerous-food' },
    { id: 'shorts-2', title: 'Iron Chef kitchen', views: '2M views', imageId: 'shorts-chef-knife' },
    { id: 'shorts-3', title: "17 Year Teeth-One KNOCKS...", views: '11M views', imageId: 'shorts-girl-crying' },
    { id: 'shorts-4', title: "ANIMALS THAT ASHES PEOPLE TO...", views: '18M views', imageId: 'shorts-animal-glass' },
    { id: 'shorts-5', title: "The weirdest scenes in sports...", views: '9M views', imageId: 'shorts-baseball-swing' },
    { id: 'shorts-6', title: "SPAGHETTI BOWL THEM IN SLIME", views: '1M views', imageId: 'shorts-jelly-cherries' }
  ];

  const adPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  const servicePlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
          <header className="p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Link href="/profile" className="md:hidden">
                    <Menu />
                </Link>
                <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white dark:bg-black rounded-full" />
                </div>
                <Link href="/address" className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{translations.home.locationLabel}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm truncate max-w-[120px]">
                      {deliveryAddress ? deliveryAddress.fullAddress.split(',')[0] : 'Select Location'}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/avatar/40/40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearchSubmit} className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={translations.home.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-input rounded-full pl-10 pr-24 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <X
                      className="w-5 h-5 text-muted-foreground cursor-pointer"
                      onClick={() => setSearchQuery('')}
                    />
                  )}
                  <div className="w-px h-5 bg-border"></div>
                    <Mic
                      className="w-5 h-5 text-muted-foreground cursor-pointer"
                      onClick={openVoiceModal}
                    />
                  <div className="w-px h-5 bg-border"></div>
                    <Link href="/filter">
                      <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
                    </Link>
                </div>
              </form>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                 {cartItems.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                        {cartItems.length}
                    </Badge>
                )}
              </Link>
            </div>
             <Tabs defaultValue="all" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-6 bg-transparent p-0">
                    {homeCategoryLinks.map(link => (
                        <TabsTrigger key={link.name} value={link.name} asChild>
                             <Link href={link.href} className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground">
                                {translations.home[link.name as keyof typeof translations.home]}
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
          </header>

          <main className="flex-grow pb-32 pt-4 space-y-6">
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
                {carouselImages.map((image, index) => (
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
            
            <div className="px-4 flex justify-around">
                <Link href="/search">
                  <Button variant="outline" className="rounded-full">
                      <ShoppingCart className="w-4 h-4 mr-2"/>
                      {translations.home.productBuy}
                  </Button>
                </Link>
                 <Button variant="outline" className="rounded-full" onClick={() => router.push('/more')}>
                    <LayoutGrid className="w-4 h-4 mr-2"/>
                    {translations.home.category}
                </Button>
            </div>

            <section className="space-y-4">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <PlaySquare className="text-red-500" />
                  Shorts
                </h2>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
              <Carousel opts={{ align: 'start', loop: false }} className="w-full">
                <CarouselContent className="-ml-2">
                  {shortsData.map((short, index) => {
                    const image = shortsImages.find(img => img.id === short.imageId);
                    return (
                      <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6">
                        <Link href="/explore">
                          <Card className="overflow-hidden rounded-xl border-none">
                            <CardContent className="p-0 relative">
                              <Image
                                src={image?.imageUrl || `https://picsum.photos/seed/${short.id}/300/500`}
                                alt={short.title}
                                width={300}
                                height={500}
                                className="object-cover w-full aspect-[9/16] rounded-xl"
                                data-ai-hint={image?.imageHint || 'video content'}
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                <h4 className="font-semibold text-white text-sm truncate">{short.title}</h4>
                                <p className="text-xs text-gray-300">{short.views}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </section>

            <div className="px-4">
              <h2 className="text-xl font-bold">Featured Services</h2>
            </div>

            <div className='px-4'>
                <ServiceGrid services={featuredServices} />
            </div>
          </main>

          <FloatingActionButton />

          <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
            <div className="flex justify-around items-center p-2">
              {mainFooterNavLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  if (link.isCentral) {
                    return (
                      <div key={index} className="-mt-8">
                        <Link href={link.href}>
                            <div className={cn(
                                "flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900",
                            )}>
                               <link.icon className="w-8 h-8" />
                            </div>
                        </Link>
                      </div>
                    );
                  }
                  return (
                    <Link key={index} href={link.href} className={cn(
                        "flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md transition-colors w-16", 
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      )}>
                      <link.icon className="w-6 h-6" />
                      <span className={cn("text-xs", isActive ? 'font-bold' : 'font-semibold')}>
                        {(translations.home as any)[link.labelKey] || (translations.location as any)[link.labelKey] || ''}
                        </span>
                    </Link>
                  )
              })}
            </div>
          </footer>
      </div>
  );
}
