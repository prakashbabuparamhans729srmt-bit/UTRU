
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageCircle, ShoppingCart, ClipboardList, Plus } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const mainButtonClasses = `rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${isOpen ? 'rotate-45' : 'rotate-0'}`;
  const subButtonClasses = "rounded-full w-14 h-14 bg-secondary text-secondary-foreground shadow-lg";

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <div className="relative flex flex-col items-center gap-3">
        {isOpen && (
          <div className="flex flex-col items-center gap-3 transition-all duration-300 ease-in-out">
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/my-plans'); setIsOpen(false); }}
              aria-label="Bookings"
            >
              <ClipboardList className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/chatbot'); setIsOpen(false); }}
              aria-label="Chat"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              className={subButtonClasses}
              onClick={() => { router.push('/cart'); setIsOpen(false); }}
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </div>
        )}
        <Button
          size="icon"
          className={mainButtonClasses}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close actions menu" : "Open actions menu"}
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
