'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mainCategoryGrid } from '@/lib/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/card';

export default function MorePage() {
  const router = useRouter();
  const { translations } = useLanguage();

  // We don't want to show the "More" category within its own page
  const categoriesToShow = mainCategoryGrid.filter(cat => cat.labelKey !== 'more');

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.home.more}</h1>
      </header>
      <main className="p-4">
        <Card>
            <div className="p-4 space-y-1">
                {categoriesToShow.map((category, index) => (
                    <Link
                        key={index}
                        href={category.href}
                        className="flex items-center justify-between py-3 cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                        <category.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                        <span className="font-medium transition-colors group-hover:text-primary">
                            {translations.home[category.labelKey as keyof typeof translations.home]}
                        </span>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </Link>
                ))}
            </div>
        </Card>
      </main>
    </div>
  );
}
