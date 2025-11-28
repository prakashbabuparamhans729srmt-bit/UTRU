
'use client';

import { ArrowLeft, Bell, Check, Mail, MessageSquare, Phone, Sun, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.38 1.25 4.81L2 22l5.3-1.38c1.37.72 2.93 1.13 4.57 1.13h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.47 16c-.22.54-.87 1-1.6.97-1.05-.05-2.22-.44-3.53-1.4-1.74-1.27-2.88-2.8-3.15-3.32-.28-.52-.5-1.12-.5-1.77 0-.65.23-1.21.63-1.63.33-.33.74-.48 1.08-.48h.1c.28 0 .53.08.73.28l.2.2c.4.4.65 1 .65 1.05s.03.4-.1.65l-1.07 1.23c-.15.15-.22.3-.1.45.12.15.53.84 1.25 1.55.93.93 1.63 1.22 1.83 1.32.2.1.35.08.48-.05l1.03-.98c.2-.2.4-.3.65-.3s.5.1.7.3l.2.2c.2.2.3.45.3.7s0 .55-.1.82l-.24.28zm-5.43-3.2c-.15.2-.15.3 0 .45l.15.15c.15.15.3.15.45 0l.15-.15c.15-.15.15-.3 0-.45l-.15-.15c-.15-.15-.3-.15-.45 0z" />
    </svg>
);

const SmsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M14 9h-4" />
        <path d="M12 7v2" />
        <path d="M12 11v2" />
    </svg>
);


export default function SettingsPage() {
  const router = useRouter();

  const settingsItems = [
    { icon: WhatsappIcon, label: 'Whatsapp', defaultChecked: true },
    { icon: SmsIcon, label: 'SMS' },
    { icon: Mail, label: 'Email' },
    { icon: Bell, label: 'Push Notification' },
    { icon: Phone, label: 'Voice calls', hasSun: true },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-white text-black rounded-b-[2.5rem] flex-grow">
        <header className="p-4 flex items-center gap-4">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold">Setting</h1>
        </header>

        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-1">Order related messages</h2>
            <p className="text-gray-500 text-sm">
              Order related messages can't be turned off as they are important for service experience.
            </p>
          </section>

          <hr className="mb-8" />
          
          <section className="mb-8">
            <h3 className="text-lg font-medium mb-6">Language</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-gray-700" />
                <span className="font-medium">Language</span>
              </div>
              <Link href="/language">
                <Button variant="outline" className="rounded-full">change</Button>
              </Link>
            </div>
          </section>

          <hr className="mb-8" />

          <section>
            <h3 className="text-lg font-medium mb-6">Notifications & reminders</h3>
            <div className="space-y-6">
              {settingsItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-gray-700" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                   <div className="relative">
                    <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-primary"/>
                    {item.hasSun && <Sun className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 flex items-center gap-2 text-teal-500">
            <Check className="w-5 h-5"/>
            <span className="font-medium text-sm">Privacy & Data</span>
          </section>

        </main>
      </div>
    </div>
  );
}
