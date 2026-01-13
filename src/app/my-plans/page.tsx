
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function MyPlansPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">My Plans</h1>
      </header>
      <main className="p-6 text-center">
        <h2 className="text-xl font-bold mb-1">Active plans</h2>
        <p className="text-muted-foreground">You have no active plans</p>
      </main>
    </div>
  );
}
