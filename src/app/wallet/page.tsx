
'use client';

import { ChevronLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function WalletPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
        <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.wallet.title}</h1>
        </header>

      <main className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-orange-400 p-6 mb-6 text-white shadow-lg flex flex-col justify-between h-48">
          <div>
            <p className="text-sm opacity-80">{translations.wallet.availableBalance}</p>
            <p className="text-4xl font-bold">₹ 1,250</p>
          </div>
          <div className="flex justify-end">
            <Button className="bg-white/20 text-white hover:bg-white/30 rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">{translations.wallet.transitionHistory}</h2>

        <div className="space-y-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                <div>
                    <p className="font-medium">Referral Bonus</p>
                    <p className="text-sm text-muted-foreground">From Suresh</p>
                </div>
                <span className="text-green-500 font-semibold text-base">+ ₹200</span>
            </div>
             <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                <div>
                    <p className="font-medium">{translations.wallet.refund}</p>
                    <p className="text-sm text-muted-foreground">Order #ORD12345</p>
                </div>
                <span className="text-green-500 font-semibold text-base">+ ₹260</span>
            </div>
             <div className="flex items-center justify-between bg-card p-4 rounded-lg border">
                <div>
                    <p className="font-medium">House Cleaning</p>
                    <p className="text-sm text-muted-foreground">Booking #ORD789456</p>
                </div>
                <span className="text-foreground font-semibold text-base">- ₹899</span>
            </div>
        </div>
      </main>
    </div>
  );
}
