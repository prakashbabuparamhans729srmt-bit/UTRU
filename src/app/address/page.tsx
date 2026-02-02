'use client';

import { ChevronLeft, User, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { useCart, type Address } from '@/context/CartContext';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { addressTypes } from '@/lib/navigation';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


function AddressCard({ address, onSelect, isSelected, onDelete }: { address: Address, onSelect: (address: Address) => void, isSelected: boolean, onDelete: (addressId: string) => void }) {
  const Icon = addressTypes.find(t => t.labelKey.toLowerCase() === address.type.toLowerCase())?.icon || User;
  const { translations } = useLanguage();

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
            <div className="flex items-center gap-2">
                <Button variant={isSelected ? "default" : "outline"} className="rounded-full border-primary text-primary" onClick={() => onSelect(address)}>
                {isSelected ? "Selected" : "Select"}
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{(translations as any).dialogs.deleteTitle}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {(translations as any).dialogs.deleteAddressMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{(translations as any).dialogs.cancel}</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => onDelete(address.id)}>
                                {(translations as any).dialogs.confirm}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
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
  const { toast } = useToast();

  const addressesQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'addresses');
  }, [user, firestore]);

  const { data: addresses, loading: addressesLoading, error: addressesError } = useCollection<Address>(addressesQuery);

  const handleSelectAddress = (address: Address) => {
      setDeliveryAddress(address);
      router.back();
  };

  const handleDeleteAddress = (addressId: string) => {
    if (!user || !firestore) return;

    const addressRef = doc(firestore, 'users', user.uid, 'addresses', addressId);

    deleteDoc(addressRef)
      .then(() => {
        if (deliveryAddress?.id === addressId) {
          setDeliveryAddress(null);
        }
        toast({
          title: (translations as any).toasts.addressDeleted,
          description: (translations as any).toasts.addressDeletedDesc,
        });
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: addressRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: 'destructive',
          title: (translations as any).toasts.deleteAddressFailed,
          description: (translations as any).toasts.deleteAddressFailedDesc,
        });
      });
  };
  
  const isLoading = userLoading || addressesLoading;

  if (!userLoading && !user) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="p-4 bg-card flex items-center gap-4 sticky top-0 z-10 border-b">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.address.title}</h1>
        </header>
        <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-4">You need to be logged in to manage your addresses.</p>
            <Link href="/phone-login">
                <Button>Login</Button>
            </Link>
        </main>
      </div>
    );
  }

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

        {!isLoading && addressesError && (
            <div className="text-center text-destructive p-10">
                <h2 className="text-2xl font-bold">Error Loading Addresses</h2>
                <p>There was a problem fetching your saved addresses. Please try again later.</p>
            </div>
        )}

        {!isLoading && !addressesError && addresses && addresses.length > 0 && (
          addresses.map(address => (
            <AddressCard 
              key={address.id} 
              address={address} 
              onSelect={handleSelectAddress}
              isSelected={deliveryAddress?.id === address.id}
              onDelete={handleDeleteAddress}
            />
          ))
        )}

        {!isLoading && !addressesError && (!addresses || addresses.length === 0) && (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-10">
                <h2 className="text-2xl font-bold">{translations.address.nothingHere}</h2>
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
