
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
    <ThemeProvider>
      <LanguageProvider>
        <FirebaseClientProvider>
          <html lang="en">
            <head>
              <title>E-commerce App</title>
              <meta name="description" content="A modern e-commerce application." />
              <link rel="manifest" href="/manifest.webmanifest" />
            </head>
            <body className="antialiased">
              {children}
              <Toaster />
            </body>
          </html>
        </FirebaseClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
