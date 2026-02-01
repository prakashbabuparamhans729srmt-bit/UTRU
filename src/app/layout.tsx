'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FirebaseClientProvider } from '@/firebase';
import { AuthUIProvider } from '@/firebase/auth/auth-ui-provider';
import { CartProvider } from '@/context/CartContext';

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
            <FirebaseClientProvider>
              <AuthUIProvider>
                <CartProvider>
                  {children}
                  <Toaster />
                </CartProvider>
              </AuthUIProvider>
            </FirebaseClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
