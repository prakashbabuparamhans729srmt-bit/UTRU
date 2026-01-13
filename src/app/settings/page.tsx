
'use client';

import { ChevronLeft, Check, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { settingsItems, settingsAdminLinks, settingsAppInstall, settingsLanguageLink } from '@/lib/navigation.tsx';


interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>;
    prompt(): Promise<void>;
}


export default function SettingsPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.settings.title}</h1>
      </header>

      <main className="p-4">
        <section className="mb-6">
          <h2 className="text-muted-foreground font-semibold mb-2 text-sm uppercase">{translations.settings.notificationsAndReminders}</h2>
          <div className="bg-card rounded-lg border p-4">
            <div className="space-y-4">
              {settingsItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium">{translations.settings[item.labelKey]}</span>
                  </div>
                   <div className="relative">
                    <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-primary"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6">
            <h3 className="text-muted-foreground font-semibold mb-2 text-sm uppercase">{translations.settings.language}</h3>
             <div className="bg-card rounded-lg border p-4">
                <Link href={settingsLanguageLink.href} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <settingsLanguageLink.icon className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium">{translations.settings.language}</span>
                  </div>
                    <div className='flex items-center gap-2 text-muted-foreground group-hover:text-primary'>
                        <span>{useLanguage().language}</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </Link>
             </div>
        </section>

        <section className="mb-6">
            <h3 className="text-muted-foreground font-semibold mb-2 text-sm uppercase">{translations.settings.admin}</h3>
            <div className="bg-card rounded-lg border p-4">
             {settingsAdminLinks.map((item, index) => (
                <Link href={item.href} key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-muted-foreground" />
                        <span className="font-medium">{translations.settings[item.labelKey]}</span>
                    </div>
                     <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </Link>
             ))}
             </div>
        </section>
        
        {installPrompt && (
          <section className="mb-6">
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <settingsAppInstall.icon className="w-6 h-6 text-muted-foreground" />
                      <span className="font-medium">{settingsAppInstall.label}</span>
                  </div>
                  <Button variant="outline" className="rounded-full" onClick={handleInstallClick}>
                      Install
                  </Button>
              </div>
            </div>
          </section>
        )}

        <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                <Check className="w-5 h-5"/>
                <span className="font-medium text-sm">{translations.settings.privacyAndData}</span>
            </div>
        </div>

      </main>
    </div>
  );
}
