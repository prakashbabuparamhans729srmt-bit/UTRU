
'use client';

import { ChevronLeft, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selectedDate: { seconds: number; nanoseconds: number; } | Date; // Firestore timestamp or Date
  selectedTime: string;
}

interface Booking {
  id: string;
  items: BookingItem[];
  finalTotal: number;
  placedAt: { seconds: number; nanoseconds: number; }; // Firestore timestamp
}

export default function MyPlansPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const bookingsQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'bookings'),
      orderBy('placedAt', 'desc')
    );
  }, [user, firestore]);

  const { data: bookings, loading: bookingsLoading, error } = useCollection<Booking>(bookingsQuery);

  const isLoading = userLoading || bookingsLoading;

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.myPlans.title}</h1>
      </header>
      <main className="flex-grow p-4 space-y-4">
        {isLoading && (
            Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-5 w-20 rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-48 rounded-md" />
                    <div className="flex gap-3 items-center pt-2">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                </Card>
            ))
        )}

        {!isLoading && bookings && bookings.length > 0 && (
            bookings.map(booking => (
                <Card key={booking.id} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-sm">Booking ID: {booking.id.substring(0, 7).toUpperCase()}</h3>
                        <p className="text-sm font-bold">₹{booking.finalTotal.toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                        {booking.placedAt ? format(new Date(booking.placedAt.seconds * 1000), 'PPP p') : 'Date not available'}
                    </p>
                    <div className="space-y-4">
                        {booking.items.map((item, index) => {
                            let itemDate;
                            if (item.selectedDate) {
                                itemDate = item.selectedDate instanceof Date ? item.selectedDate : new Date((item.selectedDate as any).seconds * 1000);
                            }
                            return (
                                <div key={index} className="flex gap-3 items-center">
                                    <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md aspect-square object-cover" />
                                    <div>
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        {itemDate && (
                                            <p className="text-xs text-muted-foreground">
                                                {format(itemDate, 'EEE, d MMM yyyy')} at {item.selectedTime}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            ))
        )}

        {!isLoading && (!bookings || bookings.length === 0) && (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-6 h-[60vh]">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-1">{translations.myPlans.activePlans}</h2>
                <p className="text-muted-foreground">{translations.myPlans.noActivePlans}</p>
            </div>
        )}

        {!isLoading && error && <p className="text-destructive text-center p-4">Error loading bookings. Please try again later.</p>}
      </main>
    </div>
  );
}
