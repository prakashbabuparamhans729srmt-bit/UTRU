
'use client';

import { ChevronLeft, Home, MapPin, Loader2, ShoppingCart, Wallet, CreditCard, Banknote, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useState, useMemo } from 'react';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
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
    
    const { data: userProfile, loading: profileLoading } = useDoc<any>(userProfileRef);

    const walletBalance = userProfile?.walletBalance ?? 0;
    const canUseWallet = walletBalance >= finalTotal;

    const handlePlaceOrder = () => {
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

        const batch = writeBatch(firestore);
        
        // 1. Create the booking document
        batch.set(bookingRef, bookingData);

        // 2. If Wallet is selected, handle debit and transaction log
        if (paymentMethod === 'wallet' && canUseWallet) {
            const transactionRef = doc(collection(firestore, 'users', user.uid, 'walletTransactions'));
            const transactionData = {
                amount: -finalTotal,
                type: 'debit',
                description: `Payment for Booking #${bookingRef.id.substring(0, 8).toUpperCase()}`,
                timestamp: serverTimestamp(),
            };
            batch.set(transactionRef, transactionData);

            // Update user balance atomically in the same batch
            batch.update(userProfileRef, { 
                walletBalance: walletBalance - finalTotal 
            });
        }

        // Commit the batch - A to Z action
        batch.commit()
            .then(() => {
                const url = `/payment-success?amount=${finalTotal}&bookingId=${bookingRef.id.substring(0, 8).toUpperCase()}&method=${paymentMethod}`;
                clearCart(); // Clear cart state on success
                router.push(url);
            })
            .catch((serverError) => {
                 const permissionError = new FirestorePermissionError({
                  path: `users/${user.uid}/bookings/${bookingRef.id}`,
                  operation: 'create',
                  requestResourceData: bookingData,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({
                    variant: 'destructive',
                    title: translations.toasts.orderFailed,
                    description: paymentMethod === 'wallet' ? translations.toasts.orderFailedDescWallet : translations.toasts.orderFailedDescCod,
                });
            })
            .finally(() => {
                setIsPlacingOrder(false);
            });
    }

    const handleRemoveCoupon = () => {
        removeCoupon();
        toast({
            title: translations.toasts.couponRemoved,
            description: translations.toasts.couponRemovedDesc,
        });
    };
    
    const isLoading = userLoading || profileLoading;

    // Prevent staying on checkout with empty cart
    if (items.length === 0 && typeof window !== 'undefined' && !isPlacingOrder) {
        router.replace('/');
        return null;
    }

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
                {/* Delivery Address Card */}
                <Card className="p-4 rounded-2xl shadow-sm border-primary/10">
                    <div className="flex justify-between items-start">
                        {deliveryAddress ? (
                            <>
                                <div className="flex-grow pr-4">
                                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-2">{translations.checkout.deliveringTo}</p>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                            <Home className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm">{deliveryAddress.type}</p>
                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{deliveryAddress.fullAddress}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-full border-primary text-primary h-8 px-4 text-xs font-bold" onClick={() => router.push('/address')}>{translations.checkout.change}</Button>
                            </>
                        ) : (
                            <div className='w-full flex flex-col items-center text-center gap-3 py-6'>
                                <MapPin className="w-12 h-12 text-muted-foreground/30" />
                                <p className='font-bold text-sm'>{translations.checkout.selectAddress}</p>
                                <Button onClick={() => router.push('/address')} className="rounded-full h-10 px-8">{translations.checkout.selectAddressButton}</Button>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Order Summary */}
                <Card className="p-4 rounded-2xl shadow-sm border-primary/10">
                     <h2 className="font-bold text-sm mb-4 flex items-center gap-2"><ShoppingCart size={16} className="text-primary"/> {translations.checkout.orderSummary}</h2>
                     <div className="divide-y divide-border/50">
                        {items.map(item => <CheckoutItemCard key={item.cartItemId} item={item} />)}
                     </div>
                </Card>
                
                {/* Payment Method Selection */}
                {user && (
                    <Card className="p-4 rounded-2xl shadow-sm border-primary/10">
                        <h2 className="font-bold text-sm mb-4 flex items-center gap-2"><CreditCard size={16} className="text-primary"/> {translations.checkout.paymentMethod}</h2>
                        {isLoading ? <Skeleton className="h-32 w-full rounded-xl" /> : (
                            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'wallet' | 'cod')} className="space-y-3">
                                <Label
                                    htmlFor="wallet"
                                    className={cn(
                                        "flex items-start justify-between rounded-xl border p-4 cursor-pointer transition-all hover:bg-muted/30",
                                        paymentMethod === 'wallet' ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border",
                                        !canUseWallet && "opacity-60 grayscale-[0.5]"
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                            <Wallet className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-sm">{translations.checkout.payWithWallet}</span>
                                            <span className="text-[10px] text-muted-foreground">{translations.checkout.balance}: <span className="font-bold text-foreground">₹{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></span>
                                            {!canUseWallet && (
                                                <div className="mt-2 flex flex-col gap-2">
                                                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">⚠️ {translations.checkout.insufficientBalance}</p>
                                                    <Button variant="link" className="p-0 h-auto text-[10px] text-primary font-bold justify-start" onClick={(e) => { e.preventDefault(); router.push('/wallet'); }}>
                                                        <PlusCircle size={12} className="mr-1"/> Recharge Now
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <RadioGroupItem value="wallet" id="wallet" disabled={!canUseWallet} className="mt-1" />
                                </Label>

                                <Label
                                    htmlFor="cod"
                                    className={cn(
                                        "flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all hover:bg-muted/30",
                                        paymentMethod === 'cod' ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                                            <Banknote className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <span className="font-bold text-sm">{translations.checkout.payOnDelivery}</span>
                                    </div>
                                    <RadioGroupItem value="cod" id="cod" />
                                </Label>
                            </RadioGroup>
                        )}
                    </Card>
                )}

                {/* Final Bill Details */}
                <Card className="p-4 rounded-2xl shadow-sm border-primary/10">
                    <h2 className="font-bold text-sm mb-4">{translations.checkout.paymentDetails}</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.cart.itemTotal}</span>
                            <span className="font-medium">₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.cart.deliveryFee}</span>
                            <span className="font-medium">₹{deliveryFee.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.cart.platformFee}</span>
                            <span className="font-medium">₹{platformFee.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                <div className="flex items-center gap-2">
                                     <span className="bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">OFFER: {couponCode}</span>
                                     <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-red-500 h-auto py-0 px-1 text-[10px] font-bold">REMOVE</Button>
                                </div>
                                <span className="font-bold">- ₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        <Separator className="my-2"/>
                         <div className="flex justify-between items-center font-extrabold text-lg pt-1">
                            <span>{translations.cart.toPay}</span>
                            <span className="text-primary">₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </Card>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-primary/10 p-4 z-40 shadow-[0_-8px_30px_rgb(0,0,0,0.05)] rounded-t-3xl">
                <div className='flex justify-between items-center mb-4 px-2'>
                     <div className="flex items-center gap-3">
                        {deliveryAddress ? (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground leading-none mb-1 uppercase tracking-tight">{translations.checkout.deliverTo} {deliveryAddress.type}</p>
                                    <p className="text-[10px] font-medium leading-none text-primary">{translations.checkout.inMins}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-red-500 font-bold">{translations.checkout.noAddressSelected}</p>
                        )}
                     </div>
                     <div className='flex items-center gap-2'>
                        <div className="text-right">
                            <p className="text-[10px] text-muted-foreground font-bold leading-none mb-1">TOTAL AMOUNT</p>
                            <p className='font-black text-xl leading-none'>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                     </div>
                </div>
                {isLoading ? (
                    <Button disabled size="lg" className="w-full h-14 rounded-2xl text-base">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {translations.checkout.loading}
                    </Button>
                ) : user ? (
                    <Button 
                        size="lg" 
                        className={cn(
                            "w-full h-14 rounded-2xl text-lg font-black shadow-lg transition-transform active:scale-[0.98]",
                            paymentMethod === 'wallet' && !canUseWallet ? "bg-muted text-muted-foreground" : "bg-primary hover:bg-primary/90"
                        )} 
                        onClick={handlePlaceOrder} 
                        disabled={isPlacingOrder || !deliveryAddress || (paymentMethod === 'wallet' && !canUseWallet)}
                    >
                        {isPlacingOrder ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (paymentMethod === 'wallet' ? translations.checkout.payFromWallet : translations.checkout.placeOrder)}
                    </Button>
                ) : (
                    <Button size="lg" className="w-full h-14 rounded-2xl text-lg font-black" onClick={() => router.push('/phone-login')}>
                        {translations.checkout.loginToPlaceOrder}
                    </Button>
                )}
            </footer>
        </div>
    )
}
