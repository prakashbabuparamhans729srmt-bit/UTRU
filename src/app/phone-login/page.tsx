
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Play, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef } from 'react';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useToast } from '@/hooks/use-toast';

export default function PhoneLoginPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signInWithPhoneNumber, isPending, error } = useAuthUI();
  const { toast } = useToast();
  const recaptchaContainerRef = useRef<HTMLButtonElement>(null);


  const handleContinue = async () => {
    // Ensure the number starts with +91
    let formattedPhoneNumber = phoneNumber.trim();
    if (!formattedPhoneNumber.startsWith('+')) {
        if (formattedPhoneNumber.length === 10 && /^[6-9]/.test(formattedPhoneNumber)) {
            formattedPhoneNumber = `+91${formattedPhoneNumber}`;
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid Phone Number',
                description: 'Please enter a valid 10-digit Indian mobile number.',
            });
            return;
        }
    }

    if (!/^\+[1-9]\d{1,14}$/.test(formattedPhoneNumber)) {
        toast({
            variant: 'destructive',
            title: 'Invalid Phone Number',
            description: 'Please enter a valid phone number with country code (e.g., +919876543210).',
        });
        return;
    }
    
    if (!recaptchaContainerRef.current) return;

    const success = await signInWithPhoneNumber(formattedPhoneNumber, recaptchaContainerRef.current);
    if (success) {
      router.push('/verify-phone');
    } else {
        toast({
            variant: 'destructive',
            title: 'Failed to send OTP',
            description: error || 'An unexpected error occurred. Please try again.',
        });
    }
  };

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
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-black rounded-full" />
            </div>
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-wider">UTRU</span>
            </div>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="flex-grow flex flex-col justify-center text-left mt-8">
          <h1 className="text-4xl font-bold mb-2">{translations.phoneLogin.title}</h1>
          <p className="text-gray-400 mb-8">
            {translations.phoneLogin.subtitle}
          </p>

          <div className="relative mb-6">
            <Input
              type="tel"
              placeholder="+919876543210"
              className="bg-white text-black rounded-full h-14 pl-6 pr-12 text-base"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isPending}
            />
            {phoneNumber && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 text-gray-500 hover:text-black"
                onClick={() => setPhoneNumber('')}
                disabled={isPending}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <Button 
            ref={recaptchaContainerRef}
            className="w-full bg-white text-black rounded-full h-14 text-lg font-semibold hover:bg-gray-200"
            onClick={handleContinue}
            disabled={isPending || !phoneNumber}
          >
            {isPending ? <Loader2 className="animate-spin" /> : translations.phoneLogin.continue}
          </Button>
        </div>
      </div>
    </div>
  );
}
