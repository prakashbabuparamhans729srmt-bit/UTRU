
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
}

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service) => {
        const image = PlaceHolderImages.find((img) => img.id === service.id);
        return (
          <Link href={`/service/${service.id}`} key={service.id}>
            <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0 relative">
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={300}
                    height={300}
                    className="object-cover w-full aspect-square"
                    data-ai-hint={image.imageHint}
                  />
                ) : (
                  <div className="w-full aspect-square bg-muted animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-bold text-white text-base text-center drop-shadow-md">{service.name}</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
