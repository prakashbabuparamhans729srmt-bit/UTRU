'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { translations } = useLanguage();
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
      <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className='text-center mb-6'>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-gray-300">Sign in to continue</p>
        </div>
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-6 h-1 bg-white rounded-full"></div>
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
        </div>
        <Button
          className="w-full bg-black text-white rounded-full h-14 text-lg border-2 border-gray-500 hover:bg-gray-800 mb-4"
          onClick={() => router.push('/phone-login')}
        >
          <Phone className="mr-2 h-6 w-6" />
          {translations.login.continueWithPhone}
        </Button>
         <div className="text-center">
            <Link href="/entry" className="text-sm text-gray-400 hover:text-white underline">
              Explore as guest
            </Link>
        </div>
      </div>
    </div>
  );
}
