'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { servicesData } from '@/lib/services';
import {
  Sparkles,
  Brush,
  Wrench,
  Car,
  Baby,
  Gift,
  Paintbrush,
} from 'lucide-react';

// Helper to get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'cleaning':
      return <Sparkles className="w-4 h-4" />;
    case 'beauty':
      return <Brush className="w-4 h-4" />;
    case 'electronics':
      return <Wrench className="w-4 h-4" />;
    case 'car':
      return <Car className="w-4 h-4" />;
    case 'kids':
      return <Baby className="w-4 h-4" />;
    case 'gifting':
      return <Gift className="w-4 h-4" />;
    case 'painting':
      return <Paintbrush className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

interface ServiceStub {
  id: string;
  name: string;
}

interface ServiceGridProps {
  services: ServiceStub[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((serviceStub) => {
        const service = servicesData.find((s) => s.id === serviceStub.id);
        if (!service) return null;

        const image = PlaceHolderImages.find((img) => img.id === service.id);
        const Icon = getCategoryIcon(service.category);

        return (
          <Link href={`/service/${service.id}`} key={service.id}>
            <Card className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-card border h-full flex flex-col">
              <div className="w-full aspect-square relative">
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs text-center p-2">
                      {service.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  {Icon}
                  <span>
                    {service.category.charAt(0).toUpperCase() +
                      service.category.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold truncate text-base text-card-foreground">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-auto pt-1">
                  {service.reviews} reviews
                </p>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
