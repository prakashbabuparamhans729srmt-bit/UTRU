'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FirebaseClientProvider } from '@/firebase';
import { AuthUIProvider } from '@/firebase/auth/auth-ui-provider';
import { CartProvider } from '@/context/CartContext';
import { VoiceSearchProvider } from '@/context/VoiceSearchContext';
import CookieConsent from '@/components/CookieConsent';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <VoiceSearchProvider>
              <FirebaseClientProvider>
                <AuthUIProvider>
                  <CartProvider>
                    {children}
                    <Toaster />
                    <CookieConsent />
                  </CartProvider>
                </AuthUIProvider>
              </FirebaseClientProvider>
            </VoiceSearchProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
