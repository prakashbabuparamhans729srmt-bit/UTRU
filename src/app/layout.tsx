
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" className="dark">
        <head>
          <title>E-commerce App</title>
          <meta name="description" content="A modern e-commerce application." />
        </head>
        <body className="antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
