
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ServiceGrid from '@/components/ServiceGrid';

const electronicsServices = [
  { id: 'electronics-tv-repair', name: 'TV Repair' },
  { id: 'electronics-ac-repair', name: 'AC Service & Repair' },
  { id: 'electronics-washing-machine', name: 'Washing Machine Repair' },
  { id: 'electronics-geyser', name: 'Geyser Repair' },
];

export default function ElectronicsPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Electronics</h1>
      </header>
      <main className="p-4">
        <ServiceGrid services={electronicsServices} />
      </main>
    </div>
  );
}

    