'use client';

import { CheckCircle2, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { translations } = useLanguage();
    const { clearCart } = useCart();

    // Clear cart on component mount
    useEffect(() => {
        clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col justify-center items-center text-center p-6">
            <header className="absolute top-0 left-0 right-0 p-4">
                <div className="flex justify-end">
                    <Button variant="ghost" className="rounded-full" onClick={() => router.push('/')}>Done</Button>
                </div>
            </header>

            <main className="flex flex-col items-center">
                <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
                <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
                <p className="text-muted-foreground max-w-sm mb-8">
                    Your booking has been confirmed. You can check the status of your booking in the 'My Bookings' section.
                </p>
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={() => router.push('/my-plans')}>
                        View Bookings
                    </Button>
                    <Button className="w-full" onClick={() => router.push('/')}>
                        Continue Shopping
                    </Button>
                </div>
            </main>
            
            <footer className="absolute bottom-0 left-0 right-0 p-6">
                 <Button variant="outline" className="w-full h-14" onClick={() => router.push('/')}>
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                </Button>
            </footer>
        </div>
    )
}
