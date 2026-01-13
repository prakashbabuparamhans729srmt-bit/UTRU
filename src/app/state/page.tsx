
'use client';

import {
  Search,
  X,
  MapPin,
  Phone,
  Mic,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { locationNavLinks, mainFooterNavLinks } from '@/lib/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function StatePage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  
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
              className="w-full bg-input rounded-full pl-10 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                    <X 
                        className="w-5 h-5 text-muted-foreground cursor-pointer"
                        onClick={() => setSearchQuery('')}
                    />
                )}
                <div className="w-px h-5 bg-border"></div>
                <Mic className="w-5 h-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl flex flex-col h-auto px-3 py-1.5 items-center">
            <Phone className="w-5 h-5" />
            <span className="text-xs font-semibold">{translations.location.emergency}</span>
          </Button>
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
        
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">State Page</h1>
            <p className="text-muted-foreground">Content for the state will be displayed here.</p>
        </div>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
        <div className="flex justify-around items-center p-2">
          {mainFooterNavLinks.map((link, index) => (
              <Link key={index} href={link.href} className={cn(
                  "flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md transition-colors w-16", 
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:bg-accent/50'
                )}>
                <link.icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{translations.location[link.labelKey as keyof typeof translations.location]}</span>
              </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
