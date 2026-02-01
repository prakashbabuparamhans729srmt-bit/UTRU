'use client';
import { ChevronLeft, Trash2, ShoppingBag, Plus, Minus, Sparkles, Brush, Wrench, Car, Tag, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, type CartItem } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { servicesData, type Service } from '@/lib/services';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';


function CartItemCard({ item }: { item: CartItem }) {
  const { updateItemQuantity } = useCart();

  return (
    <Card className="flex items-start gap-4 p-4">
      <Link href={`/service/${item.id}`} className="shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-lg object-cover aspect-square"
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/service/${item.id}`}>
          <h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {format(item.selectedDate, 'EEE, d MMM yyyy')}
        </p>
        <p className="text-sm text-muted-foreground">{item.selectedTime}</p>
        <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItemQuantity(item.cartItemId, item.quantity - 1)}>
                    <Minus className="h-4 w-4"/>
                </Button>
                <span className="font-bold">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItemQuantity(item.cartItemId, item.quantity + 1)}>
                    <Plus className="h-4 w-4"/>
                </Button>
            </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => updateItemQuantity(item.cartItemId, 0)}>
        <Trash2 className="w-5 h-5 text-destructive" />
      </Button>
    </Card>
  );
}

function RelatedServiceCard({ service }: { service: Service }) {
  const serviceImage = PlaceHolderImages.find((img) => img.id === service.id);
  const imageUrl = serviceImage?.imageUrl || `https://picsum.photos/seed/${service.id}/300/300`;
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleaning': return <Sparkles className="w-4 h-4" />;
      case 'beauty': return <Brush className="w-4 h-4" />;
      case 'electronics': return <Wrench className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  }

  return (
    <Link href={`/service/${service.id}`}>
      <Card className="overflow-hidden rounded-xl border">
        <CardContent className="p-0">
          <Image
            src={imageUrl}
            alt={service.name}
            width={200}
            height={200}
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              {getCategoryIcon(service.category)}
              <span>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</span>
            </div>
            <h4 className="font-semibold truncate">{service.name}</h4>
            <p className="text-sm text-muted-foreground">₹{service.price.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function CartPage() {
  const router = useRouter();
  const { items, total, deliveryFee, platformFee, finalTotal, couponCode, discount, applyCoupon, removeCoupon } = useCart();
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [isCouponDialogOpen, setIsCouponDialogOpen] = useState(false);

  const relatedServices = useMemo(() => {
    if (items.length === 0) {
      // Fallback to featured services if cart is empty (though the page redirects)
      return servicesData.filter(s => ['cleaning-deep-cleaning', 'beauty-salon', 'electronics-ac-repair', 'car-full-service'].includes(s.id));
    }

    const cartItemIds = new Set(items.map(item => item.id));
    const cartCategories = new Set(items.map(item => item.category));

    const recommended = servicesData.filter(service => 
      !cartItemIds.has(service.id) && cartCategories.has(service.category)
    );

    if (recommended.length > 0) {
      // Return up to 4 recommendations
      return recommended.slice(0, 4);
    }

    // If no related services found in the same category, fallback to featured services
    return servicesData.filter(s => 
      !cartItemIds.has(s.id) && ['cleaning-deep-cleaning', 'beauty-salon', 'electronics-ac-repair', 'car-full-service'].includes(s.id)
    ).slice(0, 4);
  }, [items]);

  const VALID_COUPONS: { [key: string]: { description: string } } = {
    'UCLAP10': { description: 'Get 10% OFF on your entire order.' },
    'UCLAP50': { description: 'Get a flat ₹50 discount.' },
  };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
        toast({ title: 'Coupon applied!', description: `You've received a discount!` });
        setIsCouponDialogOpen(false);
    } else {
        toast({ variant: 'destructive', title: 'Invalid Coupon', description: 'The coupon code you entered is not valid.' });
    }
    setCouponInput('');
  };

  const handleCouponClick = (code: string) => {
    const success = applyCoupon(code);
    if (success) {
        toast({ title: 'Coupon applied!', description: `You've received a discount!` });
        setIsCouponDialogOpen(false);
    }
  }
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: 'Coupon Removed',
      description: 'Your cart total has been updated.',
    });
  };


  if (items.length === 0) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
            <ChevronLeft />
          </Button>
          <h1 className="text-lg font-semibold">{translations.cart.yourCart}</h1>
        </header>
        <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-1">{translations.cart.emptyTitle}</h2>
          <p className="text-muted-foreground mb-6">{translations.cart.emptySubtitle}</p>
          <Link href="/">
            <Button>{translations.cart.browseServices}</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.cart.yourCart} ({items.length})</h1>
      </header>

      <main className="flex-grow p-4 space-y-4 pb-96">
        {items.map((item) => (
          <CartItemCard key={item.cartItemId} item={item} />
        ))}
        <div className="pt-8">
            <h2 className="text-xl font-bold mb-4">You might also like</h2>
            <Carousel opts={{ align: "start", loop: false }}>
                <CarouselContent className="-ml-2">
                {relatedServices.map(service => (
                    <CarouselItem key={service.id} className="pl-2 basis-1/2 md:basis-1/3">
                    <RelatedServiceCard service={service} />
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-transparent p-4 z-10">
        <div className="bg-gray-900 text-white rounded-3xl p-6 space-y-4 shadow-lg border border-gray-700">
            <Dialog open={isCouponDialogOpen} onOpenChange={setIsCouponDialogOpen}>
              {!couponCode ? (
                  <DialogTrigger asChild>
                      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                          <div className="flex items-center gap-3">
                              <Tag className="w-5 h-5 text-primary"/>
                              <p className="font-semibold text-white">Apply Coupon</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                  </DialogTrigger>
              ) : (
                  <div className="flex justify-between items-center bg-green-900/50 p-3 rounded-lg text-sm">
                      <p className="font-semibold text-green-300">
                          Coupon <span className="font-bold">{couponCode}</span> applied!
                      </p>
                      <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-green-300 h-auto py-1">Remove</Button>
                  </div>
              )}
              <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                      <DialogTitle>Apply Coupon</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                      <Input
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="bg-gray-800 border-gray-600 focus:ring-primary"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <Button type="submit" onClick={handleApplyCoupon} disabled={!couponInput.trim()}>
                          Apply
                      </Button>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-3">
                      <h4 className="font-semibold text-gray-300">Available Coupons</h4>
                      {Object.entries(VALID_COUPONS).map(([code, { description }]) => (
                          <div key={code} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                              <div>
                                  <p className="font-bold text-primary tracking-wider">{code}</p>
                                  <p className="text-xs text-gray-400">{description}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-primary h-auto py-1" onClick={() => handleCouponClick(code)}>
                                  Apply
                              </Button>
                          </div>
                      ))}
                  </div>
              </DialogContent>
            </Dialog>

            <h2 className="text-xl font-bold text-center pt-2">Bill Details</h2>
            <div className="space-y-3 text-base">
                <div className="flex justify-between">
                    <span className="text-gray-400">{translations.cart.itemTotal}</span>
                    <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">{translations.cart.deliveryFee}</span>
                    <span className="font-medium">₹{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">{translations.cart.platformFee}</span>
                    <span className="font-medium">₹{platformFee.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                <div className="flex justify-between text-green-400">
                    <span className="text-gray-400">Discount</span>
                    <span className="font-medium">- ₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                )}
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex justify-between font-bold text-lg">
                <span>{translations.cart.toPay}</span>
                <span>₹{finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <Button size="lg" className="w-full h-12 text-lg rounded-full bg-primary hover:bg-primary/90" onClick={() => router.push('/checkout')}>
                Pay
            </Button>
        </div>
      </footer>
    </div>
  );
}
