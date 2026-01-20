'use client';
import { ChevronLeft, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart, type CartItem } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';


function CartItemCard({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();

  return (
    <Card className="flex items-start gap-4 p-4">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-lg object-cover aspect-square"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          {format(item.selectedDate, 'EEE, d MMM yyyy')}
        </p>
        <p className="text-sm text-muted-foreground">{item.selectedTime}</p>
        <p className="font-bold mt-2">₹{item.price.toLocaleString()}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
        <Trash2 className="w-5 h-5 text-destructive" />
      </Button>
    </Card>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, total } = useCart();
  const { translations } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.cart.yourCart}</h1>
        </header>
        <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-1">{translations.cart.emptyTitle}</h2>
          <p className="text-muted-foreground mb-6">{translations.cart.emptySubtitle}</p>
          <Link href="/">
            <Button>{translations.cart.browseServices}</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.cart.yourCart} ({items.length})</h1>
      </header>

      <main className="flex-grow p-4 space-y-4 pb-32">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-10 space-y-4">
          <h2 className="text-lg font-bold">{translations.cart.paymentSummary}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{translations.cart.itemTotal}</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{translations.cart.taxesFees}</span>
              <span>₹{(total * 0.1).toLocaleString()}</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>{translations.cart.toPay}</span>
            <span>₹{(total * 1.1).toLocaleString()}</span>
          </div>
        <Button size="lg" className="w-full h-12 text-base">
          {translations.cart.checkout}
        </Button>
      </footer>
    </div>
  );
}
