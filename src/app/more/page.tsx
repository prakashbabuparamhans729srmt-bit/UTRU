
'use client';

import { ChevronLeft, Construction } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function MorePage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">More Categories</h1>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Construction className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-1">Coming Soon!</h2>
        <p className="text-muted-foreground">More categories and services will be added here.</p>
      </main>
    </div>
  );
}
