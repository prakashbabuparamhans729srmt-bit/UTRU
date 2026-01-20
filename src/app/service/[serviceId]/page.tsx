
'use client';

import { notFound, useRouter } from 'next/navigation';
import { servicesData } from '@/lib/services';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin, Star, Clock, Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

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
  const serviceImage = PlaceHolderImages.find((img) => img.id === params.serviceId);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[1]);

  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!service) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || !serviceImage) {
      toast({
        variant: 'destructive',
        title: 'Selection required',
        description: 'Please select a date and time slot.',
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

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold truncate">{service.name}</h1>
      </header>

      <main className="pb-24">
        {serviceImage && (
          <div className="relative h-48 w-full">
            <Image
              src={serviceImage.imageUrl}
              alt={service.name}
              fill
              className="object-cover"
              data-ai-hint={serviceImage.imageHint}
            />
          </div>
        )}

        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold">{service.name}</h2>
          
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{service.rating} ({service.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{service.duration}</span>
            </div>
          </div>

          <p className="text-muted-foreground">{service.description}</p>
        </div>

        <Separator />

        <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">What's Included</h3>
            <ul className="space-y-2">
                {service.checklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        <Separator />

        <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Choose Address</h3>
             <Card className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                        <p className="font-semibold">Home</p>
                        <p className="text-xs text-muted-foreground">Khasra No 206, Sector 141, Noida</p>
                    </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push('/address')}>Change</Button>
                </div>
            </Card>
        </div>

        <Separator />

         <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">
                Select Date & Time Slot
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                Selected: {selectedDate ? format(selectedDate, 'PPP') : 'No date'} at {selectedTime || 'No time'}
            </p>
             <Card className="flex flex-col md:flex-row">
                <div className="p-2 flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                        className="rounded-md"
                    />
                </div>
                 <div className="flex-1 p-4 border-t md:border-t-0 md:border-l">
                    <h4 className="font-semibold mb-4">Available Slots</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                            <Button 
                                key={slot}
                                variant={selectedTime === slot ? "default" : "outline"}
                                className={cn("w-full justify-center", selectedTime === slot && "bg-primary text-primary-foreground")}
                                onClick={() => setSelectedTime(slot)}
                            >
                                {slot}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>
        </div>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-3 z-10">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-bold">₹{service.price.toLocaleString()}</p>
                <p className="text-xs text-primary underline cursor-pointer">View details</p>
            </div>
          <Button size="lg" className="rounded-md" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </footer>
    </div>
  );
}
