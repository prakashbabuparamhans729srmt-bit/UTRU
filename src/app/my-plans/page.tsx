
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function MyPlansPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="bg-white rounded-b-lg">
        <header className="p-4 flex items-center gap-4 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold text-black">My Plans</h1>
        </header>
        <main className="p-4 pb-8">
          <h2 className="text-xl font-bold mb-1 text-black">Active plans</h2>
          <p className="text-gray-500">You have no active plans</p>
        </main>
      </div>
    </div>
  );
}

