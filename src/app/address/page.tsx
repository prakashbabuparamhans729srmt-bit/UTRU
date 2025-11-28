
'use client';

import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddressPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-card flex items-center gap-4 sticky top-0 z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full">
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold">My addresses</h1>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <div className="flex-grow flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-2">Nothing here yet</h2>
            <p className="text-muted-foreground mb-6">
            Tell us where you want your orders delivered
            </p>
            <Button 
              className="bg-primary text-primary-foreground rounded-full px-8 py-6 text-base"
              onClick={() => router.push('/new-address')}
            >
              Add new address
            </Button>
        </div>
      </main>

      <footer className="bg-card p-4 rounded-t-3xl">
        <div className="bg-card p-4 rounded-xl border mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="https://www.google.com/images/branding/product/1x/maps_64dp.png" 
                alt="Map pin"
                width={48}
                height={48}
                className="bg-gray-200 rounded-full p-1"
                />
              <div>
                <p className="font-semibold text-sm">Khasra No 206 Village Shahadara</p>
                <p className="text-xs text-muted-foreground">Sector 141 Noida</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-primary text-primary">Change</Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Use current location</span>
          <Button variant="default" className="rounded-full flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
