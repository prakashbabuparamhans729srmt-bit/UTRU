
'use client';

import { ChevronLeft, Share2, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';

export default function ReferPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const { toast } = useToast();
  const { user } = useUser();

  const referralCode = user ? user.uid.substring(0, 8).toUpperCase() : 'LOGIN123';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: translations.toasts.copied,
      description: translations.toasts.copiedDesc,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: translations.refer.title,
        text: `${translations.refer.subtitle} Use my code: ${referralCode}`,
        url: window.location.origin,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.refer.title}</h1>
      </header>
      <main className="p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Share2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{translations.refer.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          {translations.refer.subtitle}
        </p>

        <div className="bg-card border-2 border-dashed border-primary/50 rounded-lg p-4 mb-8 w-full max-w-sm">
            <p className="text-sm text-muted-foreground mb-1">{translations.refer.code}</p>
            <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-bold tracking-widest text-primary">{referralCode}</p>
                <Button onClick={handleCopy} size="icon" variant="ghost">
                    <Copy className="w-6 h-6" />
                </Button>
            </div>
        </div>

        <Button onClick={handleShare} className="w-full max-w-sm h-12 text-lg">
          <Share2 className="w-5 h-5 mr-2" />
          {translations.refer.share}
        </Button>
      </main>
    </div>
  );
}
