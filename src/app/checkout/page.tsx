
'use client';

import { ChevronLeft, Home, MapPin, MoreVertical, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem, type Address } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useUser, useFirestore } from '@/firebase';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


function CheckoutItemCard({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <Link href={`/service/${item.id}`} className="shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={48}
          height={48}
          className="rounded-lg object-cover aspect-square"
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/service/${item.id}`}>
            <p className="font-semibold text-sm hover:text-primary transition-colors">{item.name}</p>
        </Link>
        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
        <p className="text-xs text-muted-foreground">
          {format(item.selectedDate, 'EEE, d MMM')} &bull; {item.selectedTime}
        </p>
      </div>
      <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
    </div>
  );
}


export default function CheckoutPage() {
    const router = useRouter();
    const { items, total, clearCart, deliveryFee, platformFee, couponCode, discount, finalTotal, deliveryAddress } = useCart();
    const { translations } = useLanguage();
    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    if (items.length === 0 && typeof window !== 'undefined') {
        router.replace('/');
        return null;
    }

    const handlePlaceOrder = () => {
        if (!user || !firestore) {
            toast({ variant: 'destructive', title: 'Error', description: 'User not logged in or Firestore not available.'});
            router.push('/phone-login');
            return;
        }
        if (!deliveryAddress) {
            toast({ variant: 'destructive', title: 'Address Missing', description: 'Please select a delivery address.' });
            return;
        }

        setIsPlacingOrder(true);

        const bookingData = {
            userId: user.uid,
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                selectedDate: item.selectedDate,
                selectedTime: item.selectedTime,
            })),
            total,
            deliveryFee,
            platformFee,
            discount,
            couponCode,
            finalTotal,
            placedAt: serverTimestamp(),
            deliveryAddress: deliveryAddress,
        };

        const bookingsCol = collection(firestore, 'users', user.uid, 'bookings');
        
        addDoc(bookingsCol, bookingData)
          .then(() => {
              clearCart();
              router.push('/payment-success');
          })
          .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
              path: `users/${user.uid}/bookings`,
              operation: 'create',
              requestResourceData: bookingData,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'Order Failed',
                description: 'Could not save your booking. Please try again.',
            });
          })
          .finally(() => {
              setIsPlacingOrder(false);
          });
    }

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
                        {deliveryAddress ? (
                            <>
                                <div>
                                    <p className="text-muted-foreground text-sm font-semibold mb-2">DELIVERING TO</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                            <Home className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold">{deliveryAddress.type}</p>
                                            <p className="text-sm text-muted-foreground max-w-xs truncate">{deliveryAddress.fullAddress}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-full border-primary text-primary" onClick={() => router.push('/address')}>Change</Button>
                            </>
                        ) : (
                            <div className='w-full flex flex-col items-center text-center gap-2 py-4'>
                                <p className='font-semibold'>Please select a delivery address</p>
                                <Button onClick={() => router.push('/address')}>Select Address</Button>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Order Summary Section */}
                <Card className="p-4">
                     <h2 className="font-bold mb-2">Order Summary</h2>
                     <div className="divide-y">
                        {items.map(item => <CheckoutItemCard key={item.cartItemId} item={item} />)}
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
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600 dark:text-green-400">
                                <span>Discount ({couponCode})</span>
                                <span>- ₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        <Separator className="my-2"/>
                         <div className="flex justify-between font-bold text-base">
                            <span>To Pay</span>
                            <span>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </Card>

            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-10">
                <div className='flex justify-between items-center mb-2'>
                     <div className="flex items-center gap-3">
                        {deliveryAddress ? (
                            <>
                                <MapPin className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-sm">Deliver to <span className='font-bold'>{deliveryAddress.type}</span></p>
                                    <p className="text-xs text-muted-foreground">in 25-30 mins</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">No address selected</p>
                        )}
                     </div>
                     <div className='flex items-center gap-2'>
                        <p className='font-bold text-lg'>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical />
                        </Button>
                     </div>
                </div>
                {userLoading ? (
                    <Button disabled size="lg" className="w-full h-12 text-base">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </Button>
                ) : user ? (
                    <Button size="lg" className="w-full h-12 text-base" onClick={handlePlaceOrder} disabled={isPlacingOrder || !deliveryAddress}>
                        {isPlacingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Place Order & Pay'}
                    </Button>
                ) : (
                    <Button size="lg" className="w-full h-12 text-base" onClick={() => router.push('/phone-login')}>
                        Login to Place Order
                    </Button>
                )}
            </footer>

        </div>
    )
}
