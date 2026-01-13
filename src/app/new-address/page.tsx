
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';
import { addressTypes } from '@/lib/navigation';


export default function NewAddressPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const seaImage = PlaceHolderImages.find((img) => img.id === 'new-address-sea');
  const treesImage = PlaceHolderImages.find((img) => img.id === 'new-address-trees');

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.newAddress.title}</h1>
      </header>

      <main className="p-4">
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
          <div className="flex justify-around">
            {addressTypes.map(({ icon: Icon, labelKey }) => (
              <div key={labelKey} className="flex flex-col items-center gap-2">
                <Button size="icon" variant="outline" className="w-14 h-14 rounded-full bg-muted text-muted-foreground border-border hover:bg-primary/20 hover:text-primary">
                  <Icon className="w-6 h-6" />
                </Button>
                <span className="text-sm">{translations.newAddress[labelKey as keyof typeof translations.newAddress]}</span>
              </div>
            ))}
          </div>
        </section>

        <form className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{translations.newAddress.name}</Label>
            <Input id="name" type="text" className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">{translations.newAddress.mobile}</Label>
            <Input id="mobile" type="tel" className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address-line">{translations.newAddress.flatHouse}</Label>
            <Input id="address-line" type="text" className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="floor">{translations.newAddress.floor}</Label>
            <Input id="floor" type="text" className="bg-muted border-border" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="landmark">{translations.newAddress.landmark}</Label>
            <Input id="landmark" type="text" className="bg-muted border-border" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground rounded-full h-14 text-lg hover:bg-primary/90 mt-8">
            {translations.newAddress.save}
          </Button>
        </form>
      </main>
    </div>
  );
}
