
'use client';

import { ChevronLeft, Home, Building, Hotel, MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';

export default function NewAddressPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const seaImage = PlaceHolderImages.find((img) => img.id === 'new-address-sea');
  const treesImage = PlaceHolderImages.find((img) => img.id === 'new-address-trees');

  const addressTypes = [
    { icon: Home, label: translations.newAddress.home },
    { icon: Building, label: translations.newAddress.work },
    { icon: Hotel, label: translations.newAddress.hotel },
    { icon: MoreHorizontal, label: translations.newAddress.other },
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-white z-10 border-b">
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
            {addressTypes.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Button size="icon" variant="outline" className="w-14 h-14 rounded-full bg-black text-white border-gray-700">
                  <Icon className="w-6 h-6" />
                </Button>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <form className="space-y-6">
          <div className="relative">
            <Label htmlFor="name" className="text-gray-500">{translations.newAddress.name}</Label>
            <Input id="name" type="text" className="bg-gray-100 border-none rounded-xl h-12 pr-10" />
            <Button size="icon" variant="ghost" className="absolute right-2 top-7 text-gray-500">
                <X className="w-4 h-4"/>
            </Button>
          </div>
          <div className="relative">
            <Label htmlFor="mobile" className="text-gray-500">{translations.newAddress.mobile}</Label>
            <Input id="mobile" type="tel" className="bg-gray-100 border-none rounded-xl h-12 pr-10" />
            <Button size="icon" variant="ghost" className="absolute right-2 top-7 text-gray-500">
                <X className="w-4 h-4"/>
            </Button>
          </div>
          <div className="relative">
            <Label htmlFor="address-line" className="text-gray-500">{translations.newAddress.flatHouse}</Label>
            <Input id="address-line" type="text" className="bg-gray-100 border-none rounded-xl h-12 pr-10" />
            <Button size="icon" variant="ghost" className="absolute right-2 top-7 text-gray-500">
                <X className="w-4 h-4"/>
            </Button>
          </div>
          <div className="relative">
            <Label htmlFor="floor" className="text-gray-500">{translations.newAddress.floor}</Label>
            <Input id="floor" type="text" className="bg-gray-100 border-none rounded-xl h-12 pr-10" />
             <Button size="icon" variant="ghost" className="absolute right-2 top-7 text-gray-500">
                <X className="w-4 h-4"/>
            </Button>
          </div>
          <div className="relative">
            <Label htmlFor="landmark" className="text-gray-500">{translations.newAddress.landmark}</Label>
            <Input id="landmark" type="text" className="bg-gray-100 border-none rounded-xl h-12 pr-10" />
          </div>
          <Button className="w-full bg-black text-white rounded-full h-14 text-lg hover:bg-gray-800 mt-8">
            {translations.newAddress.save}
          </Button>
        </form>
      </main>
    </div>
  );
}

    