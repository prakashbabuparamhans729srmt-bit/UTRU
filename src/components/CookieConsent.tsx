'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // We run this in a useEffect to ensure it only runs on the client
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      // Use a timeout to prevent layout shift issues on initial load
      const timer = setTimeout(() => setShowConsent(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptConsent = () => {
    setShowConsent(false);
    localStorage.setItem('cookie_consent', 'true');
  };
  
  const declineConsent = () => {
    setShowConsent(false);
    // Optionally handle decline logic, for now, we just dismiss
    localStorage.setItem('cookie_consent', 'false');
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div 
        className={cn(
            "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[200] p-6 bg-card border border-border shadow-2xl rounded-2xl max-w-md transition-transform transform-gpu animate-in slide-in-from-bottom-10",
        )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
                <Cookie className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Cookie Consent</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. 
          Read our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-4 mt-2">
          <Button onClick={acceptConsent} className="flex-1">
            Accept
          </Button>
          <Button onClick={declineConsent} variant="outline" className="flex-1">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
