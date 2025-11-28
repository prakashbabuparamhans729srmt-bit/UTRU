
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const coffeeImage = PlaceHolderImages.find((img) => img.id === 'login-coffee');

  return (
    <div className="relative h-screen w-full bg-black">
      {coffeeImage && (
        <Image
          src={coffeeImage.imageUrl}
          alt={coffeeImage.description}
          fill
          className="object-cover opacity-80"
          data-ai-hint={coffeeImage.imageHint}
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-6 h-1 bg-white rounded-full"></div>
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
        </div>
        <Button
          className="w-full bg-black text-white rounded-full h-14 text-lg border-2 border-gray-500 hover:bg-gray-800"
          onClick={() => router.push('/phone-login')}
        >
          <Phone className="mr-2 h-6 w-6" />
          Continue with Phone
        </Button>
      </div>
    </div>
  );
}
