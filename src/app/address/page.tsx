
'use client';

import { ChevronLeft, User, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { useCart, type Address } from '@/context/CartContext';
import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { addressTypes } from '@/lib/navigation';


function AddressCard({ address, onSelect, isSelected }: { address: Address, onSelect: (address: Address) => void, isSelected: boolean }) {
  const Icon = addressTypes.find(t => t.labelKey.toLowerCase() === address.type.toLowerCase())?.icon || User;
  return (
    <Card className={cn("p-4", isSelected && "border-primary ring-2 ring-primary")}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold">{address.name} <span className="text-xs font-normal text-muted-foreground ml-2">({address.type})</span></p>
                <p className="text-sm text-muted-foreground">{address.fullAddress}</p>
                <p className="text-sm text-muted-foreground">{address.landmark}</p>
                <p className="text-sm text-muted-foreground mt-1 font-semibold">{address.mobile}</p>
              </div>
            </div>
            <Button variant={isSelected ? "default" : "outline"} className="rounded-full border-primary text-primary" onClick={() => onSelect(address)}>
              {isSelected ? "Selected" : "Select"}
            </Button>
        </div>
    </Card>
  )
}

export default function AddressPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { deliveryAddress, setDeliveryAddress } = useCart();

  const addressesQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'addresses');
  }, [user, firestore]);

  const { data: addresses, loading: addressesLoading } = useCollection<Address>(addressesQuery);

  const handleSelectAddress = (address: Address) => {
      setDeliveryAddress(address);
      router.back();
  };
  
  const isLoading = userLoading || addressesLoading;

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-card flex items-center gap-4 sticky top-0 z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.address.title}</h1>
      </header>

      <main className="flex-grow p-4 space-y-4">
        {isLoading && Array.from({length: 2}).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className='space-y-2'>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </Card>
        ))}

        {!isLoading && addresses && addresses.length > 0 && (
          addresses.map(address => (
            <AddressCard 
              key={address.id} 
              address={address} 
              onSelect={handleSelectAddress}
              isSelected={deliveryAddress?.id === address.id}
            />
          ))
        )}

        {!isLoading && (!addresses || addresses.length === 0) && (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-10">
                <h2 className="text-2xl font-bold mb-2">{translations.address.nothingHere}</h2>
                <p className="text-muted-foreground mb-6">
                {translations.address.deliveryMessage}
                </p>
            </div>
        )}
      </main>

      <footer className="bg-card p-4 rounded-t-3xl border-t mt-auto">
        <Button 
          className="w-full h-12 text-base"
          onClick={() => router.push('/new-address')}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          {translations.address.addNew}
        </Button>
      </footer>
    </div>
  );
}
