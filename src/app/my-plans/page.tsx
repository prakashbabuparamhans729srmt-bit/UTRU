'use client';

import { ChevronLeft, FileText, CalendarCheck, History, Star } from 'lucide-react';
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
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

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
  discount?: number;
  couponCode?: string;
  status?: 'Placed' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  rating?: number;
  review?: string;
}

function BookingCard({ booking }: { booking: Booking }) {
    const router = useRouter();
    const getStatusVariant = (status?: string): "default" | "secondary" | "outline" | "destructive" => {
        switch (status) {
            case 'Placed':
            case 'Confirmed':
                return 'default';
            case 'In Progress':
                return 'secondary';
            case 'Completed':
                return 'outline'; // This will have a border, which can signify completion
            case 'Cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    }

    return (
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm">
                        <Link href={`/booking/${booking.id}`} className="hover:underline">
                            Booking ID: {booking.id.substring(0, 7).toUpperCase()}
                        </Link>
                    </h3>
                    {booking.status && 
                        <Badge 
                            variant={getStatusVariant(booking.status)}
                            className={cn(booking.status === 'Completed' && 'border-green-500 text-green-600')}
                        >
                            {booking.status}
                        </Badge>
                    }
                </div>
                 <div>
                  {booking.discount && booking.discount > 0 ? (
                      <div className="text-right">
                          <p className="text-base font-bold">₹{booking.finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                          <p className="text-xs text-green-600">You saved ₹{booking.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                  ) : (
                      <p className="text-base font-bold">₹{booking.finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  )}
                </div>
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
                            <Link href={`/service/${item.id}`}>
                                <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md aspect-square object-cover" />
                            </Link>
                            <div>
                                <Link href={`/service/${item.id}`}>
                                    <p className="font-semibold text-sm hover:text-primary transition-colors">{item.name}</p>
                                </Link>
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
            {booking.status === 'Completed' && !booking.rating && (
                <>
                    <Separator className="my-4" />
                    <Button 
                        variant="outline" 
                        className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                        onClick={() => router.push(`/booking/${booking.id}`)}
                    >
                        <Star className="w-4 h-4 mr-2" />
                        Rate Your Experience
                    </Button>
                </>
            )}
        </Card>
    );
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

  const { upcomingBookings, pastBookings } = useMemo(() => {
    if (!bookings) return { upcomingBookings: [], pastBookings: [] };
    
    const upcoming: Booking[] = [];
    const past: Booking[] = [];

    bookings.forEach(booking => {
      if (booking.status === 'Completed' || booking.status === 'Cancelled') {
        past.push(booking);
      } else {
        // All other statuses (including undefined for old data) are considered active/upcoming
        upcoming.push(booking);
      }
    });

    return { upcomingBookings, pastBookings };
  }, [bookings]);


  const isLoading = userLoading || bookingsLoading;

  if (!userLoading && !user) {
    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">{translations.myPlans.title}</h1>
            </header>
            <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
                 <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Please Log In</h2>
                <p className="text-muted-foreground mb-4">You need to be logged in to view your bookings.</p>
                <Link href="/phone-login">
                    <Button>Login</Button>
                </Link>
            </main>
        </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.myPlans.title}</h1>
      </header>
      <main className="flex-grow p-4 space-y-6">
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
            <>
                {upcomingBookings.length > 0 && (
                    <section>
                        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-muted-foreground">
                            <CalendarCheck className="w-5 h-5" />
                            {translations.myPlans.activePlans}
                        </h2>
                        <div className="space-y-4">
                            {upcomingBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                        </div>
                    </section>
                )}

                {pastBookings.length > 0 && (
                     <section>
                        <h2 className="flex items-center gap-2 text-lg font-semibold my-6 text-muted-foreground">
                            <History className="w-5 h-5" />
                            {translations.myPlans.pastBookings}
                        </h2>
                        <div className="space-y-4">
                            {pastBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                        </div>
                    </section>
                )}

                {pastBookings.length === 0 && upcomingBookings.length > 0 && (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">{translations.myPlans.noPastBookings}</p>
                    </div>
                )}

                {upcomingBookings.length === 0 && pastBookings.length > 0 && (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">{translations.myPlans.noActivePlans}</p>
                    </div>
                )}
            </>
        )}

        {!isLoading && (!bookings || bookings.length === 0) && (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-6 h-[60vh]">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-1">{translations.myPlans.noBookingsYet}</h2>
                <p className="text-muted-foreground mb-6">{translations.myPlans.browseServicesPrompt}</p>
                <Link href="/">
                    <Button>{translations.cart.browseServices}</Button>
                </Link>
            </div>
        )}

        {!isLoading && error && <p className="text-destructive text-center p-4">Error loading bookings. Please try again later.</p>}
      </main>
    </div>
  );
}
