
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FirebaseClientProvider } from '@/firebase';
import { AuthUIProvider } from '@/firebase/auth/auth-ui-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <FirebaseClientProvider>
              <AuthUIProvider>
                {children}
                <Toaster />
              </AuthUIProvider>
            </FirebaseClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
