
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingCart, X, Plus } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <div className="relative flex flex-col items-center gap-2">
        {isOpen && (
          <div className="flex flex-col items-center gap-3">
            <Button
              size="icon"
              className="rounded-full w-14 h-14 bg-secondary text-secondary-foreground shadow-lg"
              onClick={() => router.push('/chatbot')}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              className="rounded-full w-14 h-14 bg-secondary text-secondary-foreground shadow-lg"
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </div>
        )}
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-primary shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
        </Button>
      </div>
    </div>
  );
}
