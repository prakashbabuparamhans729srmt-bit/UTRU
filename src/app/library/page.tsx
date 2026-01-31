
'use client';

import {
  Search,
  X,
  MapPin,
  Mic,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { locationNavLinks, mainFooterNavLinks } from '@/lib/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';

export default function LibraryPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { isListening, isMicAvailable, startListening } = useSpeechRecognition(setSearchQuery);

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
              placeholder={isListening ? "Listening..." : translations.location.searchPlaceholder}
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
                {isMicAvailable && (
                  <Mic
                    className={cn("w-5 h-5 text-muted-foreground cursor-pointer", isListening && "text-primary animate-pulse")}
                    onClick={() => startListening()}
                  />
                )}
                <div className="w-px h-5 bg-border"></div>
                <Link href="/filter">
                  <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
                </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-32">
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">Library Page</h1>
            <p className="text-muted-foreground">Content for the Library will be displayed here.</p>
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
