
'use client';

import { ChevronLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Dummy data for ratings
const pastServices = [
    { id: '1', name: 'Deep Home Cleaning', date: '2024-05-20', rated: true, rating: 5 },
    { id: '2', name: 'AC Service & Repair', date: '2024-05-15', rated: false, rating: 0 },
    { id: '3', name: 'Salon for Women', date: '2024-05-10', rated: true, rating: 4 },
];

function RatingStars({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 ${
                        star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                    } ${interactive ? 'cursor-pointer transition-transform hover:scale-125' : ''}`}
                    onClick={() => interactive && onRate?.(star)}
                />
            ))}
        </div>
    );
}


export default function MyRatingsPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [servicesToRate, setServicesToRate] = useState(pastServices);
  const { toast } = useToast();

  const handleRate = (serviceId: string, rating: number) => {
    setServicesToRate(currentServices =>
      currentServices.map(s => 
        s.id === serviceId ? { ...s, rating: rating } : s
      )
    );
  };
  
  const submitRating = (serviceId: string) => {
     setServicesToRate(currentServices =>
      currentServices.map(s => 
        s.id === serviceId ? { ...s, rated: true } : s
      )
    );
    toast({ title: "Rating Submitted!", description: "Thank you for your feedback." });
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Button onClick={() => router.back()} size="icon" variant="ghost" className="rounded-full bg-black text-white hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-semibold">{translations.profile.myRating}</h1>
      </header>
      <main className="p-4 space-y-6">
        <Card className="p-6 text-center bg-card">
            <h2 className="text-muted-foreground text-sm font-semibold">YOUR AVERAGE RATING</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
                <Star className="w-8 h-8 text-amber-400 fill-amber-400"/>
                <p className="text-4xl font-bold">4.7</p>
            </div>
        </Card>

        <div>
            <h3 className="text-lg font-semibold mb-4">Rate Your Past Services</h3>
            <div className="space-y-4">
                {servicesToRate.map(service => (
                    <Card key={service.id} className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{service.name}</p>
                                <p className="text-sm text-muted-foreground">{service.date}</p>
                            </div>
                            {service.rated && (
                                <RatingStars rating={service.rating} />
                            )}
                        </div>
                        {!service.rated && (
                             <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-center mb-2">How was your experience?</p>
                                <div className="flex justify-center mb-4">
                                     <RatingStars rating={service.rating} onRate={(r) => handleRate(service.id, r)} interactive={true} />
                                </div>
                                <Button onClick={() => submitRating(service.id)} className="w-full" disabled={service.rating === 0}>Submit Rating</Button>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
