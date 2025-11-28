
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VerifyPhonePage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="bg-black text-white w-full max-w-md mx-4 rounded-[40px] p-8 shadow-2xl flex flex-col h-[70vh] my-auto">
        <div className="flex items-center justify-center relative mb-8">
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-black text-white hover:bg-gray-700"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-white rounded-full mb-2"></div>
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-wider">utru.in</span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center text-left">
          <h1 className="text-4xl font-bold mb-2">Verification Code</h1>
          <p className="text-gray-400 mb-8">
            Enter the 4 digit code that you received at: <br />
            <span className="text-white font-semibold">Phone number</span> <a href="#" className="text-white underline">change number?</a>
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Input
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-bold bg-white text-black rounded-full border-2 border-gray-500"
            />
            <Input
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-bold bg-white text-black rounded-full border-2 border-gray-500"
            />
            <Input
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-bold bg-white text-black rounded-full border-2 border-gray-500"
            />
            <Input
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-bold bg-white text-black rounded-full border-2 border-gray-500"
            />
          </div>

          <Button className="w-full bg-white text-black rounded-full h-14 text-lg font-semibold hover:bg-gray-200">
            Verify Code
          </Button>
        </div>
      </div>
    </div>
  );
}

