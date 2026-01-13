
'use client';

import { ChevronLeft, Check } from 'lucide-react';
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
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-card text-card-foreground rounded-b-[2.5rem] flex-grow pb-8">
        <header className="p-4 flex items-center gap-4">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.settings.title}</h1>
        </header>

        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-1">{translations.settings.orderMessages}</h2>
            <p className="text-muted-foreground text-sm">
              {translations.settings.orderMessagesDescription}
            </p>
          </section>

          <hr className="mb-8" />
          
          <section className="mb-8">
            <h3 className="text-lg font-medium mb-6">{translations.settings.language}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <settingsLanguageLink.icon className="w-6 h-6 text-muted-foreground" />
                <span className="font-medium">{translations.settings.language}</span>
              </div>
              <Link href={settingsLanguageLink.href}>
                <Button variant="outline" className="rounded-full">{translations.settings.change}</Button>
              </Link>
            </div>
          </section>

          <hr className="mb-8" />
          
          <section>
            <h3 className="text-lg font-medium mb-6">{translations.settings.notificationsAndReminders}</h3>
            <div className="space-y-6">
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
          </section>

          <hr className="my-8" />

          <section>
            <h3 className="text-lg font-medium mb-6">{translations.settings.admin}</h3>
             {settingsAdminLinks.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium">{translations.settings[item.labelKey]}</span>
                </div>
                <Link href={item.href}>
                    <Button variant="outline" className="rounded-full">{translations.settings.open}</Button>
                </Link>
                </div>
             ))}
          </section>

          <hr className="my-8" />
          
          <section>
            <div className="flex items-center gap-2 text-teal-500">
                <Check className="w-5 h-5"/>
                <span className="font-medium text-sm">{translations.settings.privacyAndData}</span>
            </div>
          </section>

           {installPrompt && (
            <section className="mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <settingsAppInstall.icon className="w-6 h-6 text-muted-foreground" />
                        <span className="font-medium">{settingsAppInstall.label}</span>
                    </div>
                    <Button variant="outline" className="rounded-full" onClick={handleInstallClick}>
                        Install
                    </Button>
                </div>
            </section>
           )}
        </main>
      </div>
    </div>
  );
}
