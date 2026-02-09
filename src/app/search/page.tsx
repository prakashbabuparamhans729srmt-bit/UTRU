'use client';

import React, { Suspense, useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { servicesData, type Service } from '@/lib/services';
import {
  ChevronLeft,
  Mic,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  X,
  PlaySquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import ServiceGrid from '@/components/ServiceGrid';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// New imports for Firestore search
import { useCollection, useFirestore } from '@/firebase';
import { collection, query as firestoreQuery, type DocumentData } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// A grid of skeleton cards for loading state
const LoadingGrid = () => (
  <>
    <div className="space-y-2 mb-8">
      <Skeleton className="h-6 w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-6 w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </>
);

// Interface for Shorts
interface Short extends DocumentData {
    id: string;
    title: string;
    views: string;
    imageId: string;
    userId?: string;
    createdAt?: { seconds: number, nanoseconds: number };
}

// Card for displaying a short
function ShortCard({ short }: { short: Short }) {
  const image = PlaceHolderImages.find((img) => img.id === short.imageId);
  const imageUrl = image?.imageUrl || `https://picsum.photos/seed/${short.id}/300/300`;
  
  return (
    <Link href={`/explore`} className="block">
      <Card className="overflow-hidden rounded-xl border">
        <CardContent className="p-0 relative">
          <Image
            src={imageUrl}
            alt={short.title}
            width={300}
            height={200}
            className="object-cover w-full aspect-video"
            data-ai-hint={image?.imageHint || 'video content'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="font-semibold text-white text-sm truncate">{short.title}</h4>
            {short.views && <p className="text-xs text-gray-200">{short.views}</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filteredShorts, setFilteredShorts] = useState<Short[]>([]);

  const { translations } = useLanguage();
  const { items: cartItems } = useCart();
  const { openModal: openVoiceModal } = useVoiceSearch();
  const featuredServices = servicesData.filter((s) =>
    ['cleaning-deep-cleaning', 'beauty-salon', 'electronics-ac-repair', 'car-full-service'].includes(s.id)
  );

  // Firestore setup
  const firestore = useFirestore();
  const shortsQuery = useMemo(() => {
    if (!firestore) return null;
    return firestoreQuery(collection(firestore, 'shorts'));
  }, [firestore]);

  const { data: shortsFromDb, loading: shortsLoading } = useCollection<Short>(shortsQuery);

  useEffect(() => {
    // Client-side search logic
    if (query) {
      const lowercasedQuery = query.toLowerCase();

      // Filter services
      const serviceResults = servicesData.filter(
        (service) =>
          service.name.toLowerCase().includes(lowercasedQuery) ||
          service.description.toLowerCase().includes(lowercasedQuery) ||
          service.category.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredServices(serviceResults);

      // Filter shorts/articles
      if (shortsFromDb) {
        const shortResults = shortsFromDb.filter(
            (short) => short.title.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredShorts(shortResults);
      }

    } else {
      setFilteredServices([]);
      setFilteredShorts([]);
    }
  }, [query, shortsFromDb]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push('/search'); // Go to empty search page if query is empty
    }
  };
  
  const hasResults = filteredServices.length > 0 || filteredShorts.length > 0;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <header className="p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            size="icon"
            variant="ghost"
            className="rounded-full bg-black text-white hover:bg-gray-700"
          >
            <ChevronLeft />
          </Button>
          <form onSubmit={handleSearchSubmit} className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={translations.search.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-input rounded-full pl-10 pr-24 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
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
                onClick={openVoiceModal}
              />
              <div className="w-px h-5 bg-border"></div>
              <Link href="/filter">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
              </Link>
            </div>
          </form>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0"
              >
                {cartItems.length}
              </Badge>
            )}
          </Link>
        </div>
      </header>
      <main className="flex-grow p-4 space-y-8">
        {shortsLoading ? (
          <LoadingGrid />
        ) : query && hasResults ? (
          <>
            <h1 className="text-xl font-bold">
                {`${translations.search.resultsFor} "${query}"`}
            </h1>
            {filteredServices.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">Services</h2>
                <ServiceGrid services={filteredServices} />
              </section>
            )}
            {filteredShorts.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <PlaySquare />
                    Shorts & Articles
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {filteredShorts.map(short => <ShortCard key={short.id} short={short} />)}
                </div>
              </section>
            )}
          </>
        ) : query && !hasResults ? (
           <div className="text-center py-10">
            <h2 className="text-2xl font-bold">
              {translations.search.noResults}
            </h2>
            <p className="text-muted-foreground mb-8">
              {translations.search.tryAgain}
            </p>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {translations.home.popularProducts}
              </h3>
              <ServiceGrid services={featuredServices} />
            </div>
          </div>
        ) : (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold">Search for services & articles</h2>
                <p className="text-muted-foreground">Find what you need by typing in the search bar above.</p>
            </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4">
          <LoadingGrid />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
