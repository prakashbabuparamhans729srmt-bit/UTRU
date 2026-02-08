'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  Video,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Autoplay from 'embla-carousel-autoplay';
import { shortsData } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, type DocumentData } from 'firebase/firestore';


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

interface Short extends DocumentData {
    id: string;
    title: string;
    views: string;
    imageId: string;
    userId?: string;
    createdAt?: { seconds: number; nanoseconds: number; };
}

export default function ExplorePage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedStatus, setLikedStatus] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  
  const firestore = useFirestore();

  const shortsQuery = useMemo(() => {
    if (!firestore) return null;
    // Remove orderBy from the query to avoid needing a Firestore index
    return query(collection(firestore, 'shorts'));
  }, [firestore]);

  const { data: shortsFromDb, loading: isLoading, error } = useCollection<Short>(shortsQuery);
  
  const allShorts = useMemo(() => {
    const dbShorts = shortsFromDb || [];

    // Sort on the client-side to avoid needing a Firestore index
    dbShorts.sort((a, b) => {
        const aSeconds = a.createdAt?.seconds ?? 0;
        const bSeconds = b.createdAt?.seconds ?? 0;
        if (aSeconds !== bSeconds) {
            return bSeconds - aSeconds;
        }
        const aNanos = a.createdAt?.nanoseconds ?? 0;
        const bNanos = b.createdAt?.nanoseconds ?? 0;
        return bNanos - aNanos;
    });
    
    const combined = [...dbShorts, ...shortsData];
    
    return combined.map((short, index) => {
        const image = PlaceHolderImages.find((img) => img.id === short.imageId);
        const viewsNumber = parseFloat(short.views) * 1000000 || Math.floor(Math.random() * 5000000);
        const initialLikes = Math.floor(viewsNumber / 10 + Math.random() * 10000);

        return {
            ...short,
            id: short.id, 
            imageUrl: image?.imageUrl || `https://picsum.photos/seed/${short.id}/900/1600`,
            imageHint: image?.imageHint || 'video content',
            userName: short.userId ? `User-${short.userId.substring(0,4)}` : `Creator${index + 1}`,
            avatarUrl: `https://picsum.photos/seed/avatar${short.id}/40/40`,
            description: `${short.title} - Check this out! #cool #video #fyp`,
            audio: `Original Audio - ${short.userId ? `User-${short.userId.substring(0,4)}` : `Creator${index + 1}`}`,
            initialLikes: initialLikes
        };
    });
  }, [shortsFromDb]);

  useEffect(() => {
    if (allShorts.length > 0) {
      const initialCounts = allShorts.reduce((acc, short) => {
          acc[short.id] = short.initialLikes;
          return acc;
      }, {} as Record<string, number>);
      setLikeCounts(initialCounts);
    }
  }, [allShorts]);

  // Using autoplay to simulate video playback and auto-advancing shorts
  const plugin = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    if (!api) return;
    
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
        url: window.location.href, 
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
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

  if (error) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white p-4">
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
            <div className="w-10"></div>
          </header>
          <Video className="w-24 h-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">Error Loading Shorts</h2>
          <p className="text-muted-foreground text-center">Could not load videos. Please try again later.</p>
           <p className="text-xs text-red-500 mt-4 max-w-sm text-center">{error.message}</p>
      </div>
    );
  }

  if (!isLoading && allShorts.length === 0) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white p-4">
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
            <div className="w-10"></div>
          </header>
          <Video className="w-24 h-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">No Shorts Yet</h2>
          <p className="text-muted-foreground text-center">Be the first one to add a short video!</p>
           <Button onClick={() => router.push('/add-short')} className="mt-6">
              Add a Short Video
            </Button>
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
            <CarouselItem key={short.id} className="pt-0 h-full relative">
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
                
                <div className="absolute inset-0"></div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
                    {!isPlaying && <Play className="w-20 h-20 text-white/70 drop-shadow-2xl" fill="white" />}
                </div>

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
