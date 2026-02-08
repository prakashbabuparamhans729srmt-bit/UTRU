'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  Play,
  Pause,
  Music,
  Loader2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Autoplay from 'embla-carousel-autoplay';
import { shortsData } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


// A utility function to format large numbers
const formatCount = (num: number): string => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

export default function ExplorePage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedStatus, setLikedStatus] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const [allShorts, setAllShorts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // This will run only on the client
      const staticShorts = shortsData;
      const userShorts = JSON.parse(localStorage.getItem('user_shorts') || '[]');
      const combinedShorts = [...userShorts, ...staticShorts];

      const processedShorts = combinedShorts.map((short, index) => {
          const image = PlaceHolderImages.find((img) => img.id === short.imageId);
          const viewsNumber = parseFloat(short.views) * 1000000 || Math.floor(Math.random() * 5000000);
          const initialLikes = Math.floor(viewsNumber / 10 + Math.random() * 10000);

          return {
              ...short,
              imageUrl: image?.imageUrl || `https://picsum.photos/seed/${short.id}/900/1600`,
              imageHint: image?.imageHint || 'video content',
              userName: `Creator${index + 1}`,
              avatarUrl: `https://picsum.photos/seed/avatar${index}/40/40`,
              description: `${short.title} - Check this out! #cool #video #fyp`,
              audio: `Original Audio - Creator${index + 1}`,
              initialLikes: initialLikes
          };
      });
      
      setAllShorts(processedShorts);

      const initialCounts = processedShorts.reduce((acc, short) => {
          acc[short.id] = short.initialLikes;
          return acc;
      }, {} as Record<string, number>);
      setLikeCounts(initialCounts);
      setIsLoading(false);
  }, []);

  // Using autoplay to simulate video playback and auto-advancing shorts
  const plugin = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    if (!api) return;
    
    // When a new short is selected, reset and play the autoplay
    const onSelect = () => {
      plugin.current.reset();
      if (!isPlaying) {
        setIsPlaying(true);
      }
    };

    api.on('select', onSelect);
    
    return () => {
      api.off('select', onSelect);
    };

  }, [api, isPlaying]);

  const togglePlay = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent toggling when clicking on buttons inside the container
    if ((e.target as HTMLElement).closest('button')) {
        return;
    }

    if (isPlaying) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleLike = (shortId: string) => {
    const isCurrentlyLiked = likedStatus[shortId];
    setLikedStatus(prev => ({
        ...prev,
        [shortId]: !isCurrentlyLiked
    }));
    setLikeCounts(prev => ({
        ...prev,
        [shortId]: isCurrentlyLiked ? (prev[shortId] || 1) - 1 : (prev[shortId] || 0) + 1
    }));
  };

  const handleShare = async (short: any) => {
    const shareData = {
        title: `Check out this short: ${short.title}`,
        text: short.description,
        url: window.location.href, // In a real app, this would be a direct link to the short
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop or browsers that don't support Web Share API
            await navigator.clipboard.writeText(shareData.url);
            toast({
                title: "Link Copied!",
                description: "The link to this short has been copied to your clipboard.",
            });
        }
    } catch (error) {
        console.error("Error sharing:", error);
        toast({
            variant: "destructive",
            title: "Could not share",
            description: "There was an error trying to share this short.",
        });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-white"/>
      </div>
    );
  }


  return (
    <div className="h-screen w-screen bg-black text-white relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="ghost"
          className="rounded-full bg-black/30 hover:bg-black/50"
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-bold drop-shadow-lg">Shorts</h1>
        {/* Placeholder for other icons like search */}
        <div className="w-10"></div>
      </header>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        orientation="vertical"
        className="w-full h-full"
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full -mt-0">
          {allShorts.map((short, index) => (
            <CarouselItem key={index} className="pt-0 h-full relative">
              <div className="w-full h-full" onClick={togglePlay}>
                <Image
                  src={short.imageUrl}
                  alt={short.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                  priority={index === 0}
                  data-ai-hint={short.imageHint}
                />
                
                {/* Overlay for better text readability and interaction area */}
                <div className="absolute inset-0"></div>

                {/* Play/Pause icon appears in center on toggle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
                    {!isPlaying && <Play className="w-20 h-20 text-white/70 drop-shadow-2xl" fill="white" />}
                </div>

                {/* Video Info and Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={short.avatarUrl} />
                        <AvatarFallback>{short.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-white truncate">@{short.userName}</p>
                    </div>
                    <p className="text-sm text-white/90 truncate">{short.description}</p>
                    <div className="flex items-center gap-2">
                        <Music className="w-4 h-4"/>
                        <p className="text-sm text-white/90 truncate">{short.audio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-5 ml-4">
                    <button onClick={() => toggleLike(short.id)} className="text-white flex flex-col items-center h-auto">
                        <Heart className={cn("w-8 h-8 transition-colors", likedStatus[short.id] ? "fill-red-500 text-red-500" : "text-white")} />
                        <span className="text-xs font-semibold mt-1">{formatCount(likeCounts[short.id] || 0)}</span>
                    </button>
                    <button className="text-white flex flex-col items-center h-auto">
                        <MessageCircle className="w-8 h-8" />
                        <span className="text-xs font-semibold mt-1">12k</span>
                    </button>
                    <button onClick={() => handleShare(short)} className="text-white flex flex-col items-center h-auto">
                        <Share2 className="w-8 h-8" />
                        <span className="text-xs font-semibold mt-1">Share</span>
                    </button>
                     <Avatar className="h-10 w-10 border-2 border-white animate-spin-slow">
                        <AvatarImage src={short.avatarUrl} />
                        <AvatarFallback>{short.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
