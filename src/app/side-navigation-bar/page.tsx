'use client';

import { useState } from 'react';
import SideNavigationBar from '@/components/ui/SideNavigationBar';
import { Button } from '@/components/ui/button';

export default function SideNavPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-background">
      <SideNavigationBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Side Navigation Bar Demo</h1>
        <p className="mb-4">
          This page demonstrates the responsive side navigation bar.
        </p>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close' : 'Open'} Sidebar
        </Button>
      </main>
    </div>
  );
}
