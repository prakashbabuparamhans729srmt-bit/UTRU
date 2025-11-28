
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NativeDevicesPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b bg-white rounded-b-lg sticky top-0 z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold text-black">Native</h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 bg-white">
        <div className="flex-grow flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-2 text-black">Oops, you haven't placed an order yet</h2>
            <p className="text-muted-foreground">[Text Widget]</p>
        </div>
      </main>
    </div>
  );
}

    