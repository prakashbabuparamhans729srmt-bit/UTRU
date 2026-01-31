
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { allServiceCategories } from '@/lib/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Recursive component to render categories, but since we can't define it here, we will manually nest it in the main component.
// const CategoryAccordion = ({ categories }: { categories: any[] }) => {
//   return (
//     <Accordion type="multiple" className="w-full pl-4">
//       {categories.map((category, index) => (
//         category.children ? (
//           <AccordionItem key={index} value={category.name}>
//             <AccordionTrigger>{category.name}</AccordionTrigger>
//             <AccordionContent>
//               <CategoryAccordion categories={category.children} />
//             </AccordionContent>
//           </AccordionItem>
//         ) : (
//           <Link key={index} href="#" className="flex items-center justify-between p-4 border-b group">
//             <span className="font-medium transition-colors group-hover:text-primary">{category.name}</span>
//             <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
//           </Link>
//         )
//       ))}
//     </Accordion>
//   );
// };


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
                          <Accordion type="multiple" className="w-full pl-4 border-l">
                            {group.children.map((subItem, subIndex) => (
                              <AccordionItem key={`sub-${groupIndex}-${subIndex}`} value={`sub-${groupIndex}-${subIndex}`} className="border-b-0">
                                {subItem.children ? (
                                    <>
                                        <AccordionTrigger className="text-sm font-medium hover:no-underline text-left py-3">
                                            {subItem.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="pl-4 border-l">
                                                {subItem.children.map((item, itemIndex) => (
                                                     <Link
                                                        key={itemIndex}
                                                        href="#" // Placeholder link
                                                        className="flex items-center justify-between p-3 cursor-pointer group border-b"
                                                    >
                                                        <span className="font-normal text-sm transition-colors group-hover:text-primary">
                                                            {item.name}
                                                        </span>
                                                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </>
                                ) : (
                                     <Link
                                        href="#" // Placeholder link
                                        className="flex items-center justify-between p-3 cursor-pointer group border-b"
                                    >
                                        <span className="font-medium text-sm transition-colors group-hover:text-primary">
                                            {subItem.name}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    </Link>
                                )}
                              </AccordionItem>
                            ))}
                          </Accordion>
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
