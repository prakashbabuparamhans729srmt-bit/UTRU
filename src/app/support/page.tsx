
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function SupportPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-white text-black min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.support.title}</h1>
      </header>
      <main className="p-4">
        <div className="py-4">
          <h2 className="font-semibold">{translations.support.aiChatbot}</h2>
          <p className="text-sm text-gray-500">{translations.support.webLink}</p>
        </div>
      </main>
    </div>
  );
}

    