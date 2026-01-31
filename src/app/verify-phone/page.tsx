'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function VerifyPhonePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { translations } = useLanguage();
  const { verifyOtp, isPending, error, confirmationResult, phoneNumber } = useAuthUI();
  const { items: cartItems } = useCart();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // If there's no confirmationResult, the user shouldn't be on this page.
    if (!confirmationResult && !isPending) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: 'Please start the login process again.',
      });
      router.replace('/phone-login');
    }
  }, [confirmationResult, router, toast, isPending]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    if (/[^0-9]/.test(paste) || paste.length !== 6) return;

    const newOtp = paste.split('');
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
        toast({ variant: 'destructive', title: 'Invalid OTP', description: 'Please enter all 6 digits.'});
        return;
    }
    const success = await verifyOtp(otpCode);
    if (success) {
      toast({ title: 'Success!', description: 'You have been logged in successfully.' });
      if (cartItems.length > 0) {
        router.replace('/checkout');
      } else {
        router.replace('/');
      }
    } else {
      toast({ variant: 'destructive', title: 'Verification Failed', description: error || 'The OTP is incorrect. Please try again.' });
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

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
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-white rounded-full mb-2"></div>
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-wider">utru.in</span>
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center text-left">
          <h1 className="text-4xl font-bold mb-2">{translations.verifyPhone.title}</h1>
          <p className="text-gray-400 mb-8">
            {translations.verifyPhone.subtitle} <br />
            <span className="text-white font-semibold">{phoneNumber || 'your phone number'}</span> 
            <button onClick={() => router.push('/phone-login')} className="text-white underline ml-2">{translations.verifyPhone.changeNumber}</button>
          </p>

          <div className="flex justify-center gap-2 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold bg-white text-black rounded-full border-2 border-gray-500 aspect-square"
                disabled={isPending}
              />
            ))}
          </div>

          <Button 
            className="w-full bg-white text-black rounded-full h-14 text-lg font-semibold hover:bg-gray-200"
            onClick={handleVerify}
            disabled={isPending || otp.join('').length !== 6}
          >
            {isPending ? <Loader2 className="animate-spin"/> : translations.verifyPhone.verifyCode}
          </Button>
        </div>
      </div>
    </div>
  );
}
