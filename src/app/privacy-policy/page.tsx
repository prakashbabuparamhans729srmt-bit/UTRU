'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Privacy Policy</h1>
      </header>
      <main className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <p className="text-muted-foreground">
          Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
        </p>
        <h3 className="text-xl font-semibold">1. Information we collect</h3>
        <p className="text-muted-foreground">
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
        </p>
        <h3 className="text-xl font-semibold">2. How we use your information</h3>
        <p className="text-muted-foreground">
          We use the information we collect in various ways, including to: provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; develop new products, services, features, and functionality.
        </p>
        <h3 className="text-xl font-semibold">3. Cookies</h3>
        <p className="text-muted-foreground">
          We use cookies to help us improve your experience. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
        </p>
         <h3 className="text-xl font-semibold">4. Consent</h3>
        <p className="text-muted-foreground">
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </main>
    </div>
  );
}
