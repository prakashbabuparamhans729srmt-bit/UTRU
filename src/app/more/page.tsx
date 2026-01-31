
'use client';

import { ChevronLeft, ChevronRight, Mic, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { allServiceCategories, type ServiceCategory } from '@/lib/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { cn } from '@/lib/utils';

export default function MorePage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const { isListening, isMicAvailable, startListening } = useSpeechRecognition(setSearchQuery);

  // Recursive function to filter categories based on search query
  const filterCategories = (categories: ServiceCategory[], query: string): ServiceCategory[] => {
    if (!query.trim()) {
      return categories;
    }
    const lowercasedQuery = query.toLowerCase();

    return categories.reduce((acc: ServiceCategory[], category) => {
      // If the category name itself matches, include it and all its children
      if (category.name.toLowerCase().includes(lowercasedQuery)) {
        acc.push(category);
        return acc;
      }
      // If the category has children, check them recursively
      if (category.children) {
        const filteredChildren = filterCategories(category.children, query);
        if (filteredChildren.length > 0) {
          // If any child matches, include the parent but only with the filtered children
          acc.push({ ...category, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  const filteredCategories = useMemo(() => filterCategories(allServiceCategories, searchQuery), [searchQuery, allServiceCategories]);

  // Recursive function to get all category names for expanding the accordion on search
  const getAllCategoryNames = (categories: ServiceCategory[]): string[] => {
    let names: string[] = [];
    for (const category of categories) {
      names.push(category.name);
      if (category.children) {
        names = [...names, ...getAllCategoryNames(category.children)];
      }
    }
    return names;
  };
  
  const defaultOpenValues = searchQuery ? getAllCategoryNames(filteredCategories) : [];

  // Recursive component to render categories and sub-categories
  const CategoryAccordion = ({ categories, level }: { categories: ServiceCategory[], level: number }) => {
    return (
      <Accordion type="multiple" className="w-full" defaultValue={defaultOpenValues}>
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;

          if (hasChildren) {
            return (
              <AccordionItem key={category.name} value={category.name} className={level > 0 ? "border-b-0" : "border-b"}>
                 <AccordionTrigger className={`hover:no-underline text-left ${level > 0 ? 'py-3 text-sm font-medium' : 'text-base font-semibold'}`}>
                  {category.name}
                </AccordionTrigger>
                <AccordionContent className="pl-4 border-l">
                  <CategoryAccordion categories={category.children!} level={level + 1} />
                </AccordionContent>
              </AccordionItem>
            );
          } else {
            return (
              <div key={category.name} className="border-b last:border-b-0">
                <Link
                  href="#"
                  className="flex items-center justify-between p-3 cursor-pointer group hover:bg-accent"
                >
                  <span className={`font-normal transition-colors group-hover:text-primary ${level > 0 ? 'text-sm' : 'text-base'}`}>
                    {category.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </Link>
              </div>
            );
          }
        })}
      </Accordion>
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.home.more}</h1>
      </header>
      
      <div className="p-4 border-b sticky top-[69px] bg-background/80 backdrop-blur-sm z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={isListening ? "Listening..." : "Search for categories..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-input rounded-full pl-10 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <X
                className="w-5 h-5 text-muted-foreground cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            )}
            <div className="w-px h-5 bg-border"></div>
            {isMicAvailable && (
              <Mic
                className={cn("w-5 h-5 text-muted-foreground cursor-pointer", isListening && "text-primary animate-pulse")}
                onClick={() => startListening()}
              />
            )}
          </div>
        </div>
      </div>

      <main className="p-4">
        {filteredCategories.length > 0 ? (
          <CategoryAccordion categories={filteredCategories} level={0} />
        ) : (
          <p className="text-center text-muted-foreground py-10">No categories found matching your search.</p>
        )}
      </main>
    </div>
  );
}
