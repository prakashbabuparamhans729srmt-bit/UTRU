
'use client';

import { ChevronLeft, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function NativeDevicesPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.nativeDevices.title}</h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Smartphone className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{translations.nativeDevices.oops}</h2>
        <p className="text-muted-foreground">{translations.nativeDevices.textWidget}</p>
      </main>
    </div>
  );
}
