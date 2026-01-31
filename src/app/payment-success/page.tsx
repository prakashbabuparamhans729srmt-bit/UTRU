
'use client';

import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { translations } = useLanguage();
    
    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
                <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
                <h1 className="text-3xl font-bold mb-2">{translations.paymentSuccess.title}</h1>
                <p className="text-muted-foreground max-w-sm mb-8">
                    {translations.paymentSuccess.subtitle}
                </p>
            </main>
            
            <footer className="p-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="w-full h-12" onClick={() => router.push('/my-plans')}>
                        {translations.paymentSuccess.viewBookings}
                    </Button>
                    <Button className="w-full h-12" onClick={() => router.push('/')}>
                        {translations.paymentSuccess.continueShopping}
                    </Button>
                </div>
            </footer>
        </div>
    )
}
