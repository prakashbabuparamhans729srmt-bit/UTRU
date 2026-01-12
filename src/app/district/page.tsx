
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Search,
  X,
  MapPin,
  Home as HomeIcon,
  BookCopy,
  PlaySquare,
  LayoutGrid,
  Phone,
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

export default function DistrictPage() {
  const { translations } = useLanguage();
  const trainImage = PlaceHolderImages.find((img) => img.id === 'location-train-viaduct');
  
  const navLinks = [
    { href: '/location', label: translations.location.my },
    { href: '/district', label: translations.location.district },
    { href: '/state', label: translations.location.state },
    { href: '/bharat', label: translations.location.bharat },
  ];

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
              className="w-full bg-card border border-border rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer" />
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl flex flex-col h-auto px-3 py-1.5 items-center">
            <Phone className="w-5 h-5" />
            <span className="text-xs font-semibold">{translations.location.emergency}</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow pb-32">
        <div className="w-full px-4 my-4">
          <div className="grid w-full grid-cols-4 bg-transparent p-0 border-b">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} passHref>
                    <Button variant="ghost" className={cn(
                        "pb-2 rounded-none w-full",
                        link.href === '/district' ? 'border-b-2 border-primary text-primary shadow-none' : 'text-muted-foreground'
                    )}>
                        {link.label}
                    </Button>
                </Link>
            ))}
          </div>
        </div>

        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">District Page</h1>
            <p className="text-muted-foreground">Content for the district will be displayed here.</p>
        </div>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
        <div className="flex justify-around items-center p-2">
          <Link href="/" className="flex flex-col items-center h-auto text-muted-foreground">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">{translations.home.home}</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center h-auto text-muted-foreground">
            <BookCopy className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.library}</span>
          </Link>
          <Link href="/location" className="w-16 h-16 rounded-full bg-primary -translate-y-4 shadow-md border-4 border-background flex items-center justify-center">
             <LayoutGrid className="w-8 h-8 text-primary-foreground" />
          </Link>
          <Link href="/search" className="flex flex-col items-center h-auto text-muted-foreground">
            <PlaySquare className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.explore}</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center h-auto text-muted-foreground">
            <LayoutGrid className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.opinion}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
