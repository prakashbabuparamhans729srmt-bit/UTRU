'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { servicesData, type Service } from '@/lib/services';
import {
  ChevronLeft,
  Mic,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import ServiceGrid from '@/components/ServiceGrid';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

// A grid of skeleton cards for loading state
const LoadingGrid = () => (
  <div className="grid grid-cols-2 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    ))}
  </div>
);

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const { translations } = useLanguage();
  const { items: cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const { openModal: openVoiceModal } = useVoiceSearch();
  const featuredServices = servicesData.filter((s) =>
    [
      'cleaning-deep-cleaning',
      'beauty-salon',
      'electronics-ac-repair',
      'car-full-service',
    ].includes(s.id)
  );

  useEffect(() => {
    setIsLoading(true);
    if (query) {
      const results = servicesData.filter(
        (service) =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()) ||
          service.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(results);
    } else {
      // If no query, show nothing initially.
      setFilteredServices([]);
    }
    // Simulate network delay for loading state
    setTimeout(() => setIsLoading(false), 300);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
      <main className="flex-grow p-4">
        {isLoading ? (
          <LoadingGrid />
        ) : filteredServices.length > 0 ? (
          <>
            <h1 className="text-xl font-bold mb-4">
              {query
                ? `${translations.search.resultsFor} "${query}"`
                : 'All Services'}
            </h1>
            <ServiceGrid services={filteredServices} />
          </>
        ) : (
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
