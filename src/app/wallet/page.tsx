
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function WalletPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="bg-white text-black">
        <header className="p-4 flex items-center gap-4 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">Wallet details</h1>
        </header>
      </div>

      <main className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-400 to-teal-400 p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full" />
            </div>
          </div>
          <p className="text-sm">AvailableBalance</p>
          <p className="text-4xl font-bold mb-4">₹ 7,630</p>
          <div className="flex justify-between text-sm">
            <span>**** 0149</span>
            <span>05/25</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">Available balance</p>

        <h2 className="text-lg font-semibold mb-4">Transition history</h2>

        <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                <span className="font-medium">Refund</span>
                <span className="bg-gray-600/70 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">Rs. 260</span>
            </div>
             <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                <span className="font-medium">Refund</span>
                <span className="bg-gray-600/70 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">Rs. 260</span>
            </div>
        </div>
      </main>
    </div>
  );
}
