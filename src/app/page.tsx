'use client';

import React, { useState, useRef } from 'react';
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
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import FloatingActionButton from '@/components/FloatingActionButton';
import { mainFooterNavLinks, homeCategoryLinks } from '@/lib/navigation.tsx';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import ServiceGrid from '@/components/ServiceGrid';
import { servicesData } from '@/lib/services';
import SideNavigationBar from '@/components/ui/SideNavigationBar';


export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { translations } = useLanguage();
  const { items: cartItems } = useCart();
  const featuredServices = servicesData.filter(s => ['cleaning-deep-cleaning', 'beauty-salon', 'electronics-ac-repair', 'car-full-service'].includes(s.id));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const carouselImages = PlaceHolderImages.filter(img => 
    img.id === 'city-night' || img.id === 'product-collage'
  );
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SideNavigationBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <header className="p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsSidebarOpen(true)} size="icon" variant="ghost">
              <Menu />
            </Button>
            <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white dark:bg-black rounded-full" />
            </div>
            <Link href="/address" className="flex flex-col">
              <span className="text-xs text-muted-foreground">{translations.home.locationLabel}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Noida 63</span>
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

      <main className="flex-grow pb-32">
        <Carousel 
          className="w-full my-4" 
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
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
        
        <div className="px-4 mb-6 flex justify-around">
            <Button variant="outline" className="rounded-full">
                <ShoppingCart className="w-4 h-4 mr-2"/>
                {translations.home.productBuy}
            </Button>
             <Button variant="outline" className="rounded-full" onClick={() => router.push('/more')}>
                <LayoutGrid className="w-4 h-4 mr-2"/>
                {translations.home.category}
            </Button>
        </div>

        <div className="px-4 mb-4">
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
