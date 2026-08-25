'use client';

import { Suspense } from 'react';
import { Check, ChevronLeft, Calendar, FileText, ShoppingBag } from 'lucide-react';
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
        <div className="bg-gray-100 dark:bg-gray-900 text-foreground min-h-screen flex flex-col">
            <header className="p-4 flex items-center gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <Button onClick={() => router.push('/')} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">{isCod ? translations.paymentSuccess.orderPlaced : translations.paymentSuccess.receiptDetails}</h1>
            </header>

            <main className="p-4 flex-grow overflow-y-auto pb-10">
                <div className="bg-card text-card-foreground rounded-[2rem] p-8 shadow-xl max-w-md mx-auto border border-primary/10 relative overflow-hidden">
                    {/* Decoration Circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-primary/20">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                                <Check className="w-10 h-10 text-primary-foreground" />
                            </div>
                        </div>
                        <h2 className="text-xl font-black mb-1">{isCod ? translations.paymentSuccess.orderPlaced : "Payment Successful!"}</h2>
                        <p className="text-muted-foreground text-sm px-4">{isCod ? translations.paymentSuccess.orderPlaced : translations.paymentSuccess.transactionSuccess}</p>
                        <p className="text-5xl font-black mt-6 tracking-tighter">{formattedAmount}</p>
                        {isCod && <p className="text-xs font-bold text-primary mt-2 uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{translations.paymentSuccess.toBePaidOnDelivery}</p>}
                    </div>

                    <Separator className="my-8 opacity-50" />

                    <div className="space-y-4 text-sm relative z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar size={16} />
                                <span>Status</span>
                            </div>
                            <span className="text-primary font-black uppercase text-xs bg-primary/10 px-2 py-0.5 rounded">{translations.paymentSuccess.placed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <FileText size={16} />
                                <span>{translations.paymentSuccess.bookingId}</span>
                            </div>
                            <span className="font-mono font-bold bg-muted px-2 py-0.5 rounded text-xs">#{bookingId || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <ShoppingBag size={16} />
                                <span>{translations.paymentSuccess.paymentMethod}</span>
                            </div>
                            <span className="font-bold">{isCod ? translations.paymentSuccess.payOnDelivery : translations.paymentSuccess.wallet}</span>
                        </div>
                    </div>

                    <Separator className="my-8 opacity-50" />

                    <div className="text-center relative z-10">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">{translations.paymentSuccess.recipient}</p>
                        <div className="flex items-center justify-center gap-4 bg-muted/30 p-4 rounded-2xl">
                            <Avatar className="w-12 h-12 border-2 border-primary/20">
                                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'}/>
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <h3 className="text-base font-black leading-none mb-1">{user?.displayName || translations.paymentSuccess.valuedCustomer}</h3>
                                {user?.email && <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-md mx-auto mt-8 flex flex-col gap-3 px-2">
                     <Button variant="default" className="w-full h-14 rounded-2xl text-lg font-black shadow-lg shadow-primary/20" onClick={() => router.push('/my-plans')}>
                        {translations.paymentSuccess.viewBookings}
                    </Button>
                    <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-2" onClick={() => router.push('/')}>
                        {translations.paymentSuccess.continueShopping}
                    </Button>
                </div>
            </main>
        </div>
    )
}


export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
        <div className='flex flex-col items-center justify-center h-screen bg-background gap-4'>
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-bold text-muted-foreground">Finalizing your order...</p>
        </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
