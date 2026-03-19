
'use client';

import {
  Home,
  Flame,
  MessageSquare,
  Lightbulb,
  Crown,
  Globe,
  Bell,
  Search,
  User,
  Settings,
  BarChart2,
  MapPin,
  Clock,
  Map as MapIcon,
  Leaf,
  HeartPulse,
  Briefcase,
  Plus,
  Trophy,
  BookOpen,
  List as ListIcon,
  Landmark,
  CheckCircle,
  Download,
  Users as UsersIcon,
  X,
  ChevronRight,
  Mic,
  SlidersHorizontal,
  PlaySquare,
  Award,
  Droplets,
  GraduationCap,
  ChevronLeft,
  Navigation,
  RefreshCcw,
  ExternalLink,
  Edit,
  Building2,
  Thermometer,
  Wind,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  Siren,
  Phone,
  Newspaper,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useMemo, createContext, useContext, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mainFooterNavLinks } from '@/lib/navigation';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useUser, useDoc } from '@/firebase';
import { collection, query, type DocumentData, orderBy, limit, doc } from 'firebase/firestore';
import staticLinks from '@/lib/web-links.json';
import { ScrollArea } from '@/components/ui/scroll-area';

// --- CONTEXT SETUP ---
interface MorePageContextType {
    getContentByType: (type: string) => DocumentData | undefined;
    setIsSearchOpen: (isOpen: boolean) => void;
    detectedDistrict: string | null;
}
const MorePageContext = createContext<MorePageContextType | null>(null);
const useMorePageContext = () => {
    const context = useContext(MorePageContext);
    if (!context) {
        throw new Error("useMorePageContext must be used within a MorePageProvider");
    }
    return context;
};

// --- DYNAMIC COMPONENTS ---
const BannerSection = ({ content }: { content?: DocumentData }) => {
    const bannerPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
    const bannerImages = useMemo(() => {
        if (content?.contentData) {
            try {
                const parsedData = JSON.parse(content.contentData);
                if (Array.isArray(parsedData) && parsedData.length > 0) {
                    return parsedData;
                }
            } catch (e) {
                console.error("Failed to parse Banner content", e);
            }
        }
        return PlaceHolderImages.filter((img) => img.id.startsWith('ad-hero')).slice(0, 5);
    }, [content]);

    return (
        <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[bannerPlugin.current]}
            onMouseEnter={bannerPlugin.current.stop}
            onMouseLeave={bannerPlugin.current.reset}
        >
            <CarouselContent>
                {bannerImages.map((image: any, index: number) => (
                    <CarouselItem key={image.id || index}>
                        <Image
                            src={image.imageUrl}
                            alt={image.description || 'Banner Image'}
                            width={600}
                            height={300}
                            className="rounded-lg object-cover w-full aspect-[2/1]"
                            data-ai-hint={image.imageHint}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

const NewsSection = () => {
    const router = useRouter();
    const firestore = useFirestore();

    const shortsQuery = useMemo(() => {
      if (!firestore) return null;
      return query(
        collection(firestore, 'shorts'),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
    }, [firestore]);

    const { data: shortsFromDb } = useCollection<any>(shortsQuery);
    
    const displayedShorts = useMemo(() => {
        const shortsSource = (shortsFromDb && shortsFromDb.length > 0) ? shortsFromDb : [];
        return shortsSource.map((short: any) => {
            const image = PlaceHolderImages.find((img) => img.id === short.imageId);
            return {
                ...short,
                imageUrl: image?.imageUrl || `https://picsum.photos/seed/${short.id}/300/500`,
                imageHint: image?.imageHint || 'video content',
            };
        });
    }, [shortsFromDb]);

    if (displayedShorts.length === 0) return null;

    return (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PlaySquare className="text-red-500" /> ज़रुरी ख़बरें
            </h2>
            <div className='flex items-center'>
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                    <Edit className="w-4 h-4 text-muted-foreground"/>
                </Button>
                <Button variant="link" onClick={() => router.push('/explore')}>और देखें</Button>
            </div>
          </div>
          <Carousel opts={{ align: 'start', loop: false }} className="w-full">
            <CarouselContent className="-ml-2">
              {displayedShorts.map((short: any, index: number) => (
                  <CarouselItem key={short.id || index} className="pl-4 basis-1/2 md:basis-1/3">
                    <Link href="/explore">
                      <Card className="overflow-hidden rounded-xl border-none">
                        <CardContent className="p-0 relative">
                          <Image
                            src={short.imageUrl}
                            alt={short.title}
                            width={300}
                            height={200}
                            className="object-cover w-full aspect-video rounded-xl"
                            data-ai-hint={short.imageHint || 'video'}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <h4 className="font-semibold text-white text-sm truncate">{short.title}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </section>
    );
};

// --- STATIC SUB-COMPONENTS ---
const WeatherCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter();
    const defaultData = { temp: '३२°C', humidity: '६५%', wind: '१२ km/h', sunrise: '५:४५ AM', sunset: '६:३० PM', aqi: '४५ (अच्छा)', aqiAdvice: 'बाहरी गतिविधियों के लिए उत्तम दिन', forecast: [ { icon: 'Sunrise', temp: '३२°' }, { icon: 'Cloud', temp: '३१°' }, { icon: 'CloudRain', temp: '२९°' } ] };
    const weatherData = useMemo(() => {
        if (content?.contentData) { try { return { ...defaultData, ...JSON.parse(content.contentData) }; } catch (e) { console.error(e); } }
        return defaultData;
    }, [content]);
    
    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"><Cloud className="text-blue-500" /> {content?.title || 'मौसम और पर्यावरण'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="w-4 h-4 text-muted-foreground"/></Button>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2"><Thermometer className="w-5 h-5 text-red-500" /><span>तापमान: {weatherData.temp}</span></div>
          <div className="flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500" /><span>आर्द्रता: {weatherData.humidity}</span></div>
          <div className="flex items-center gap-2"><Wind className="w-5 h-5 text-gray-500" /><span>हवा: {weatherData.wind}</span></div>
          <div className="flex items-center gap-2"><Sunrise className="w-5 h-5 text-orange-500" /><span>सूर्योदय: {weatherData.sunrise}</span></div>
          <div className="flex items-center gap-2"><Sunset className="w-5 h-5 text-orange-700" /><span>सूर्यास्त: {weatherData.sunset}</span></div>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
          <p className="font-semibold flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600"/>AQI: {weatherData.aqi}</p>
          <p className="text-xs text-muted-foreground">{weatherData.aqiAdvice}</p>
        </div>
      </CardContent>
    </Card>
)};

const EmergencyCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter();
    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg text-red-500"><Siren /> आपातकालीन सेवाएँ</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="w-4 h-4 text-muted-foreground"/></Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="destructive" size="sm" onClick={() => window.location.href='tel:100'}><Phone className="mr-2 h-4 w-4"/> पुलिस १००</Button>
        <Button variant="destructive" size="sm" onClick={() => window.location.href='tel:102'}><Phone className="mr-2 h-4 w-4"/> एम्बुलेंस १०२</Button>
        <Button variant="destructive" size="sm" onClick={() => window.location.href='tel:101'}><Phone className="mr-2 h-4 w-4"/> फायर १०१</Button>
        <Button variant="destructive" size="sm" onClick={() => window.location.href='tel:1090'}><Phone className="mr-2 h-4 w-4"/> महिला १०९०</Button>
      </CardContent>
    </Card>
)};

const LocalNewsCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter();
    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"><Newspaper /> स्थानीय समाचार</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="w-4 h-4 text-muted-foreground"/></Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>• कल से नगर निगम का विशेष स्वच्छता अभियान शुरू</p>
        <p>• आज रात १० बजे से सुबह ६ बजे तक बिजली बाधित</p>
        <Button variant="link" className="p-0 h-auto" onClick={() => router.push('/explore')}>और समाचार पढ़ें</Button>
      </CardContent>
    </Card>
)};

const WebLinksCard = ({ defaultTitle, content, icon: Icon, staticKey }: { defaultTitle: string; content?: DocumentData; icon: React.ElementType; staticKey?: keyof typeof staticLinks }) => {
    const router = useRouter();
    const { detectedDistrict } = useMorePageContext();

    const links = useMemo(() => {
        let dynamicLinks: any[] = [];
        if (content?.contentData) {
            try {
                const parsed = JSON.parse(content.contentData);
                dynamicLinks = Array.isArray(parsed) ? parsed : [];
            } catch (e) { console.error(e); }
        }
        const localLinks = staticKey ? (staticLinks as any)[staticKey] || [] : [];
        let all = [...localLinks, ...dynamicLinks];

        if (staticKey === 'district' && detectedDistrict) {
            // Browser-like search feel: filter the list by the detected district
            const filtered = all.filter((l: any) => l.label.toLowerCase().includes(detectedDistrict.toLowerCase()));
            return filtered.length > 0 ? filtered : all;
        }
        return all;
    }, [content, staticKey, detectedDistrict]);

    return (
        <Card className="overflow-hidden border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between bg-primary/5 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="text-primary" /> {content?.title || defaultTitle}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}>
                    <Edit className="w-4 h-4 text-muted-foreground"/>
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[300px] w-full px-4 pt-4">
                    <div className="grid grid-cols-1 gap-3 pb-6">
                        {links.length > 0 ? links.map((link: any, index: number) => (
                            <Button 
                                key={index} 
                                variant="outline" 
                                className="justify-between h-auto py-4 px-4 text-left group hover:border-primary hover:bg-primary/5 transition-all border-l-4 border-l-primary/30" 
                                onClick={() => window.open(link.url, '_blank')}
                            >
                                <div className="flex flex-col min-w-0">
                                    <span className="truncate font-bold text-primary group-hover:underline">{link.label}</span>
                                    <span className="text-[10px] text-muted-foreground truncate mt-1">{link.url}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 text-primary" />
                            </Button>
                        )) : <p className="text-sm text-muted-foreground italic text-center py-10">कोई लिंक उपलब्ध नहीं है।</p>}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-muted/30 flex justify-center">
                    <Link href="/library" className="w-full">
                        <Button variant="link" className="w-full text-primary font-semibold">डिजिटल लाइब्रेरी में सभी {links.length} लिंक्स खोजें</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

const GenericDataCard = ({ defaultTitle, content, icon: Icon }: { defaultTitle: string; content?: DocumentData; icon: React.ElementType }) => {
    const router = useRouter();
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg"><Icon /> {content?.title || defaultTitle}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}><Edit className="w-4 h-4 text-muted-foreground"/></Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                एडमिन पैनल से जानकारी जोड़ी जा सकती है।
            </CardContent>
        </Card>
    );
};

// --- MAIN PAGE ---
export default function MorePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { translations } = useLanguage();
  const { openModal: openVoiceModal } = useVoiceSearch();
  const { user } = useUser();
  const { deliveryAddress } = useCart();
  const firestore = useFirestore();

  const contentQuery = useMemo(() => firestore ? query(collection(firestore, 'content')) : null, [firestore]);
  const { data: allContent } = useCollection<DocumentData>(contentQuery);

  const userProfileRef = useMemo(() => user && firestore ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
  const { data: userProfile } = useDoc<DocumentData>(userProfileRef);

  // Automatic District Detection Logic
  const detectedDistrict = useMemo(() => {
    const text = ((deliveryAddress?.fullAddress || "") + " " + (userProfile?.district || "") + " " + (userProfile?.city || "")).toLowerCase();
    const dLinks = staticLinks.district || [];
    const match = dLinks.find(link => {
        const dName = link.label.split('(')[0].trim().toLowerCase();
        return text.includes(dName);
    });
    return match ? match.label.split('(')[0].trim() : "Buxar"; // Default to Buxar
  }, [deliveryAddress, userProfile]);

  const getContentByType = (type: string) => allContent?.find(c => c.type === type);
  const contextValue = { getContentByType, setIsSearchOpen, detectedDistrict };

  return (
    <MorePageContext.Provider value={contextValue}>
        <div className="bg-background text-foreground min-h-screen">
            <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
                {isSearchOpen ? (
                    <div className="flex items-center gap-2 w-full animate-in fade-in zoom-in-95">
                        <Button onClick={() => setIsSearchOpen(false)} size="icon" variant="ghost" className="rounded-full"><ChevronLeft/></Button>
                        <form className="relative flex-grow" onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${searchQuery}`); }}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                            <input type="text" placeholder="खोजें..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="w-full bg-input rounded-full pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" autoFocus/>
                            <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer" onClick={openVoiceModal}/>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <h1 className="text-lg font-bold">भारत सूचना</h1>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setIsSearchOpen(true)} size="icon" variant="ghost" className="rounded-full"><Search/></Button>
                            <Button onClick={() => router.push('/profile')} size="icon" variant="ghost" className="rounded-full"><User/></Button>
                        </div>
                    </>
                )}
            </header>

            <main className="p-4 space-y-6 pb-32">
                <Tabs defaultValue="my-place" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-auto bg-muted/50 p-1 rounded-xl">
                        <TabsTrigger value="my-place" className="text-[10px] sm:text-xs rounded-lg">मेरा स्थान</TabsTrigger>
                        <TabsTrigger value="district" className="text-[10px] sm:text-xs rounded-lg">जिला</TabsTrigger>
                        <TabsTrigger value="state" className="text-[10px] sm:text-xs rounded-lg">राज्य</TabsTrigger>
                        <TabsTrigger value="country" className="text-[10px] sm:text-xs rounded-lg">देश</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="my-place" className="mt-6 space-y-6 focus-visible:outline-none">
                        <BannerSection content={getContentByType('banner')} />
                        <NewsSection />
                        <WeatherCard content={getContentByType('मौसम')} />
                        <EmergencyCard content={getContentByType('आपातकालीन')} />
                        <LocalNewsCard content={getContentByType('स्थानीय समाचार')} />
                        <Card className="overflow-hidden"><CardContent className="p-0 bg-muted/20 flex items-center justify-center aspect-video text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                                <MapIcon className="w-8 h-8 opacity-20" />
                                <span className="text-xs font-medium">मानचित्र लोड हो रहा है...</span>
                            </div>
                        </CardContent></Card>
                        <GenericDataCard defaultTitle="स्थानीय आँकड़े" content={getContentByType('स्थानीय आँकड़े')} icon={BarChart2}/>
                    </TabsContent>

                    <TabsContent value="district" className="mt-6 space-y-6 focus-visible:outline-none">
                        {detectedDistrict && (
                            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 flex items-center justify-between animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                        <Navigation className="w-5 h-5 animate-pulse"/>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider">स्वचालित स्थान चयन</p>
                                        <p className="text-sm font-bold">{detectedDistrict} के आधिकारिक पोर्टल</p>
                                    </div>
                                </div>
                                <Link href="/library">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:bg-primary/10">बदलें</Button>
                                </Link>
                            </div>
                        )}
                        <WebLinksCard defaultTitle="जिला वेबसाइट्स" content={getContentByType('जिला वेब सूची')} icon={Globe} staticKey="district"/>
                        <GenericDataCard defaultTitle="जिला प्रशासन" content={getContentByType('जिला प्रशासन')} icon={Landmark}/>
                    </TabsContent>

                    <TabsContent value="state" className="mt-6 space-y-6 focus-visible:outline-none">
                        <WebLinksCard defaultTitle="राज्य पोर्टल्स" content={getContentByType('राज्य वेब सूची')} icon={Building2} staticKey="state"/>
                        <GenericDataCard defaultTitle="राज्य सरकार" content={getContentByType('राज्य सरकार')} icon={Landmark}/>
                    </TabsContent>

                    <TabsContent value="country" className="mt-6 space-y-6 focus-visible:outline-none">
                        <WebLinksCard defaultTitle="राष्ट्रीय सेवाएं" content={getContentByType('देश वेब सूची')} icon={Globe} staticKey="country"/>
                        <GenericDataCard defaultTitle="भारत तथ्य" content={getContentByType('भारत तथ्य')} icon={Award}/>
                    </TabsContent>
                </Tabs>
            </main>

            <FloatingActionButton />
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
                <div className="flex justify-around items-center p-2">
                    {mainFooterNavLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        if (link.isCentral) return (
                            <div key={index} className="-mt-8">
                                <Link href={link.href}>
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900">
                                        <link.icon className="w-8 h-8"/>
                                    </div>
                                </Link>
                            </div>
                        );
                        return (
                            <Link key={index} href={link.href} className={cn("flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md w-16", isActive ? 'text-primary' : 'text-muted-foreground')}>
                                <link.icon className="w-6 h-6"/><span className="text-[10px]">{(translations.home as any)[link.labelKey] || (translations.location as any)[link.labelKey] || ''}</span>
                            </Link>
                        );
                    })}
                </div>
            </footer>
        </div>
    </MorePageContext.Provider>
  );
}
