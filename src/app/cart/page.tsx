
'use client';
import { ChevronLeft, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart, type CartItem } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';


function CartItemCard({ item }: { item: CartItem }) {
  const { updateItemQuantity } = useCart();

  return (
    <Card className="flex items-start gap-4 p-4">
      <Link href={`/service/${item.id}`} className="shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg object-cover aspect-square"
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/service/${item.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {format(item.selectedDate, 'EEE, d MMM yyyy')}
        </p>
        <p className="text-sm text-muted-foreground">{item.selectedTime}</p>
        <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItemQuantity(item.cartItemId, item.quantity - 1)}>
                    <Minus className="h-4 w-4"/>
                </Button>
                <span className="font-bold">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItemQuantity(item.cartItemId, item.quantity + 1)}>
                    <Plus className="h-4 w-4"/>
                </Button>
            </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.cartItemId, 0)}>
        <Trash2 className="w-5 h-5 text-destructive" />
      </Button>
    </Card>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, total, deliveryFee, platformFee, finalTotal, couponCode, discount, applyCoupon, removeCoupon } = useCart();
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
        toast({ title: 'Coupon applied!', description: `You've received a discount!` });
    } else {
        toast({ variant: 'destructive', title: 'Invalid Coupon', description: 'The coupon code you entered is not valid.' });
    }
    setCouponInput('');
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: 'Coupon Removed',
      description: 'Your cart total has been updated.',
    });
  };


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

      <main className="flex-grow p-4 space-y-4 pb-48">
        {items.map((item) => (
          <CartItemCard key={item.cartItemId} item={item} />
        ))}
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-10 space-y-4">
          {!couponCode ? (
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="bg-muted"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
              />
              <Button onClick={handleApplyCoupon} disabled={!couponInput.trim()}>Apply</Button>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-sm">
              <p className="font-semibold text-green-700 dark:text-green-300">
                Coupon <span className="font-bold">{couponCode}</span> applied!
              </p>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-green-700 dark:text-green-300 h-auto py-1">Remove</Button>
            </div>
          )}

          <h2 className="text-lg font-bold">{translations.cart.paymentSummary}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{translations.cart.itemTotal}</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">{translations.cart.deliveryFee}</span>
                <span>₹{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">{translations.cart.platformFee}</span>
                <span>₹{platformFee.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Discount</span>
                <span>- ₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>{translations.cart.toPay}</span>
            <span>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        <Button size="lg" className="w-full h-12 text-base" onClick={() => router.push('/checkout')}>
          {translations.cart.checkout}
        </Button>
      </footer>
    </div>
  );
}
