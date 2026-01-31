
'use client';

import { ChevronLeft, Star, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/card';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Copied from my-plans page, with rating and review added
interface Booking {
  id: string;
  items: { name: string }[];
  placedAt: { seconds: number; nanoseconds: number; }; // Firestore timestamp
  rating?: number;
  review?: string;
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

function RatingCard({ booking, onUpdate }: { booking: Booking, onUpdate: () => void }) {
    const [rating, setRating] = useState(booking.rating || 0);
    const [review, setReview] = useState(booking.review || '');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const firestore = useFirestore();
    const { user } = useUser();

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
                onUpdate(); // This will trigger a re-fetch in the parent if needed
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
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold">{booking.items[0]?.name}{booking.items.length > 1 ? ` + ${booking.items.length - 1} more` : ''}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(booking.placedAt.seconds * 1000), 'PPP')}</p>
                </div>
                {booking.rating && !isSaving && (
                    <RatingStars rating={booking.rating} />
                )}
            </div>
            {!booking.rating && (
                 <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-center mb-2">How was your experience?</p>
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
                </div>
            )}
            {booking.review && (
                <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">{booking.review}</p>
            )}
        </Card>
    );
}

export default function MyRatingsPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const bookingsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'bookings'), orderBy('placedAt', 'desc'));
  }, [user, firestore]);

  const { data: bookings, loading: bookingsLoading, error } = useCollection<Booking>(bookingsQuery);

  const { ratedBookings, unratedBookings, averageRating } = useMemo(() => {
    if (!bookings) return { ratedBookings: [], unratedBookings: [], averageRating: 0 };
    
    const rated: Booking[] = [];
    const unrated: Booking[] = [];
    let totalRating = 0;
    
    bookings.forEach(booking => {
      // Only consider past bookings for rating
      const bookingDate = new Date(booking.placedAt.seconds * 1000);
      if (bookingDate < new Date()) {
          if (booking.rating) {
            rated.push(booking);
            totalRating += booking.rating;
          } else {
            unrated.push(booking);
          }
      }
    });

    const avg = rated.length > 0 ? totalRating / rated.length : 0;
    return { ratedBookings: rated, unratedBookings: unrated, averageRating: parseFloat(avg.toFixed(1)) };
  }, [bookings]);

  const isLoading = userLoading || bookingsLoading;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.profile.myRating}</h1>
      </header>
      <main className="p-4 space-y-6">
        <Card className="p-6 text-center bg-card">
            <h2 className="text-muted-foreground text-sm font-semibold">YOUR AVERAGE RATING</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
                {isLoading ? <Skeleton className="h-10 w-24" /> : (
                    <>
                        <Star className="w-8 h-8 text-amber-400 fill-amber-400"/>
                        <p className="text-4xl font-bold">{averageRating}</p>
                    </>
                )}
            </div>
        </Card>
        
        {isLoading && Array.from({length: 3}).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-32 rounded-md" />
                </div>
                <Skeleton className="h-4 w-24 rounded-md" />
            </Card>
        ))}

        {!isLoading && (
            <>
                {unratedBookings.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Rate Your Past Services</h3>
                        <div className="space-y-4">
                            {unratedBookings.map(booking => (
                                <RatingCard key={booking.id} booking={booking} onUpdate={() => {}} /> // Re-render will be handled by useCollection
                            ))}
                        </div>
                    </div>
                )}
                
                {ratedBookings.length > 0 && (
                     <div className={unratedBookings.length > 0 ? "mt-8" : ""}>
                        <h3 className="text-lg font-semibold mb-4">Your Past Ratings</h3>
                        <div className="space-y-4">
                            {ratedBookings.map(booking => (
                                <RatingCard key={booking.id} booking={booking} onUpdate={() => {}} />
                            ))}
                        </div>
                    </div>
                )}
            </>
        )}

        {!isLoading && bookings?.length === 0 && (
             <div className="text-center py-10">
                <h2 className="text-xl font-bold">No Past Bookings</h2>
                <p className="text-muted-foreground">You have no completed bookings to rate yet.</p>
            </div>
        )}

        {!isLoading && error && <p className="text-destructive text-center">Error loading ratings.</p>}

      </main>
    </div>
  );
}
