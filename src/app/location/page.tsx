
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Search,
  X,
  MapPin,
  Mic,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { locationNavLinks, mainFooterNavLinks } from '@/lib/navigation';
import { useState } from 'react';
import { useVoiceSearch } from '@/context/VoiceSearchContext';

export default function LocationPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal: openVoiceModal } = useVoiceSearch();
  const trainImage = PlaceHolderImages.find((img) => img.id === 'location-train-viaduct');
  const blackFridayImage = PlaceHolderImages.find((img) => img.id === 'location-black-friday');
  const shoppingWomanImage = PlaceHolderImages.find((img) => img.id === 'location-shopping-woman');
  const popularItems = PlaceHolderImages.filter(img => img.id.startsWith('location-popular-'));


  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-background sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-foreground" />
            <span className="font-semibold">{translations.location.selectLocation}</span>
          </div>
          <span className="text-sm">{translations.location.man}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={translations.location.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-input rounded-full pl-10 pr-28 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
          </div>
        </div>
      </header>

      <main className="flex-grow pb-32">
        <div className="w-full px-4 my-4">
          <div className="grid w-full grid-cols-4 bg-transparent p-0 border-b">
            {locationNavLinks.map(link => (
                <Link key={link.href} href={link.href} passHref>
                    <Button variant="ghost" className={cn(
                        "pb-2 rounded-none w-full",
                        pathname === link.href ? 'border-b-2 border-primary text-primary shadow-none' : 'text-muted-foreground'
                    )}>
                        {translations.location[link.labelKey as keyof typeof translations.location]}
                    </Button>
                </Link>
            ))}
          </div>
        </div>

        <Carousel className="w-full mb-4" opts={{ loop: true }}>
          <CarouselContent>
            {trainImage && (
              <CarouselItem>
                <div className="px-4">
                  <Image
                    src={trainImage.imageUrl}
                    alt={trainImage.description}
                    width={600}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-[16/9]"
                    data-ai-hint={trainImage.imageHint}
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>

        <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
                {blackFridayImage && (
                    <div className="relative rounded-lg overflow-hidden bg-[#E4C0E5] flex flex-col justify-center items-center p-4 aspect-square">
                        <h2 className="text-black font-bold text-xl">{translations.location.blackFriday}</h2>
                        <p className="text-black text-sm">{translations.location.discountsAvailable}</p>
                    </div>
                )}
                {shoppingWomanImage && (
                    <Image
                      src={shoppingWomanImage.imageUrl}
                      alt={shoppingWomanImage.description}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover w-full aspect-square"
                      data-ai-hint={shoppingWomanImage.imageHint}
                    />
                )}
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <div className="w-5 h-1 bg-primary rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            </div>
        </div>

        <div className="px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{translations.location.whatElsePopular}</h2>
            <Button variant="outline" className="rounded-full">{translations.location.seeAll}</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-4">
          {popularItems.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-lg border-0">
              <CardContent className="p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  width={200}
                  height={200}
                  className="object-cover w-full aspect-square rounded-lg"
                  data-ai-hint={item.imageHint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

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
