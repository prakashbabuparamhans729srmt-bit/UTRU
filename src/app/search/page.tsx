
'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PlaceHolderImages,
  type ImagePlaceholder,
} from '@/lib/placeholder-images';
import {
  ArrowLeft,
  Heart,
  Mic,
  Search,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredProducts, setFilteredProducts] = useState<
    ImagePlaceholder[]
  >([]);

  useEffect(() => {
    if (query) {
      const results = PlaceHolderImages.filter(
        (product) =>
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.imageHint.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
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
          <Link href="/">
            <Button size="icon" variant="ghost">
              <ArrowLeft />
            </Button>
          </Link>
          <form onSubmit={handleSearchSubmit} className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for..."
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
              <Mic className="w-5 h-5 text-muted-foreground cursor-pointer" />
            </div>
          </form>
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </header>
      <main className="flex-grow p-4">
        {filteredProducts.length > 0 ? (
          <>
            <h1 className="text-xl font-bold mb-4">
              Results for &quot;{query}&quot;
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
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
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">
                        {product.description}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Lorem ipsum
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">
                          $ {(Math.random() * 50 + 10).toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {(Math.random() * 40 + 10).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-muted-foreground">
                          {(Math.random() * 2 + 3).toFixed(1)} |{' '}
                          {(Math.random() * 100 + 50).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">No results found</h2>
            <p className="text-muted-foreground">
              Try searching for something else.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    )
}
