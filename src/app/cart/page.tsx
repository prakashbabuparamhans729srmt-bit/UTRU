import {
  ArrowLeft,
  Search,
  X,
  Mic,
  Smile,
  Book,
  ShoppingCart,
  Shirt,
  User,
  User2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CartPage() {
  const shoppingWomanImage = PlaceHolderImages.find(
    (img) => img.id === 'location-shopping-woman'
  );
  const popularProducts = PlaceHolderImages.filter((img) =>
    img.id.startsWith('cart-popular-')
  );
  const productGrid = PlaceHolderImages.filter((img) =>
    img.id.startsWith('cart-grid-')
  );

  const categories = [
    { icon: User, label: 'Man' },
    { icon: User2, label: 'Man' },
    { icon: Smile, label: 'Shirts' },
    { icon: Book, label: 'Children' },
    { icon: ShoppingCart, label: 'women' },
    { icon: Shirt, label: 'Man' },
    { icon: User, label: 'Man' },
    { icon: User2, label: 'Man' },
    { icon: Smile, label: 'Shirts' },
    { icon: Book, label: 'Children' },
    { icon: ShoppingCart, label: 'women' },
    { icon: Shirt, label: 'Man' },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 bg-background sticky top-0 z-50 border-b border-border">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button size="icon" variant="ghost">
              <ArrowLeft />
            </Button>
          </Link>
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for..."
              className="w-full bg-input rounded-full pl-10 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <X
                className="w-5 h-5 text-muted-foreground cursor-pointer"
              />
              <div className="w-px h-5 bg-border"></div>
              <Mic
                className="w-5 h-5 text-muted-foreground cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <Card className="flex overflow-hidden rounded-lg mb-6">
          <div className="w-1/2 bg-[#E4C0E5] p-4 flex flex-col justify-center items-center text-center">
            <h2 className="text-black font-bold text-xl">BLACK FRIEDAY</h2>
            <p className="text-black text-sm">discounts are available</p>
          </div>
          <div className="w-1/2">
            {shoppingWomanImage && (
              <Image
                src={shoppingWomanImage.imageUrl}
                alt={shoppingWomanImage.description}
                width={300}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint={shoppingWomanImage.imageHint}
              />
            )}
          </div>
        </Card>
        <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-5 h-1 bg-primary rounded-full"></div>
            <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-1 bg-gray-400 rounded-full"></div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Categories</h2>
            <Button variant="link" className="text-primary">See all</Button>
          </div>
          <div className="grid grid-cols-6 gap-2 text-center">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs">{category.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Popular products</h2>
             <Button variant="link" className="text-primary">See all</Button>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  width={100}
                  height={100}
                  className="object-contain w-24 h-24 rounded-lg mb-2"
                  data-ai-hint={product.imageHint}
                />
                <span className="text-sm">{product.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {productGrid.map((product) => (
            <Card key={product.id} className="overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  width={200}
                  height={200}
                  className="object-cover w-full aspect-square"
                  data-ai-hint={product.imageHint}
                />
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
