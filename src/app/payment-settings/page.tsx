
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7.5H21.5V16.5H2.5V7.5Z" stroke="black" strokeWidth="1.5"/>
    <path d="M2.5 11.5H7.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 13.5H5.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SliceUPIIcon = () => (
    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
        <div className="w-4 h-4 bg-white transform -skew-x-12"></div>
    </div>
);

const PluxeeIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400">
    <span className="text-xs font-bold text-blue-600">pluxee</span>
  </div>
);

const NetbankingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L3 7.5V9.5H21V7.5L12 3Z" stroke="black" strokeWidth="1.5"/>
    <path d="M4.5 18.5V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8.5 18.5V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12.5 18.5V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16.5 18.5V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20.5 18.5V10.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 19.5H21.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CashOnDeliveryIcon = () => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-200 border-2 border-blue-500">
        <span className="font-bold text-blue-600 text-sm">₹</span>
    </div>
);

const GooglePayIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-400">
    <span className="font-bold text-blue-600">G</span>
    <span className="font-bold text-red-500">P</span>
    <span className="font-bold text-yellow-500">a</span>
    <span className="font-bold text-green-500">y</span>
  </div>
);

const AmazonPayIcon = () => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-800">
        <span className="font-bold text-gray-800">pay</span>
    </div>
);


export default function PaymentSettingsPage() {
  const router = useRouter();

  const renderPaymentItem = (icon: React.ReactNode, text: string, action?: 'button' | 'chevron', buttonText?: string) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <span className="font-medium text-black">{text}</span>
      </div>
      {action === 'chevron' && <ChevronRight className="w-6 h-6 text-gray-400" />}
      {action === 'button' && <Button className="bg-black text-white rounded-full px-4 py-1 h-auto text-sm">{buttonText}</Button>}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white">
        <header className="p-4 flex items-center gap-4 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold text-black">Payment setting</h1>
        </header>
      </div>
      <div className="bg-white mt-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Cards</h2>
            {renderPaymentItem(<CreditCardIcon />, 'Credit card / Devit card')}
            <div className="border-t border-gray-200"></div>
            {renderPaymentItem(<SliceUPIIcon />, 'slice UPI', 'chevron')}
        </div>
      </div>
       <div className="bg-white mt-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Cards</h2>
            {renderPaymentItem(<CreditCardIcon />, 'Credit card / Devit card')}
        </div>
      </div>
       <div className="bg-white mt-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Cards</h2>
            {renderPaymentItem(<CreditCardIcon />, 'Credit card / Devit card')}
             <div className="border-t border-gray-200"></div>
            {renderPaymentItem(<PluxeeIcon />, 'Pluxxee', 'chevron')}
        </div>
      </div>
      <div className="bg-white mt-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Netbanking</h2>
            {renderPaymentItem(<NetbankingIcon />, 'Netbanking', 'button', 'Add')}
        </div>
      </div>
       <div className="bg-white mt-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Pay on delivery</h2>
            {renderPaymentItem(<CashOnDeliveryIcon />, 'Cash on delivery', 'button', 'Add')}
        </div>
      </div>
      <div className="bg-white my-4">
        <div className="px-4">
            <h2 className="text-gray-500 pt-4">Wallets</h2>
            {renderPaymentItem(<GooglePayIcon />, 'Google Pay UPI', 'button', 'Link')}
            <div className="border-t border-gray-200"></div>
            {renderPaymentItem(<AmazonPayIcon />, 'Amazon pay balence', 'button', 'Link')}
        </div>
      </div>
    </div>
  );
}

