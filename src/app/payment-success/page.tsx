
'use client';

import { Suspense } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/firebase';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { translations } = useLanguage();
    const { user } = useUser();

    const amount = searchParams.get('amount');
    const bookingId = searchParams.get('bookingId');
    const method = searchParams.get('method');
    
    const isCod = method === 'cod';

    const formattedAmount = amount 
        ? parseFloat(amount).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        : '---';

    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-foreground min-h-screen">
            <header className="p-4 flex items-center gap-4 bg-background/80 backdrop-blur-sm z-10">
                <Button onClick={() => router.push('/')} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">{isCod ? translations.paymentSuccess.orderPlaced : translations.paymentSuccess.receiptDetails}</h1>
            </header>

            <main className="p-4">
                <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-lg max-w-md mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                            <Check className="w-16 h-16 text-primary-foreground" />
                        </div>
                        <p className="text-muted-foreground">{isCod ? translations.paymentSuccess.orderPlaced : translations.paymentSuccess.transactionSuccess}</p>
                        <p className="text-4xl font-bold mt-2">{formattedAmount}</p>
                         {isCod && <p className="text-sm text-muted-foreground mt-1">{translations.paymentSuccess.toBePaidOnDelivery}</p>}
                    </div>

                    <Separator className="my-6 bg-border" />

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.paymentSuccess.status}</span>
                            <span className="text-primary font-semibold">{translations.paymentSuccess.placed}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.paymentSuccess.bookingId}</span>
                            <span className="font-mono">#{bookingId || 'N/A'}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">{translations.paymentSuccess.paymentMethod}</span>
                            <span className="font-semibold">{isCod ? translations.paymentSuccess.payOnDelivery : translations.paymentSuccess.wallet}</span>
                        </div>
                    </div>

                    <Separator className="my-6 bg-border" />

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">{translations.paymentSuccess.recipient}</p>
                        <div className="flex items-center justify-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'}/>
                                <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold">{user?.displayName || translations.paymentSuccess.valuedCustomer}</h3>
                                {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-md mx-auto mt-8 flex flex-col gap-4">
                     <Button variant="outline" className="w-full h-12" onClick={() => router.push('/my-plans')}>
                        {translations.paymentSuccess.viewBookings}
                    </Button>
                    <Button className="w-full h-12" onClick={() => router.push('/')}>
                        {translations.paymentSuccess.continueShopping}
                    </Button>
                </div>
            </main>
        </div>
    )
}


export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center h-screen'>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
