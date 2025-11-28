
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PhoneLoginPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-black text-white w-full max-w-md mx-4 rounded-[40px] p-8 shadow-2xl flex flex-col h-[70vh] my-auto">
        <div className="flex items-start justify-between">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-12 h-12 border border-gray-700 hover:bg-gray-800"
            onClick={() => router.back()}
          >
            <Play className="w-6 h-6 rotate-180" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-white rounded-full mb-2"></div>
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-wider">UTRU</span>
              <div className="w-4 h-4 border-2 border-white ml-1"></div>
            </div>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="flex-grow flex flex-col justify-center text-left mt-8">
          <h1 className="text-4xl font-bold mb-2">Login with Phone</h1>
          <p className="text-gray-400 mb-8">
            Input your number below in order to login.
          </p>

          <div className="relative mb-6">
            <Input
              type="tel"
              placeholder="Your phone number..."
              className="bg-white text-black rounded-full h-14 pl-6 pr-12 text-base"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Button className="w-full bg-white text-black rounded-full h-14 text-lg font-semibold hover:bg-gray-200">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
