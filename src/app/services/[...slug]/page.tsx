
'use client';

import { useRouter, notFound } from 'next/navigation';
import { serviceHierarchy, type ServiceCategory } from '@/lib/service-hierarchy';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function findCategoryBySlug(slug: string[]): ServiceCategory | undefined {
  if (!slug || slug.length === 0) return undefined;

  let currentLevel: ServiceCategory[] = serviceHierarchy;
  let category: ServiceCategory | undefined;

  for (const part of slug) {
    const found = currentLevel.find((c) => c.id === part);
    if (!found) return undefined;
    category = found;
    currentLevel = category.children || [];
  }

  return category;
}

export default function ServicesPage({ params }: { params: { slug: string[] } }) {
  const router = useRouter();
  const { slug } = params;
  
  const currentCategory = findCategoryBySlug(slug);

  if (!currentCategory) {
    notFound();
  }

  const gridItems = currentCategory.children?.map(item => ({
    id: item.id,
    name: item.name,
    path: item.serviceId ? `/service/${item.serviceId}` : `/services/${slug.join('/')}/${item.id}`,
    imageHint: item.imageHint
  }));

  const PageHeader = () => (
     <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{currentCategory.name}</h1>
      </header>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader />
      <main className="p-4">
        {gridItems && gridItems.length > 0 ? (
           <div className="grid grid-cols-2 gap-4">
            {gridItems.map((service) => {
                const image = PlaceHolderImages.find((img) => img.id === service.id) || PlaceHolderImages.find((img) => img.imageHint.includes(service.imageHint));
                return (
                <Link href={service.path} key={service.id}>
                    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-0 relative">
                        {image ? (
                        <Image
                            src={image.imageUrl}
                            alt={service.name}
                            width={300}
                            height={300}
                            className="object-cover w-full aspect-square"
                            data-ai-hint={service.imageHint}
                        />
                        ) : (
                        <div className="w-full aspect-square bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-center p-2">{service.name}</span>
                        </div>
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
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold">No Subcategories Found</h2>
            <p className="text-muted-foreground">There are no further services or categories here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
