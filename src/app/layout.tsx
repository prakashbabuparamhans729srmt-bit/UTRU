
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FirebaseClientProvider } from '@/firebase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <FirebaseClientProvider>
              {children}
              <Toaster />
            </FirebaseClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
