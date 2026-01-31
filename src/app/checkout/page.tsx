'use client';

import { ChevronLeft, Home, MapPin, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function CheckoutItemCard({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={48}
        height={48}
        className="rounded-lg object-cover aspect-square"
      />
      <div className="flex-grow">
        <p className="font-semibold text-sm">{item.name}</p>
        <p className="text-xs text-muted-foreground">Qty: 1</p>
      </div>
      <p className="font-bold text-sm">₹{item.price.toLocaleString()}</p>
    </div>
  );
}


export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCart();
    const { translations } = useLanguage();

    if (items.length === 0) {
        // Redirect to home if cart is empty
        if (typeof window !== 'undefined') {
            router.replace('/');
        }
        return null;
    }

    const handlePlaceOrder = () => {
        // Here you would typically process the payment
        // For this demo, we'll just simulate success
        clearCart();
        router.push('/payment-success');
    }

    const deliveryFee = 50;
    const platformFee = 10;
    const finalTotal = total + deliveryFee + platformFee;


    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">Checkout</h1>
            </header>

            <main className="flex-grow p-4 space-y-6 pb-40">
                {/* Delivery Address Section */}
                <Card className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-muted-foreground text-sm font-semibold mb-2">DELIVERING TO</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                    <Home className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold">Home</p>
                                    <p className="text-sm text-muted-foreground max-w-xs truncate">A-42, Sector 63, Noida, Uttar Pradesh 201301</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full border-primary text-primary" onClick={() => router.push('/address')}>Change</Button>
                    </div>
                </Card>

                {/* Order Summary Section */}
                <Card className="p-4">
                     <h2 className="font-bold mb-2">Order Summary</h2>
                     <div className="divide-y">
                        {items.map(item => <CheckoutItemCard key={item.id} item={item} />)}
                     </div>
                </Card>

                {/* Payment Details Section */}
                <Card className="p-4">
                    <h2 className="font-bold mb-4">Payment Details</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Item Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>₹{deliveryFee.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform Fee</span>
                            <span>₹{platformFee.toLocaleString()}</span>
                        </div>
                        <Separator className="my-2"/>
                         <div className="flex justify-between font-bold text-base">
                            <span>To Pay</span>
                            <span>₹{finalTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </Card>

            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-10">
                <div className='flex justify-between items-center mb-2'>
                     <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-sm">Deliver to <span className='font-bold'>Home</span></p>
                            <p className="text-xs text-muted-foreground">in 25-30 mins</p>
                        </div>
                     </div>
                     <div className='flex items-center gap-2'>
                        <p className='font-bold text-lg'>₹{finalTotal.toLocaleString()}</p>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical />
                        </Button>
                     </div>
                </div>
                <Button size="lg" className="w-full h-12 text-base" onClick={handlePlaceOrder}>
                    Place Order & Pay
                </Button>
            </footer>

        </div>
    )
}
