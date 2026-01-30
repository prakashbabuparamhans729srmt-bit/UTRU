'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { allServiceCategories } from '@/lib/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const ratings = [
  { id: '4.5', label: '4.5 & above' },
  { id: '4.0', label: '4.0 & above' },
  { id: '3.5', label: '3.5 & above' },
  { id: '3.0', label: '3.0 & above' },
];

export default function FilterPage() {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const defaultOpen = ['sort', 'price', 'category-0', 'rating'];

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">Filters</h1>
      </header>

      <main className="flex-grow p-4 pb-24">
        <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
          {/* Sort By Section */}
          <AccordionItem value="sort">
            <AccordionTrigger className="text-base font-semibold">Sort By</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="relevance">
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="relevance" id="relevance" />
                  <Label htmlFor="relevance">Relevance</Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="price-lth" id="price-lth" />
                  <Label htmlFor="price-lth">Price (Low to High)</Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="price-htl" id="price-htl" />
                  <Label htmlFor="price-htl">Price (High to Low)</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          {/* Price Range Section */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-semibold">Price Range</AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={[500, 5000]}
                max={10000}
                min={0}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value)}
                className="w-full"
              />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          {/* Category Section */}
          {allServiceCategories.map((group, groupIndex) => (
            <AccordionItem key={group.title} value={`category-${groupIndex}`}>
                <AccordionTrigger className="text-base font-semibold">{group.title}</AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-72">
                    {group.categories.map((category, catIndex) => (
                        <div key={`${group.title}-${catIndex}`} className="flex items-center space-x-2 py-2">
                        <Checkbox id={`cat-${groupIndex}-${catIndex}`} />
                        <Label htmlFor={`cat-${groupIndex}-${catIndex}`} className="font-normal">
                            {category}
                        </Label>
                        </div>
                    ))}
                  </ScrollArea>
                </AccordionContent>
            </AccordionItem>
          ))}

          <Separator />

          {/* Rating Section */}
          <AccordionItem value="rating">
            <AccordionTrigger className="text-base font-semibold">Rating</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="4.5">
                {ratings.map((rating) => (
                  <div key={rating.id} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                    <Label htmlFor={`rating-${rating.id}`}>{rating.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 z-10 flex gap-4">
        <Button variant="outline" className="w-1/2 h-12 text-base" onClick={() => router.back()}>
          Clear All
        </Button>
        <Button className="w-1/2 h-12 text-base" onClick={() => router.back()}>
          Apply Filters
        </Button>
      </footer>
    </div>
  );
}
