'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page is now a redirector to the main entry page.
// The main authentication options are on the `/entry` page.
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/entry');
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
