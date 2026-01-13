
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutUsPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.about.title}</h1>
      </header>
      <main className="p-6 space-y-8">
        <div>
          <p className="text-sm text-muted-foreground">
            {translations.about.welcome}
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">{translations.about.storyTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {translations.about.storyP1}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {translations.about.storyP2}
          </p>
        </div>
      </main>
    </div>
