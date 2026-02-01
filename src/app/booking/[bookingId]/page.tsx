'use client';

import { ChevronLeft, Home, MapPin, Package, CheckCircle2, Truck, Star, Loader2, FileText, ChevronRight } from 'lucide-react';
import { useRouter, useParams, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useDoc } from '@/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


// Types copied from my-plans page, with Address added from CartContext
interface BookingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selectedDate: { seconds: number; nanoseconds: number; } | Date;
  selectedTime: string;
}
interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Hotel' | 'Other';
  name: string;
  mobile: string;
  fullAddress: string;
  floor?: string;
  landmark?: string;
}
interface Booking {
  id: string;
  userId: string;
  items: BookingItem[];
  finalTotal: number;
  total: number;
  deliveryFee: number;
  platformFee: number;
  placedAt: { seconds: number; nanoseconds: number; };
  deliveryAddress: Address;
  discount?: number;
  couponCode?: string;
  status?: 'Placed' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  rating?: number;
  review?: string;
}

const statusSteps = [
    { name: 'Placed', icon: Package },
    { name: 'Confirmed', icon: CheckCircle2 },
    { name: 'In Progress', icon: Truck },
    { name: 'Completed', icon: Star },
];

function BookingStatusTracker({ status }: { status: string }) {
    const currentStatusIndex = statusSteps.findIndex(step => step.name === status);
    const getStatusVariant = (status?: string): "default" | "secondary" | "outline" | "destructive" => {
        switch (status) {
            case 'Placed':
            case 'Confirmed':
                return 'default';
            case 'In Progress':
                return 'secondary';
            case 'Completed':
                return 'outline';
            case 'Cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    }

    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="font-bold">Booking Status</h2>
                 <Badge 
                    variant={getStatusVariant(status)}
                    className={cn(status === 'Completed' && 'border-green-500 text-green-600', 'capitalize')}
                >
                    {status}
                </Badge>
            </div>
            {status !== 'Cancelled' && (
                 <div className="flex justify-between items-center">
                    {statusSteps.map((step, index) => {
                         const isActive = index <= currentStatusIndex;
                         return(
                            <div key={step.name} className="flex flex-col items-center flex-1">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2",
                                    isActive ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border"
                                )}>
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <p className={cn("text-xs mt-2 text-center", isActive ? "font-semibold text-primary" : "text-muted-foreground")}>{step.name}</p>
                            </div>
                         );
                    })}
                </div>
            )}
            {status === 'Cancelled' && (
                <p className="text-center text-destructive">This booking has been cancelled.</p>
            )}
        </Card>
    );
}

function RatingStars({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 ${
                        star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                    } ${interactive ? 'cursor-pointer transition-transform hover:scale-125' : ''}`}
                    onClick={() => interactive && onRate?.(star)}
                />
            ))}
        </div>
    );
}

function RateBookingForm({ booking }: { booking: Booking }) {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmitRating = async () => {
        if (rating === 0) {
            toast({ variant: 'destructive', title: 'Please select a rating' });
            return;
        }
        if (!user || !firestore) return;

        setIsSaving(true);
        const bookingRef = doc(firestore, 'users', user.uid, 'bookings', booking.id);
        const updateData = { rating, review };

        updateDoc(bookingRef, updateData)
            .then(() => {
                toast({ title: 'Rating submitted!', description: 'Thank you for your feedback.' });
                // The useDoc hook will handle the re-render automatically.
            })
            .catch((err) => {
                const permissionError = new FirestorePermissionError({
                    path: bookingRef.path,
                    operation: 'update',
                    requestResourceData: updateData,
                });
                errorEmitter.emit('permission-error', permissionError);
                toast({ variant: 'destructive', title: 'Failed to submit rating' });
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <Card className="p-4">
            <h2 className="font-bold text-center mb-2">How was your experience?</h2>
            <div className="flex justify-center mb-4">
                 <RatingStars rating={rating} onRate={setRating} interactive={true} />
            </div>
            <Textarea 
                placeholder="Write a review (optional)..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mb-4 bg-muted"
            />
            <Button onClick={handleSubmitRating} className="w-full" disabled={rating === 0 || isSaving}>
                {isSaving ? <Loader2 className="animate-spin" /> : 'Submit Rating'}
            </Button>
        </Card>
    );
}


export default function BookingDetailPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params.bookingId as string;

    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();

    const bookingRef = useMemo(() => {
        if (!user || !firestore || !bookingId) return null;
        return doc(firestore, 'users', user.uid, 'bookings', bookingId);
    }, [user, firestore, bookingId]);

    const { data: booking, loading: bookingLoading } = useDoc<Booking>(bookingRef);

    const isLoading = userLoading || bookingLoading;

    if (isLoading) {
        return (
            <div className="bg-background text-foreground min-h-screen">
                 <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                    <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                        <ChevronLeft />
                    </Button>
                    <h1 className="text-lg font-semibold">Booking Details</h1>
                </header>
                <main className="p-4 space-y-4">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                </main>
            </div>
        );
    }
    
    if (!booking) {
        // This will be caught by notFound() from Next.js if the doc doesn't exist
        notFound();
    }

    const renderRatingSection = () => {
        if (booking.status !== 'Completed') return null;

        if (booking.rating) {
            return (
                <Card className="p-4">
                    <h2 className="font-bold mb-2">Your Rating</h2>
                    <div className="flex items-center gap-2">
                        <RatingStars rating={booking.rating} />
                        <span className="font-bold">{booking.rating}/5</span>
                    </div>
                    {booking.review && <p className="text-muted-foreground mt-2 italic">"{booking.review}"</p>}
                </Card>
            )
        }

        return <RateBookingForm booking={booking} />;
    }

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                <ChevronLeft />
                </Button>
                <div>
                    <h1 className="text-lg font-semibold">Booking Details</h1>
                    <p className="text-xs text-muted-foreground font-mono">#{booking.id.substring(0, 8).toUpperCase()}</p>
                </div>
            </header>

            <main className="flex-grow p-4 space-y-4 pb-8">
                {booking.status && <BookingStatusTracker status={booking.status} />}
                
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-muted-foreground text-sm font-semibold mb-1">DELIVERING TO</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                    <Home className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold">{booking.deliveryAddress.type}</p>
                                    <p className="text-sm text-muted-foreground max-w-xs truncate">{booking.deliveryAddress.fullAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                     <h2 className="font-bold mb-2">Order Summary</h2>
                     <div className="divide-y">
                        {booking.items.map((item, index) => (
                             <div key={index} className="flex items-center gap-4 py-3">
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
                                    {format(item.selectedDate instanceof Date ? item.selectedDate : new Date((item.selectedDate as any).seconds * 1000), 'EEE, d MMM')} &bull; {item.selectedTime}
                                    </p>
                                </div>
                                <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                     </div>
                </Card>

                <Card className="p-4">
                    <h2 className="font-bold mb-4">Payment Details</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Item Total</span>
                            <span>₹{booking.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>₹{booking.deliveryFee.toLocaleString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform Fee</span>
                            <span>₹{booking.platformFee.toLocaleString()}</span>
                        </div>
                        {booking.discount && booking.discount > 0 && (
                            <div className="flex justify-between text-green-600 dark:text-green-400">
                                <div className="flex items-center gap-1">
                                     <span>Discount ({booking.couponCode})</span>
                                </div>
                                <span>- ₹{booking.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        <Separator className="my-2"/>
                         <div className="flex justify-between font-bold text-base">
                            <span>Paid</span>
                            <span>₹{booking.finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </Card>

                {renderRatingSection()}
            </main>
        </div>
    )
}
