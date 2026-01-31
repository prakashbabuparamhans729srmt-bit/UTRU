'use client';

import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';
import { addressTypes } from '@/lib/navigation';
import { useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useCart, type Address } from '@/context/CartContext';


export default function NewAddressPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const seaImage = PlaceHolderImages.find((img) => img.id === 'new-address-sea');
  const treesImage = PlaceHolderImages.find((img) => img.id === 'new-address-trees');

  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { setDeliveryAddress } = useCart();
  
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [floor, setFloor] = useState('');
  const [landmark, setLandmark] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveAddress = () => {
    if (!name || !mobile || !fullAddress) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in your name, mobile, and address.'
      });
      return;
    }
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Not logged in',
        description: 'You must be logged in to save an address.'
      });
      router.push('/phone-login');
      return;
    }

    setIsLoading(true);

    const addressData = {
      name,
      mobile,
      fullAddress,
      floor,
      landmark,
      type: addressType as 'Home' | 'Work' | 'Hotel' | 'Other',
    };

    const addressCollection = collection(firestore, 'users', user.uid, 'addresses');
    
    addDoc(addressCollection, addressData)
      .then((docRef) => {
        const newAddressWithId: Address = {
            ...addressData,
            id: docRef.id
        }
        setDeliveryAddress(newAddressWithId);
        toast({ title: 'Address Saved!', description: 'Your new address has been saved and selected for this order.' });
        router.push('/checkout');
      })
      .catch((serverError) => {
          const permissionError = new FirestorePermissionError({
            path: `users/${user.uid}/addresses`,
            operation: 'create',
            requestResourceData: addressData,
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({
              variant: 'destructive',
              title: 'Save Failed',
              description: 'Could not save your address. Please try again.',
          });
      })
      .finally(() => {
          setIsLoading(false);
      });
  };


  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.newAddress.title}</h1>
      </header>

      <main className="p-4 pb-24">
        <h2 className="text-xl font-bold mb-4">{translations.newAddress.completeAddress}</h2>

        <section className="mb-6">
          <h3 className="font-semibold mb-2">{translations.newAddress.orderingFor}</h3>
          <RadioGroup defaultValue="myself" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="myself" id="myself" />
              <Label htmlFor="myself">{translations.newAddress.myself}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="someone" id="someone" />
              <Label htmlFor="someone">{translations.newAddress.someoneElse}</Label>
            </div>
          </RadioGroup>
        </section>

        <section className="mb-6">
            <div className="rounded-xl overflow-hidden shadow-lg border p-2">
                <div className="flex gap-2">
                    {seaImage && (
                        <Image
                            src={seaImage.imageUrl}
                            alt={seaImage.description}
                            width={200}
                            height={120}
                            className="rounded-lg object-cover w-1/2"
                            data-ai-hint={seaImage.imageHint}
                        />
                    )}
                    {treesImage && (
                        <Image
                            src={treesImage.imageUrl}
                            alt={treesImage.description}
                            width={200}
                            height={120}
                            className="rounded-lg object-cover w-1/2"
                            data-ai-hint={treesImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </section>

        <section className="mb-8">
           <RadioGroup value={addressType} onValueChange={(value) => setAddressType(value)} className="flex justify-around">
            {addressTypes.map(({ icon: Icon, labelKey }) => {
              const typeLabel = translations.newAddress[labelKey as keyof typeof translations.newAddress];
              const typeValue = labelKey.charAt(0).toUpperCase() + labelKey.slice(1);
              return (
                <Label key={labelKey} htmlFor={labelKey} className="flex flex-col items-center gap-2 cursor-pointer">
                  <RadioGroupItem value={typeValue} id={labelKey} className="sr-only" />
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${addressType === typeValue ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border hover:bg-primary/20 hover:text-primary'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm">{typeLabel}</span>
                </Label>
              )
            })}
          </RadioGroup>
        </section>

        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{translations.newAddress.name}</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">{translations.newAddress.mobile}</Label>
            <Input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address-line">{translations.newAddress.flatHouse}</Label>
            <Input id="address-line" type="text" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="floor">{translations.newAddress.floor}</Label>
            <Input id="floor" type="text" value={floor} onChange={(e) => setFloor(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="landmark">{translations.newAddress.landmark}</Label>
            <Input id="landmark" type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="bg-muted border-border" />
          </div>
        </div>
      </main>
      <footer className='fixed bottom-0 left-0 right-0 p-4 bg-background border-t'>
         <Button onClick={handleSaveAddress} disabled={isLoading} className="w-full bg-primary text-primary-foreground rounded-full h-14 text-lg hover:bg-primary/90">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : translations.newAddress.save}
          </Button>
      </footer>
    </div>
  );
}
