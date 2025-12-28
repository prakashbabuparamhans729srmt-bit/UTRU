

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Search,
  X,
  MapPin,
  Home as HomeIcon,
  BookCopy,
  PlaySquare,
  LayoutGrid,
  Phone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function LocationPage() {
  const trainImage = PlaceHolderImages.find((img) => img.id === 'location-train-viaduct');
  const blackFridayImage = PlaceHolderImages.find((img) => img.id === 'location-black-friday');
  const shoppingWomanImage = PlaceHolderImages.find((img) => img.id === 'location-shopping-woman');
  const popularItems = PlaceHolderImages.filter(img => img.id.startsWith('location-popular-'));

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-background sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-foreground" />
            <span className="font-semibold">Select Location</span>
          </div>
          <span className="text-sm">Man</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for..."
              className="w-full bg-card border border-border rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer" />
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl flex flex-col h-auto px-3 py-1.5 items-center">
            <Phone className="w-5 h-5" />
            <span className="text-xs font-semibold">Emergency</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow pb-32">
        <Tabs defaultValue="my" className="w-full px-4 my-4">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
            <TabsTrigger value="my" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">My</TabsTrigger>
            <TabsTrigger value="district" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">District</TabsTrigger>
            <TabsTrigger value="state" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">State</TabsTrigger>
            <TabsTrigger value="bharat" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Bharat</TabsTrigger>
          </TabsList>
        </Tabs>

        <Carousel className="w-full mb-4" opts={{ loop: true }}>
          <CarouselContent>
            {trainImage && (
              <CarouselItem>
                <div className="px-4">
                  <Image
                    src={trainImage.imageUrl}
                    alt={trainImage.description}
                    width={600}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-[16/9]"
                    data-ai-hint={trainImage.imageHint}
                  />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>

        <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
                {blackFridayImage && (
                    <div className="relative rounded-lg overflow-hidden bg-[#E4C0E5] flex flex-col justify-center items-center p-4 aspect-square">
                        <h2 className="text-black font-bold text-xl">BLACK FRIDAY</h2>
                        <p className="text-black text-sm">discounts are available</p>
                    </div>
                )}
                {shoppingWomanImage && (
                    <Image
                      src={shoppingWomanImage.imageUrl}
                      alt={shoppingWomanImage.description}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover w-full aspect-square"
                      data-ai-hint={shoppingWomanImage.imageHint}
                    />
                )}
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <div className="w-5 h-1 bg-primary rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            </div>
        </div>

        <div className="px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">What else is popular</h2>
            <Button variant="outline" className="rounded-full">See all</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-4">
          {popularItems.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-lg border-0">
              <CardContent className="p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  width={200}
                  height={200}
                  className="object-cover w-full aspect-square rounded-lg"
                  data-ai-hint={item.imageHint}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
        <div className="flex justify-around items-center p-2">
          <Link href="/" className="flex flex-col items-center h-auto text-primary">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center h-auto text-muted-foreground">
            <BookCopy className="w-6 h-6 mb-1" />
            <span className="text-xs">Library</span>
          </Link>
          <Link href="/location" className="w-16 h-16 rounded-full bg-primary -translate-y-4 shadow-md border-4 border-background flex items-center justify-center">
             <LayoutGrid className="w-8 h-8 text-primary-foreground" />
          </Link>
          <Link href="/search" className="flex flex-col items-center h-auto text-muted-foreground">
            <PlaySquare className="w-6 h-6 mb-1" />
            <span className="text-xs">Explore</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center h-auto text-muted-foreground">
            <LayoutGrid className="w-6 h-6 mb-1" />
            <span className="text-xs">Opinion</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

    