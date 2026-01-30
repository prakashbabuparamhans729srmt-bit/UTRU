'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { allServiceCategories } from '@/lib/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MorePage() {
  const router = useRouter();
  const { translations } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.home.more}</h1>
      </header>
      <main className="p-4">
        <Accordion type="multiple" className="w-full">
            {allServiceCategories.map((group, groupIndex) => (
                <AccordionItem key={groupIndex} value={`item-${groupIndex}`}>
                    <AccordionTrigger className="text-base font-semibold hover:no-underline text-left">
                        {group.title}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="divide-y divide-border">
                            {group.categories.map((category, catIndex) => (
                                <Link
                                    key={catIndex}
                                    href="#" // Placeholder link
                                    className="flex items-center justify-between p-4 cursor-pointer group"
                                >
                                    <span className="font-medium transition-colors group-hover:text-primary">
                                        {category}
                                    </span>
                                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </main>
    </div>
  );
}
