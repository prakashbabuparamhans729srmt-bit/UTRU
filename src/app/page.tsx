
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Search,
  X,
  Mic,
  ShoppingCart,
  MapPin,
  Home as HomeIcon,
  BookCopy,
  PlaySquare,
  LayoutGrid,
  Heart,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface ProductGridProps {
  products: ImagePlaceholder[];
}

function ProductGrid({ products }: ProductGridProps) {
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    setProductList(
      products.map((product) => ({
        ...product,
        price: (Math.random() * 50 + 10).toFixed(2),
        discount: (Math.random() * 40 + 10).toFixed(0),
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: (Math.random() * 100 + 50).toFixed(0),
      }))
    );
  }, [products]);

  if (!productList.length) {
    return (
        <div className="grid grid-cols-2 gap-4 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-lg">
                    <CardContent className="p-0">
                        <div className="w-full aspect-square bg-muted animate-pulse" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-muted animate-pulse rounded-md" />
                            <div className="h-3 w-1/2 bg-muted animate-pulse rounded-md" />
                             <div className="flex items-center justify-between">
                                <div className="h-5 w-12 bg-muted animate-pulse rounded-md" />
                                <div className="h-5 w-8 bg-muted animate-pulse rounded-md" />
                            </div>
                            <div className="h-4 w-1/3 bg-muted animate-pulse rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {productList.map((product) => (
        <Card key={product.id} className="overflow-hidden rounded-lg">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src={product.imageUrl}
                alt={product.description}
                width={300}
                height={300}
                className="object-cover w-full aspect-square"
                data-ai-hint={product.imageHint}
              />
              <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 rounded-full">
                <Heart className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{product.description}</h3>
              <p className="text-xs text-muted-foreground mb-2">Lorem ipsum</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">$ {product.price}</span>
                <Badge variant="destructive" className="text-xs">{product.discount}%</Badge>
              </div>
               <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-muted-foreground">{product.rating} | {product.reviews}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { translations } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cityNightImage = PlaceHolderImages.find((img) => img.id === 'city-night');
  const productCollageImage = PlaceHolderImages.find((img) => img.id === 'product-collage');
  const products = PlaceHolderImages.filter(img => img.id.startsWith('product-'));

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <header className="p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full" />
            </div>
            <Link href="/address" className="flex flex-col">
              <span className="text-xs text-muted-foreground">{translations.home.locationLabel}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Noida 63</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/avatar/40/40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={translations.home.searchPlaceholder}
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
              <Mic
                className="w-5 h-5 text-muted-foreground cursor-pointer"
              />
            </div>
          </form>
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="flex-grow pb-32">
        <Tabs defaultValue="all" className="w-full px-4 mb-4">
          <TabsList className="grid w-full grid-cols-6 bg-transparent p-0">
            <TabsTrigger value="all" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.all}</TabsTrigger>
            <TabsTrigger value="electronics" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.electronics}</TabsTrigger>
            <TabsTrigger value="beauty" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.beauty}</TabsTrigger>
            <TabsTrigger value="kids" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.kids}</TabsTrigger>
            <TabsTrigger value="gifting" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.gifting}</TabsTrigger>
            <TabsTrigger value="premium" className="pb-2 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">{translations.home.premium}</TabsTrigger>
          </TabsList>
        </Tabs>

        <Carousel className="w-full mb-6" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              {cityNightImage && (
                <div className="px-4">
                  <Image
                    src={cityNightImage.imageUrl}
                    alt={cityNightImage.description}
                    width={600}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-[2/1]"
                    data-ai-hint={cityNightImage.imageHint}
                  />
                </div>
              )}
            </CarouselItem>
            <CarouselItem>
              {productCollageImage && (
                <div className="px-4">
                    <Image
                      src={productCollageImage.imageUrl}
                      alt={productCollageImage.description}
                      width={600}
                      height={300}
                      className="rounded-lg object-cover w-full aspect-[2/1]"
                      data-ai-hint={productCollageImage.imageHint}
                    />
                </div>
              )}
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Button className="rounded-full bg-primary/20 text-primary hover:bg-primary/30">
              <ShoppingCart className="w-4 h-4 mr-2" />
              {translations.home.productBuy}
            </Button>
            <Button variant="ghost" className="rounded-full text-muted-foreground">
              <LayoutGrid className="w-4 h-4 mr-2" />
              {translations.home.category}
            </Button>
          </div>
          <h2 className="text-xl font-bold">{translations.home.popularProducts}</h2>
        </div>

        <ProductGrid products={products} />
      </main>

      <div className="fixed bottom-24 right-4 z-50">
        <Button size="icon" className="rounded-full w-14 h-14 bg-primary shadow-lg">
          <ShoppingCart className="w-6 h-6"/>
        </Button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex justify-around items-center p-2">
          <Button variant="ghost" className="flex flex-col items-center h-auto text-foreground">
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">{translations.home.home}</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-auto text-muted-foreground">
            <BookCopy className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.library}</span>
          </Button>
          <Link href="/location" className="w-16 h-16 rounded-full bg-card -translate-y-4 shadow-md border-4 border-background flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-muted-foreground" />
          </Link>
          <Button variant="ghost" className="flex flex-col items-center h-auto text-muted-foreground">
            <PlaySquare className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.explore}</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-auto text-muted-foreground">
            <LayoutGrid className="w-6 h-6 mb-1" />
            <span className="text-xs">{translations.home.opinion}</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
