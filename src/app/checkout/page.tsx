'use client';

import { ChevronLeft, Home, MapPin, MoreVertical, Loader2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem, type Address } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useState, useMemo } from 'react';
import { addDoc, collection, doc, serverTimestamp, writeBatch, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';


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
    const { items, total, clearCart, deliveryFee, platformFee, couponCode, discount, finalTotal, deliveryAddress, removeCoupon } = useCart();
    const { translations } = useLanguage();
    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'cod'>('cod');

    const userProfileRef = useMemo(() => {
      if (!user || !firestore) return null;
      return doc(firestore, 'users', user.uid);
    }, [user, firestore]);
    
    const { data: userProfile, loading: profileLoading } = useDoc(userProfileRef);

    const canUseWallet = userProfile && userProfile.walletBalance >= finalTotal;

    if (items.length === 0 && typeof window !== 'undefined') {
        router.replace('/');
        return null;
    }

    const handlePlaceOrder = async () => {
        if (!user || !firestore || !userProfileRef) {
            toast({ variant: 'destructive', title: translations.toasts.error, description: translations.toasts.notLoggedIn});
            router.push('/phone-login');
            return;
        }
        if (!deliveryAddress) {
            toast({ variant: 'destructive', title: translations.toasts.addressMissing, description: translations.toasts.addressMissingDesc });
            return;
        }

        setIsPlacingOrder(true);

        const bookingRef = doc(collection(firestore, 'users', user.uid, 'bookings'));

        const bookingData = {
            id: bookingRef.id, 
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
            status: 'Placed',
            paymentMethod: paymentMethod,
        };

        if (paymentMethod === 'wallet' && canUseWallet && userProfile) {
            const batch = writeBatch(firestore);
            
            batch.set(bookingRef, bookingData);

            const transactionRef = doc(collection(firestore, 'users', user.uid, 'walletTransactions'));
            const transactionData = {
                amount: -finalTotal,
                type: 'debit',
                description: `Payment for Booking #${bookingRef.id.substring(0, 8).toUpperCase()}`,
                timestamp: serverTimestamp(),
            };
            batch.set(transactionRef, transactionData);

            const newBalance = userProfile.walletBalance - finalTotal;
            batch.update(userProfileRef, { walletBalance: newBalance });

            try {
                await batch.commit();
                const url = `/payment-success?amount=${finalTotal}&bookingId=${bookingRef.id.substring(0, 8).toUpperCase()}&method=wallet`;
                router.push(url);
                clearCart();
            } catch (serverError) {
                 const permissionError = new FirestorePermissionError({
                  path: `users/${user.uid} or subcollections`,
                  operation: 'update',
                  requestResourceData: { bookingData, transactionData },
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({
                    variant: 'destructive',
                    title: translations.toasts.orderFailed,
                    description: translations.toasts.orderFailedDescWallet,
                });
            } finally {
                setIsPlacingOrder(false);
            }
        } else {
            setDoc(bookingRef, bookingData)
              .then(() => {
                  const url = `/payment-success?amount=${finalTotal}&bookingId=${bookingRef.id.substring(0, 8).toUpperCase()}&method=cod`;
                  router.push(url);
                  clearCart();
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
                    title: translations.toasts.orderFailed,
                    description: translations.toasts.orderFailedDescCod,
                });
              })
              .finally(() => {
                  setIsPlacingOrder(false);
              });
        }
    }

    const handleRemoveCoupon = () => {
        removeCoupon();
        toast({
        title: translations.toasts.couponRemoved,
        description: translations.toasts.couponRemovedDesc,
        });
    };
    
    const isLoading = userLoading || profileLoading;

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <div className="flex items-center gap-4">
                    <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                        <ChevronLeft />
                    </Button>
                    <h1 className="text-lg font-semibold">{translations.checkout.title}</h1>
                </div>
                 <Link href="/cart" className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {items.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0">
                            {items.length}
                        </Badge>
                    )}
                </Link>
            </header>

            <main className="flex-grow p-4 space-y-6 pb-40">
                <Card className="p-4">
                    <div className="flex justify-between items-start">
                        {deliveryAddress ? (
                            <>
                                <div>
                                    <p className="text-muted-foreground text-sm font-semibold mb-2">{translations.checkout.deliveringTo}</p>
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
                                <Button variant="outline" size="sm" className="rounded-full border-primary text-primary" onClick={() => router.push('/address')}>{translations.checkout.change}</Button>
                            </>
                        ) : (
                            <div className='w-full flex flex-col items-center text-center gap-2 py-4'>
                                <p className='font-semibold'>{translations.checkout.selectAddress}</p>
                                <Button onClick={() => router.push('/address')}>{translations.checkout.selectAddressButton}</Button>
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="p-4">
                     <h2 className="font-bold mb-2">{translations.checkout.orderSummary}</h2>
                     <div className="divide-y">
                        {items.map(item => <CheckoutItemCard key={item.cartItemId} item={item} />)}
                     </div>
                </Card>
                
                {user && (
                    <Card className="p-4">
                        <h2 className="font-bold mb-4">{translations.checkout.paymentMethod}</h2>
                        {isLoading ? <Skeleton className="h-24 w-full" /> : (
                            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'wallet' | 'cod')} className="space-y-4">
                                {userProfile && userProfile.walletBalance > 0 && (
                                    <Label
                                        htmlFor="wallet"
                                        className={cn(
                                            "flex items-start justify-between rounded-lg border p-4 cursor-pointer transition-colors",
                                            paymentMethod === 'wallet' && "border-primary ring-2 ring-primary",
                                            !canUseWallet && "cursor-not-allowed opacity-50"
                                        )}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium">{translations.checkout.payWithWallet}</span>
                                            <span className="text-sm text-muted-foreground">{translations.checkout.balance}: ₹{userProfile.walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            {!canUseWallet && <p className="text-xs text-destructive mt-1">{translations.checkout.insufficientBalance}</p>}
                                        </div>
                                        <RadioGroupItem value="wallet" id="wallet" disabled={!canUseWallet} />
                                    </Label>
                                )}
                                <Label
                                    htmlFor="cod"
                                    className={cn(
                                        "flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors",
                                        paymentMethod === 'cod' && "border-primary ring-2 ring-primary"
                                    )}
                                >
                                    <span className="font-medium">{translations.checkout.payOnDelivery}</span>
                                    <RadioGroupItem value="cod" id="cod" />
                                </Label>
                            </RadioGroup>
                        )}
                    </Card>
                )}

                <Card className="p-4">
                    <h2 className="font-bold mb-4">{translations.checkout.paymentDetails}</h2>
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
                            <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                <div className="flex items-center gap-1">
                                     <span>Discount ({couponCode})</span>
                                     <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-green-700 dark:text-green-300 h-auto py-0.5 px-1.5 text-xs font-normal">{translations.checkout.remove}</Button>
                                </div>
                                <span>- ₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        <Separator className="my-2"/>
                         <div className="flex justify-between font-bold text-base">
                            <span>{translations.cart.toPay}</span>
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
                                    <p className="text-sm">{translations.checkout.deliverTo} <span className='font-bold'>{deliveryAddress.type}</span></p>
                                    <p className="text-xs text-muted-foreground">{translations.checkout.inMins}</p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">{translations.checkout.noAddressSelected}</p>
                        )}
                     </div>
                     <div className='flex items-center gap-2'>
                        <p className='font-bold text-lg'>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical />
                        </Button>
                     </div>
                </div>
                {isLoading ? (
                    <Button disabled size="lg" className="w-full h-12 text-base">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {translations.checkout.loading}
                    </Button>
                ) : user ? (
                    <Button 
                        size="lg" 
                        className="w-full h-12 text-base" 
                        onClick={handlePlaceOrder} 
                        disabled={isPlacingOrder || !deliveryAddress || (paymentMethod === 'wallet' && !canUseWallet)}
                    >
                        {isPlacingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (paymentMethod === 'wallet' ? translations.checkout.payFromWallet : translations.checkout.placeOrder)}
                    </Button>
                ) : (
                    <Button size="lg" className="w-full h-12 text-base" onClick={() => router.push('/phone-login')}>
                        {translations.checkout.loginToPlaceOrder}
                    </Button>
                )}
            </footer>

        </div>
    )
}
