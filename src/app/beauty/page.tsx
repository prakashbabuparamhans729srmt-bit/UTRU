
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ServiceGrid from '@/components/ServiceGrid';

const beautyServices = [
    { id: 'beauty-salon', name: 'Salon for Women' },
    { id: 'beauty-spa', name: 'Spa at Home' },
    { id: 'beauty-makeup', name: 'Makeup & Hair' },
    { id: 'beauty-manicure', name: 'Manicure & Pedicure' },
];

export default function BeautyPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Beauty</h1>
      </header>
       <main className="p-4">
        <ServiceGrid services={beautyServices} />
      </main>
    </div>
  );
}

    