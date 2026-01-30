'use client';

import { notFound, useRouter } from 'next/navigation';
import { servicesData, Service } from '@/lib/services';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreHorizontal, Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';

const filterChips = ["Details", "Packages", "Offers", "Gallery"];
const timeSlots = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM',
  '05:00 PM - 07:00 PM',
];

export default function ServicePage({ params }: { params: { serviceId: string } }) {
  const router = useRouter();
  const service = servicesData.find((s) => s.id === params.serviceId);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[1]);

  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!service) {
    notFound();
  }
  
  const serviceImage = PlaceHolderImages.find((img) => img.id === params.serviceId);
  const checklistImages = PlaceHolderImages.filter(img => img.imageHint.includes('cleaning') || img.imageHint.includes('tools')).slice(0, service.checklist.length);


  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || !serviceImage) {
      toast({
        variant: 'destructive',
        title: 'Selection required',
        description: 'Please select a date and time slot inside the booking dialog.',
      });
      return;
    }

    addToCart({
      ...service,
      imageUrl: serviceImage.imageUrl,
      selectedDate,
      selectedTime,
    });

    toast({
      title: 'Service added to cart!',
      description: `${service.name} has been added to your cart.`,
    });
    
    router.push('/cart');
  };
  
  if (!isClient) {
      return <div className="min-h-screen bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-20">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-gray-800 hover:bg-gray-700">
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
                <Card className="overflow-hidden rounded-2xl bg-gray-800 border-gray-700 text-white">
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
                      <p className="text-xs text-gray-400 mt-1">By Pro Services</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )})}
          </CarouselContent>
        </Carousel>

        {/* Filter Chips */}
        <div className="px-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                {filterChips.map((chip, index) => (
                    <Button key={index} variant={index === 0 ? "default" : "secondary"} className={cn(
                        "rounded-full whitespace-nowrap",
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-gray-700 text-white hover:bg-gray-600"
                    )}>
                        {chip}
                    </Button>
                ))}
            </div>
        </div>
        
        {/* "What's Included" List styled as "Popular Today" */}
        <div className="px-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-400">What&apos;s Included</h2>
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
                        <p className="text-xs text-gray-400 mt-1">Professional equipment used</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                        <Check className="text-primary"/>
                    </Button>
                </div>
            ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-3 z-10">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-bold">₹{service.price.toLocaleString()}</p>
                <p className="text-xs text-primary underline cursor-pointer">View details</p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="rounded-md">Add to Cart</Button>
                </DialogTrigger>
                <DialogContent className="bg-background text-foreground max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Select Date & Time</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-center text-sm text-muted-foreground mb-4">
                            Selected: {selectedDate ? format(selectedDate, 'PPP') : 'No date'} at {selectedTime || 'No time'}
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
                                <h4 className="font-semibold mb-2 text-center">Available Slots</h4>
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
                        </div>
                    </div>
                    <DialogClose asChild>
                       <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!selectedDate || !selectedTime}>
                            Confirm & Add to Cart
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
      </footer>
    </div>
  );
}
