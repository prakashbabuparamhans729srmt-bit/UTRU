
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutUsPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="bg-white rounded-b-lg text-black">
        <header className="p-4 flex items-center gap-4 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold text-center flex-grow -ml-12">{translations.about.title}</h1>
        </header>
        <main className="p-6 space-y-8">
          <div>
            <p className="text-sm">
              {translations.about.welcome}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 text-center">{translations.about.storyTitle}</h2>
            <p className="text-sm">
              {translations.about.storyP1}
            </p>
            <p className="text-sm mt-4">
              {translations.about.storyP2}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

    