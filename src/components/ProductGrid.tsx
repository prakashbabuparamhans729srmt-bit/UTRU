
'use client';

import React, { useState, useEffect } from 'react';
import {
  type ImagePlaceholder,
} from '@/lib/placeholder-images';
import {
  Heart,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: ImagePlaceholder[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    // This now only runs on the client, avoiding the hydration error.
    setProductList(
      products.map((product) => ({
        ...product,
        price: (Math.random() * 50 + 10).toFixed(2),
        discount: (Math.random() * 40 + 10).toFixed(0),
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 100 + 50),
      }))
    );
  }, [products]);

  if (!products.length) return null;

  if (!productList.length) {
    return (
        <div className="grid grid-cols-2 gap-4 px-4">
            {Array.from({ length: products.length || 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-lg">
                    <CardContent className="p-0">
                        <Skeleton className="w-full aspect-square" />
                        <div className="p-3 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                             <div className="flex items-center justify-between">
                                <Skeleton className="h-5 w-12" />
                                <Skeleton className="h-5 w-8" />
                            </div>
                            <Skeleton className="h-4 w-1/3" />
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
