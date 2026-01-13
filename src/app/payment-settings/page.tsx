
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7.5H21.5V16.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.5 11.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 13.5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SliceUPIIcon = () => (
    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
        <div className="w-3 h-3 bg-white transform -skew-x-12"></div>
    </div>
);

const PluxeeIcon = () => (
  <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-400">
    <span className="text-xs font-bold text-blue-600">pluxee</span>
  </div>
);

const NetbankingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L3 7.5V9.5H21V7.5L12 3Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4.5 18.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5 18.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 18.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.5 18.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20.5 18.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 19.5H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CashOnDeliveryIcon = () => (
    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-200 border-2 border-blue-500">
        <span className="font-bold text-blue-600 text-sm">₹</span>
    </div>
);

const GooglePayIcon = () => (
  <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-400 text-xs">
    <span className="font-bold text-blue-600">G</span>
    <span className="font-bold text-red-500">P</span>
    <span className="font-bold text-yellow-500">a</span>
    <span className="font-bold text-green-500">y</span>
  </div>
);

const AmazonPayIcon = () => (
    <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-800 dark:border-gray-300">
        <span className="font-bold text-gray-800 dark:text-gray-300 text-xs">pay</span>
    </div>
);


export default function PaymentSettingsPage() {
  const router = useRouter();
  const { translations } = useLanguage();

  const renderPaymentItem = (icon: React.ReactNode, text: string, action?: 'button' | 'chevron', buttonText?: string) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            {icon}
        </div>
        <span className="font-medium">{text}</span>
      </div>
      {action === 'chevron' && <ChevronRight className="w-6 h-6 text-muted-foreground" />}
      {action === 'button' && <Button className="bg-primary text-primary-foreground rounded-full px-4 py-1 h-auto text-sm">{buttonText}</Button>}
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.paymentSettings.title}</h1>
      </header>
      
      <main className="p-4 space-y-4">
        <div className="bg-card rounded-lg border">
            <div className="px-4">
                <h2 className="text-muted-foreground pt-4 text-sm font-semibold">{translations.paymentSettings.cards}</h2>
                {renderPaymentItem(<CreditCardIcon />, translations.paymentSettings.creditDebit)}
                <div className="border-t"></div>
                {renderPaymentItem(<SliceUPIIcon />, translations.paymentSettings.sliceUpi, 'chevron')}
            </div>
        </div>
        
        <div className="bg-card rounded-lg border">
            <div className="px-4">
                <h2 className="text-muted-foreground pt-4 text-sm font-semibold">Food Wallets</h2>
                {renderPaymentItem(<PluxeeIcon />, translations.paymentSettings.pluxee, 'chevron')}
            </div>
        </div>

        <div className="bg-card rounded-lg border">
            <div className="px-4">
                <h2 className="text-muted-foreground pt-4 text-sm font-semibold">{translations.paymentSettings.netbanking}</h2>
                {renderPaymentItem(<NetbankingIcon />, translations.paymentSettings.netbanking, 'button', translations.paymentSettings.add)}
            </div>
        </div>
        
        <div className="bg-card rounded-lg border">
            <div className="px-4">
                <h2 className="text-muted-foreground pt-4 text-sm font-semibold">{translations.paymentSettings.payOnDelivery}</h2>
                {renderPaymentItem(<CashOnDeliveryIcon />, translations.paymentSettings.payOnDelivery, 'button', translations.paymentSettings.add)}
            </div>
        </div>

        <div className="bg-card rounded-lg border">
            <div className="px-4">
                <h2 className="text-muted-foreground pt-4 text-sm font-semibold">{translations.paymentSettings.wallets}</h2>
                {renderPaymentItem(<GooglePayIcon />, translations.paymentSettings.googlePay, 'button', translations.paymentSettings.link)}
                <div className="border-t"></div>
                {renderPaymentItem(<AmazonPayIcon />, translations.paymentSettings.amazonPay, 'button', translations.paymentSettings.link)}
            </div>
        </div>
      </main>
    </div>
  );
}
