
'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import { servicesData, Service } from '@/lib/services';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreHorizontal, Check, Minus, Plus, Star, Tag } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const timeSlots = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM',
  '05:00 PM - 07:00 PM',
];

export default function ServicePage() {
  const router = useRouter();
  const params = useParams();
  const { translations } = useLanguage();
  const serviceId = params.serviceId as string;
  const service = servicesData.find((s) => s.id === serviceId);

  const filterChips = [
    { key: "details", label: translations.service.details },
    { key: "packages", label: translations.service.packages },
    { key: "offers", label: translations.service.offers },
    { key: "gallery", label: translations.service.gallery }
  ];
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeFilter, setActiveFilter] = useState('details');
  const mainContainerRef = useRef<HTMLDivElement>(null);


  const { addToCart, items: cartItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedDate && selectedTime && service) {
        const cartItemId = `${service.id}-${selectedDate.toISOString()}-${selectedTime}`;
        const existingItem = cartItems.find(item => item.cartItemId === cartItemId);
        if (existingItem) {
            setQuantity(existingItem.quantity);
        } else {
            setQuantity(1); // Reset to 1 if it's a new combination of service/date/time
        }
    }
  }, [selectedDate, selectedTime, cartItems, service]);


  if (!service) {
    notFound();
  }
  
  const serviceImage = PlaceHolderImages.find((img) => img.id === serviceId);
  const fallbackImageUrl = `https://picsum.photos/seed/${service.id}/400/300`;
  const imageUrl = serviceImage?.imageUrl || fallbackImageUrl;
  
  const checklistImages = PlaceHolderImages.filter(img => img.imageHint.includes('cleaning') || img.imageHint.includes('tools')).slice(0, service.checklist.length);
  const galleryImages = PlaceHolderImages.filter(img => img.imageHint.includes(service.category) || img.imageHint.includes('service')).slice(0, 4);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const section = document.getElementById(filter.toLowerCase());
    if (section) {
        const headerOffset = 80; // height of sticky headers
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
        });
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                 const filterName = entry.target.id;
                 setActiveFilter(filterName);
            }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    const sections = filterChips.map(chip => document.getElementById(chip.key.toLowerCase()));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [filterChips]);


  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        variant: 'destructive',
        title: translations.service.selectionRequiredTitle,
        description: translations.service.selectionRequiredDesc,
      });
      return;
    }

    const action = addToCart(
      {
        ...service,
        imageUrl: imageUrl,
        selectedDate,
        selectedTime,
      },
      quantity
    );

    if (action === 'added') {
      toast({
        title: translations.service.addedToCartTitle,
        description: `${quantity} x ${service.name}`,
        action: <ToastAction altText={translations.service.viewCart} onClick={() => router.push('/cart')}>{translations.service.viewCart}</ToastAction>,
      });
    } else { // 'updated'
      toast({
        title: translations.service.updatedCartTitle,
        description: `${translations.service.quantity} for ${service.name} has been updated.`,
        action: <ToastAction altText={translations.service.viewCart} onClick={() => router.push('/cart')}>{translations.service.viewCart}</ToastAction>,
      });
    }
  };
  
  if (!isClient) {
      return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground" ref={mainContainerRef}>
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-20 border-b">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
      </header>

      <main className="pb-24">
        {/* Top Carousel using service image */}
        <Carousel className="w-full mb-6" opts={{ loop: false }}>
          <CarouselContent className="-ml-2">
            {[service, ...servicesData.filter(s => s.category === service.category && s.id !== service.id).slice(0,2)].map((item) => {
              const image = PlaceHolderImages.find(img => img.id === item.id);
              return (
              <CarouselItem key={item.id} className="pl-4 basis-2/3">
                <Link href={`/service/${item.id}`} className="block">
                    <Card className="overflow-hidden rounded-2xl bg-card border-border text-card-foreground">
                    <CardContent className="p-0">
                        <Image
                        src={image?.imageUrl || `https://picsum.photos/seed/${item.id}/400/300`}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="object-cover w-full aspect-[4/3]"
                        />
                        <div className="p-3">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{translations.service.byProServices}</p>
                        </div>
                    </CardContent>
                    </Card>
                </Link>
              </CarouselItem>
            )})}
          </CarouselContent>
        </Carousel>

        {/* Filter Chips */}
        <div className="px-4 mb-6 sticky top-[69px] bg-background/80 backdrop-blur-sm py-2 z-10">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                {filterChips.map((chip) => (
                    <Button 
                        key={chip.key} 
                        variant={activeFilter === chip.key ? "default" : "secondary"} 
                        className={cn("rounded-full whitespace-nowrap", activeFilter === chip.key ? "bg-primary text-primary-foreground" : "")}
                        onClick={() => handleFilterClick(chip.key)}
                    >
                        {chip.label}
                    </Button>
                ))}
            </div>
        </div>
        
        {/* Page Content Sections */}
        <div className="px-4 space-y-8">
            <section id="details" className="space-y-4 scroll-mt-24">
                 <h2 className="text-xl font-bold">{service.name}</h2>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-foreground">{service.rating}</span>
                        <span>({service.reviews} reviews)</span>
                    </div>
                    <span>&bull;</span>
                    <span>{service.duration}</span>
                 </div>
                 <p className="text-muted-foreground">{service.description}</p>
            </section>
            <Separator/>
            <section id="packages" className="space-y-4 scroll-mt-24">
                <h2 className="text-lg font-semibold text-muted-foreground">{translations.service.whatsIncluded}</h2>
                {service.checklist.map((item, index) => (
                     <div key={index} className="flex items-center gap-4">
                        <Image 
                            src={checklistImages[index]?.imageUrl || `https://picsum.photos/seed/${item}/100/100`}
                            alt={item}
                            width={80}
                            height={80}
                            className="rounded-2xl object-cover aspect-square"
                        />
                        <div className="flex-grow">
                            <h3 className="font-semibold leading-tight">{item}</h3>
                            <p className="text-xs text-muted-foreground mt-1">Professional equipment used</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Check className="text-primary"/>
                        </Button>
                    </div>
                ))}
            </section>
            <Separator/>
            <section id="offers" className="space-y-4 scroll-mt-24">
                <h2 className="text-lg font-semibold text-muted-foreground">{translations.service.availableOffers}</h2>
                <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                    <CardContent className="p-4 flex items-center gap-4">
                        <Tag className="w-6 h-6 text-green-600 dark:text-green-400"/>
                        <div>
                            <p className="font-bold text-green-800 dark:text-green-300">Use code UCLAP10</p>
                            <p className="text-sm text-green-600 dark:text-green-500">Get 10% instant discount on your first order.</p>
                        </div>
                    </CardContent>
                </Card>
            </section>
            <Separator/>
             <section id="gallery" className="space-y-4 scroll-mt-24">
                <h2 className="text-lg font-semibold text-muted-foreground">{translations.service.gallery}</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {galleryImages.map((image) => (
                        <Image 
                            key={image.id}
                            src={image.imageUrl}
                            alt={image.description}
                            width={200}
                            height={200}
                            className="rounded-lg object-cover aspect-square w-full"
                        />
                    ))}
                </div>
            </section>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-3 z-10">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-bold text-card-foreground">₹{service.price.toLocaleString()}</p>
                <p onClick={() => handleFilterClick('details')} className="text-xs text-primary underline cursor-pointer">{translations.service.viewDetails}</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="rounded-md">{translations.service.addToCart}</Button>
                </DialogTrigger>
                <DialogContent className="bg-background text-foreground max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{translations.service.selectDateTime}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-center text-sm text-muted-foreground mb-4">
                            {translations.service.selected} {selectedDate ? format(selectedDate, 'PPP') : translations.service.noDate} at {selectedTime || translations.service.noTime}
                        </p>
                        <div className="flex flex-col items-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                className="rounded-md border"
                            />
                             <Separator className="my-4" />
                            <div className="w-full px-4">
                                <h4 className="font-semibold mb-2 text-center">{translations.service.availableSlots}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((slot) => (
                                        <Button 
                                            key={slot}
                                            variant={selectedTime === slot ? "default" : "outline"}
                                            className="w-full justify-center"
                                            onClick={() => setSelectedTime(slot)}
                                        >
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="w-full px-4 flex flex-col items-center">
                                <h4 className="font-semibold mb-2 text-center">{translations.service.quantity}</h4>
                                <div className="flex items-center justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogClose asChild>
                       <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!selectedDate || !selectedTime}>
                            {translations.service.confirmAndAddToCart}
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
      </footer>
    </div>
  );
}

    