
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
                <AccordionItem key={`group-${groupIndex}`} value={`group-${groupIndex}`}>
                    <AccordionTrigger className="text-base font-semibold hover:no-underline text-left">
                        {group.name}
                    </AccordionTrigger>
                    <AccordionContent>
                       {group.children ? (
                          <div className="divide-y divide-border pl-4 border-l">
                            {group.children.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                    {subItem.children ? (
                                        <Accordion type="multiple" className="w-full">
                                            <AccordionItem value={`sub-${subIndex}`} className="border-b-0">
                                                <AccordionTrigger className="text-sm font-medium hover:no-underline text-left py-3">
                                                    {subItem.name}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="pl-4 border-l divide-y divide-border">
                                                        {subItem.children.map((item, itemIndex) => (
                                                            <Link
                                                                key={itemIndex}
                                                                href="#"
                                                                className="flex items-center justify-between p-3 cursor-pointer group"
                                                            >
                                                                <span className="font-normal text-sm transition-colors group-hover:text-primary">
                                                                    {item.name}
                                                                </span>
                                                                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Link
                                            href="#"
                                            className="flex items-center justify-between p-3 cursor-pointer group"
                                        >
                                            <span className="font-medium text-sm transition-colors group-hover:text-primary">
                                                {subItem.name}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                       ) : (
                        <div className="divide-y divide-border">
                            <p className='p-4 text-muted-foreground'>No sub-categories available.</p>
                        </div>
                       )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </main>
    </div>
  );
}
