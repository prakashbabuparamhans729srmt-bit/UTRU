
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
  LayoutGrid,
  Mic,
  SlidersHorizontal,
  PlaySquare,
  Award,
  Droplets,
  GraduationCap,
  ChevronLeft,
  LocateFixed,
  Ruler,
  Footprints,
  Car,
  Waypoints,
  Bus,
  Banknote,
  Siren,
  Phone,
  Thermometer,
  Wind,
  Sunrise,
  Sunset,
  Cloud,
  CloudRain,
  CircleAlert,
  Newspaper,
  CalendarDays,
  Gavel,
  Sprout,
  Wallet,
  Building2,
  Scroll,
  Megaphone,
  BookUser,
  Medal,
  ThumbsUp,
  Edit,
  ExternalLink,
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

interface Short extends DocumentData {
    id: string;
    title: string;
    views: string;
    imageId: string;
}

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

    const { data: shortsFromDb } = useCollection<Short>(shortsQuery);
    
    const displayedShorts = useMemo(() => {
        const shortsSource = (shortsFromDb && shortsFromDb.length > 0) ? shortsFromDb : [];
        return shortsSource.map(short => {
            const image = PlaceHolderImages.find((img) => img.id === short.imageId);
            return {
                ...short,
                imageUrl: image?.imageUrl || `https://picsum.photos/seed/${short.id}/300/500`,
                imageHint: image?.imageHint || 'video content',
            };
        });
    }, [shortsFromDb]);

    if (displayedShorts.length === 0) {
        return null;
    }

      return (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PlaySquare className="text-red-500" />
              ज़रूरी ख़बरें
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
              {displayedShorts.map((short, index) => (
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


// --- STATIC SUB-COMPONENTS (CARDS) ---
const WeatherCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter();
    const defaultData = {
        temp: '३२°C', humidity: '६५%', wind: '१२ km/h', sunrise: '५:४५ AM', sunset: '६:३० PM', aqi: '४५ (अच्छा)',
        aqiAdvice: 'बाहरी गतिविधियों के लिए उत्तम दिन', forecast: [ { icon: 'Sunrise', temp: '३२°' }, { icon: 'Cloud', temp: '३१°' }, { icon: 'CloudRain', temp: '२९°' } ] };

    const weatherData = useMemo(() => {
        if (content?.contentData) { try { return { ...defaultData, ...JSON.parse(content.contentData) }; } catch (e) { console.error("Failed to parse Weather content", e); } }
        return defaultData;
    }, [content]);
    const iconMap: { [key: string]: React.ElementType } = { Sunrise, Cloud, CloudRain };

    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"> <Cloud className="text-blue-500" /> {content?.title || 'मौसम और पर्यावरण'} </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4 text-muted-foreground"/> </Button>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2"><Thermometer className="w-5 h-5 text-red-500" /><span>तापमान: {weatherData.temp}</span></div>
          <div className="flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500" /><span>आर्द्रता: {weatherData.humidity}</span></div>
          <div className="flex items-center gap-2"><Wind className="w-5 h-5 text-gray-500" /><span>हवा: {weatherData.wind}</span></div>
          <div className="flex items-center gap-2"><Sunrise className="w-5 h-5 text-orange-500" /><span>सूर्योदय: {weatherData.sunrise}</span></div>
          <div className="flex items-center gap-2"><Sunset className="w-5 h-5 text-orange-700" /><span>सूर्यास्त: {weatherData.sunset}</span></div>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div> <p className="font-semibold">वायु गुणवत्ता सूचकांक (AQI): {weatherData.aqi}</p> <p className="text-xs text-muted-foreground">सलाह: {weatherData.aqiAdvice}</p> </div>
        </div>
        <div>
          <p className="font-semibold mb-2">अगले ३ दिन का पूर्वानुमान:</p>
          <div className="flex justify-around text-center">
            {weatherData.forecast.map((f, i) => { const Icon = iconMap[f.icon] || Sunrise; return <div key={i}><Icon className="mx-auto text-yellow-500" /><span>{f.temp}</span></div> })}
          </div>
        </div>
      </CardContent>
    </Card>
)};

const EmergencyCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter(); const { toast } = useToast();
    const defaultData = { title: 'आपातकालीन सेवाएँ और सुरक्षा', helplines: [ { label: 'पुलिस - १००', number: '100' }, { label: 'एम्बुलेंस - १०२', number: '102' }, { label: 'अग्निशमन - १०१', number: '101' }, { label: 'महिला हेल्पलाइन - १०९०', number: '1090' }, { label: 'चाइल्ड हेल्पलाइन - १०९८', number: '1098' } ], facilities: [ { name: 'सिविल हॉस्पिटल (२ किमी)', phone: '०५२२-२२५५०००', mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Civil+Hospital+Lucknow' }, { name: 'मेडिकल कॉलेज (३.५ किमी) - २४x७ आपातकालीन', phone: null, mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=King+George+Medical+University' } ], police: { name: 'हज़रतगंज थाना (१.५ किमी)', phone: '०५२२-२२१०३००' } };
    const emergencyData = useMemo(() => { if (content?.contentData) { try { return { ...defaultData, ...JSON.parse(content.contentData) }; } catch (e) { console.error("Failed to parse Emergency content", e); } } return defaultData; }, [content]);

    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"> <Siren className="text-red-500" /> {content?.title || emergencyData.title} </CardTitle>
         <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4 text-muted-foreground"/> </Button>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold mb-2">एक क्लिक में कॉल:</h3>
          <div className="flex flex-wrap gap-2"> {emergencyData.helplines.map(h => (<Button key={h.number} variant="destructive" size="sm" onClick={() => window.location.href = `tel:${h.number}`}><Phone className="mr-2 h-4 w-4" /> {h.label}</Button>))} </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold">निकटतम स्वास्थ्य सुविधाएँ:</h3>
          {emergencyData.facilities.map((f, i) => ( <div key={i} className="mb-4 last:mb-0"> <p className="text-muted-foreground">• {f.name} {f.phone && `- ${f.phone}`}</p> <div className="flex gap-2 mt-2"> {f.mapsUrl && <Button variant="outline" size="sm" onClick={() => window.open(f.mapsUrl, '_blank')}><MapIcon className="mr-2 h-4 w-4" /> रूट देखें</Button>} {f.phone && <Button variant="outline" size="sm" onClick={() => window.location.href = `tel:${f.phone}`}><Phone className="mr-2 h-4 w-4" /> कॉल करें</Button>} </div> </div> ))}
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold">निकटतम पुलिस स्टेशन: {emergencyData.police.name}</h3>
          <p className="text-muted-foreground">📞: {emergencyData.police.phone}</p>
          <div className="mt-2"> <Button variant="destructive" className="w-full" onClick={() => toast({ title: 'SOS Alert Sent', description: 'Your location has been shared with emergency contacts.'})}><Siren className="mr-2 h-4 w-4" /> SOS अलर्ट भेजें</Button> </div>
        </div>
      </CardContent>
    </Card>
)};

const LocalNewsCard = ({ content }: { content?: DocumentData }) => {
    const router = useRouter();
    const defaultData = { title: 'स्थानीय समाचार और अपडेट्स', news: [ { type: 'urgent', text: 'कल से नगर निगम का विशेष स्वच्छता अभियान शुरू' }, { type: 'warning', text: 'आज रात १० बजे से सुबह ६ बजे तक पानी की आपूर्ति बाधित' }, { type: 'positive', text: 'मेट्रो का नया रूट अगले माह से शुरू, ५०,००० लोगों को लाभ' }, { type: 'event', text: '१५ अगस्त - स्वतंत्रता दिवस समारोह, पार्क में' } ] };
    const newsData = useMemo(() => { if (content?.contentData) { try { return { ...defaultData, ...JSON.parse(content.contentData) }; } catch (e) { console.error("Failed to parse News content", e); } } return defaultData; }, [content]);
    const iconMap: { [key: string]: React.ElementType } = { urgent: CircleAlert, warning: CircleAlert, positive: CheckCircle, event: CalendarDays };
    const colorMap: { [key: string]: string } = { urgent: 'text-red-500', warning: 'text-yellow-500', positive: 'text-green-500', event: 'text-blue-500' };

    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg"><Newspaper /> {content?.title || newsData.title}</CardTitle>
         <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4 text-muted-foreground"/> </Button>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {newsData.news.map((item, index) => {
            const Icon = iconMap[item.type] || CircleAlert; const color = colorMap[item.type] || 'text-gray-500';
            const boldTextMatch = item.text.match(/^(.*?):/); const boldText = boldTextMatch ? boldTextMatch[1] : ''; const regularText = boldTextMatch ? item.text.substring(boldTextMatch[0].length) : item.text;
            return ( <div key={index} className="flex items-start gap-2"> <Icon className={`${color} mt-1 shrink-0`} /> <p>{boldText && <b>{boldText}:</b>}{regularText}</p> </div> )
        })}
        <div className="flex gap-2 mt-2"> <Button variant="outline" size="sm" onClick={() => router.push('/explore')}>सभी समाचार देखें</Button> <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>अलर्ट प्राप्त करें</Button> </div>
      </CardContent>
    </Card>
)};

const MapCard = ({ onSearchClick }: { onSearchClick: () => void }) => {
    const router = useRouter(); const { toast } = useToast();
    return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg"><MapIcon /> इंटरएक्टिव नक्शा और स्थानीय सुविधाएँ</CardTitle>
             <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4 text-muted-foreground"/> </Button>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
                {['यातायात','दुकानें','रेस्तराँ','पेट्रोल पंप','सरकारी कार्यालय','अस्पताल'].map(label => <Button key={label} variant="secondary" size="sm" onClick={() => toast({title: 'Feature coming soon!'})}>{label}</Button>)}
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4"><p className="text-muted-foreground">गूगल मैप्स / ओपनस्ट्रीटमैप इंटीग्रेशन</p></div>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => navigator.geolocation.getCurrentPosition(pos => window.open(`https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`, '_blank'))}><LocateFixed className="w-4 h-4 mr-2" /> मेरी लोकेशन सेट करें</Button>
                <Button variant="outline" size="sm" onClick={onSearchClick}><Search className="w-4 h-4 mr-2" /> स्थान खोजें</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.google.com/maps', '_blank')}><Ruler className="w-4 h-4 mr-2" /> दूरी मापें</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.google.com/maps?q=directions&travelmode=walking', '_blank')}><Footprints className="w-4 h-4 mr-2" /> पैदल मार्ग</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.google.com/maps?q=directions&travelmode=driving', '_blank')}><Car className="w-4 h-4 mr-2" /> गाड़ी मार्ग</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://support.google.com/maps/answer/6291838', '_blank')}><Download className="w-4 h-4 mr-2" /> ऑफ़लाइन मैप डाउनलोड</Button>
            </div>
        </CardContent>
    </Card>
)};

const GenericDataCard = ({ defaultTitle, content, icon: Icon }: { defaultTitle: string; content?: DocumentData; icon: React.ElementType }) => {
    const router = useRouter();
    const data = useMemo(() => { if (content?.contentData) { try { return JSON.parse(content.contentData); } catch (e) { return { text: content.contentData }; } } return null; }, [content]);
    const cardTitle = content?.title || defaultTitle; const items = data?.items || []; const buttons = data?.buttons || [];

    const defaultCardContent = () => {
        switch (defaultTitle) {
            case 'स्थानीय जानकारी और आँकड़े': return ( <> <p className="flex items-center gap-2"><b><UsersIcon className="w-4 h-4 inline-block"/> जनसंख्या:</b> ३६ लाख (२०२३ अनुमान)</p> <p className="flex items-center gap-2"><b><Ruler className="w-4 h-4 inline-block"/> क्षेत्रफल:</b> ३५० वर्ग किमी</p> <p className="flex items-center gap-2"><b><GraduationCap className="w-4 h-4 inline-block"/> साक्षरता दर:</b> ८४%</p> </> );
            case 'जिला प्रशासन और अधिकारी': return <p><b>🎖️ जिला मजिस्ट्रेट (DM):</b> श्री राजेश कुमार, IAS</p>;
            default: return <p className="text-muted-foreground">कंटेंट एडमिन पैनल से जोड़ा जा सकता है।</p>;
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg"><Icon /> {cardTitle}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4 text-muted-foreground"/> </Button>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                {items.length > 0 ? ( <ul className="list-disc list-inside text-muted-foreground"> {items.map((item: string, index: number) => <li key={index}>{item}</li>)} </ul>
                ) : data?.text ? ( <p>{data.text}</p>
                ) : ( defaultCardContent() )}
                {buttons.length > 0 && ( <div className="flex gap-2 mt-2"> {buttons.map((btn: {label: string, url: string}, index: number) => ( <Button key={index} variant="outline" size="sm" onClick={() => window.open(btn.url, '_blank')}>{btn.label}</Button> ))} </div> )}
            </CardContent>
        </Card>
    );
};

const WebLinksCard = ({ defaultTitle, content, icon: Icon, staticKey }: { defaultTitle: string; content?: DocumentData; icon: React.ElementType; staticKey?: keyof typeof staticLinks }) => {
    const router = useRouter();
    const { detectedDistrict } = useMorePageContext();

    const links = useMemo(() => {
        let dynamicLinks: any[] = [];
        if (content?.contentData) {
            try {
                const parsed = JSON.parse(content.contentData);
                dynamicLinks = Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                console.error("Failed to parse WebLinks content", e);
            }
        }
        const localLinks = staticKey ? (staticLinks as any)[staticKey] || [] : [];
        let all = [...localLinks, ...dynamicLinks];

        // Apply district filtering if it's the district tab
        if (staticKey === 'district' && detectedDistrict) {
            const filtered = all.filter((l: any) => l.label.toLowerCase().includes(detectedDistrict.toLowerCase()));
            return filtered.length > 0 ? filtered : all;
        }
        return all;
    }, [content, staticKey, detectedDistrict]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="text-primary" /> {content?.title || defaultTitle}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin/editor')}>
                    <Edit className="w-4 h-4 text-muted-foreground"/>
                </Button>
            </CardHeader>
            <CardContent className="space-y-2">
                {links.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {links.slice(0, 10).map((link: { label: string, url: string }, index: number) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="justify-between h-auto py-3 px-4 text-left"
                                onClick={() => window.open(link.url, '_blank')}
                            >
                                <span className="truncate mr-2">{link.label}</span>
                                <ExternalLink className="w-4 h-4 shrink-0 opacity-50" />
                            </Button>
                        ))}
                        {links.length > 10 && (
                            <Link href="/library" className="col-span-full">
                                <Button variant="link" className="w-full text-primary">बाकी {links.length - 10} और लिंक्स डिजिटल लाइब्रेरी में देखें...</Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground italic">कोई वेबसाइट लिंक उपलब्ध नहीं हैं। एडमिन पैनल से जोड़ें।</p>
                )}
            </CardContent>
        </Card>
    );
};

// --- TAB PANELS ---
const Tab1_MyPlace = () => {
    const { getContentByType, setIsSearchOpen } = useMorePageContext();
    const router = useRouter();
    return (
        <div className="space-y-6 p-1">
            <div className="relative">
                <BannerSection content={getContentByType('banner')} />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10" onClick={() => router.push('/admin/editor')}>
                    <Edit className="w-4 h-4"/>
                </Button>
            </div>
            <NewsSection />
            <WeatherCard content={getContentByType('मौसम')} />
            <EmergencyCard content={getContentByType('आपातकालीन')} />
            <LocalNewsCard content={getContentByType('स्थानीय समाचार')} />
            <MapCard onSearchClick={() => setIsSearchOpen(true)} />
            <GenericDataCard defaultTitle="स्थानीय जानकारी और आँकड़े" content={getContentByType('स्थानीय आँकड़े')} icon={BarChart2} />
        </div>
    );
};

const Tab2_District = () => {
    const { getContentByType } = useMorePageContext();
    const router = useRouter();
    return (
        <div className="space-y-6 p-1">
            <div className="relative"> <BannerSection content={getContentByType('banner')} /> <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4"/> </Button> </div>
            <NewsSection />
            <WebLinksCard defaultTitle="जिला निर्देशिका (वेबसाइट्स)" content={getContentByType('जिला वेब सूची')} icon={Globe} staticKey="district" />
            <GenericDataCard defaultTitle="जिला प्रशासन और अधिकारी" content={getContentByType('जिला प्रशासन')} icon={Landmark} />
            <GenericDataCard defaultTitle="जिला सांख्यिकी और आँकड़े" content={getContentByType('जिला आँकड़े')} icon={BarChart2} />
            <GenericDataCard defaultTitle="स्वास्थ्य सेवाएँ और अस्पताल" content={getContentByType('जिला स्वास्थ्य')} icon={HeartPulse} />
            <GenericDataCard defaultTitle="शिक्षा और शैक्षणिक संस्थान" content={getContentByType('जिला शिक्षा')} icon={GraduationCap} />
            <GenericDataCard defaultTitle="परिवहन और संपर्क" content={getContentByType('जिला परिवहन')} icon={Waypoints} />
            <GenericDataCard defaultTitle="जिला योजनाएँ और लाभ" content={getContentByType('जिला योजनाएँ')} icon={Banknote} />
            <GenericDataCard defaultTitle="आगामी जिला कार्यक्रम और त्योहार" content={getContentByType('जिला कार्यक्रम')} icon={CalendarDays} />
        </div>
    );
};

const Tab3_State = () => {
    const { getContentByType } = useMorePageContext();
    const router = useRouter();
    return (
        <div className="space-y-6 p-1">
            <div className="relative"> <BannerSection content={getContentByType('banner')} /> <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4"/> </Button> </div>
            <NewsSection />
            <WebLinksCard defaultTitle="राज्य सरकारी वेबसाइट्स" content={getContentByType('राज्य वेब सूची')} icon={Globe} staticKey="state" />
            <GenericDataCard defaultTitle="राज्य सरकार और नेतृत्व" content={getContentByType('राज्य सरकार')} icon={Landmark} />
            <GenericDataCard defaultTitle="राज्य का बजट और अर्थव्यवस्था" content={getContentByType('राज्य बजट')} icon={Wallet} />
            <GenericDataCard defaultTitle="राज्य नीतियाँ और कानून" content={getContentByType('राज्य नीतियाँ')} icon={Gavel} />
            <GenericDataCard defaultTitle="राज्यस्तरीय परीक्षाएँ और रिजल्ट" content={getContentByType('राज्य परीक्षाएँ')} icon={Briefcase} />
            <GenericDataCard defaultTitle="राज्य परिवहन और यात्रा" content={getContentByType('राज्य परिवहन')} icon={Bus} />
            <GenericDataCard defaultTitle="कृषि और मौसम पूर्वानुमान" content={getContentByType('राज्य कृषि')} icon={Sprout} />
            <GenericDataCard defaultTitle="स्वास्थ्य और चिकित्सा सुविधाएँ" content={getContentByType('राज्य स्वास्थ्य')} icon={HeartPulse} />
        </div>
    );
};

const Tab4_Country = () => {
    const { getContentByType } = useMorePageContext();
    const router = useRouter();
    return (
        <div className="space-y-6 p-1">
            <div className="relative"> <BannerSection content={getContentByType('banner')} /> <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full z-10" onClick={() => router.push('/admin/editor')}> <Edit className="w-4 h-4"/> </Button> </div>
            <NewsSection />
            <WebLinksCard defaultTitle="महत्वपूर्ण राष्ट्रीय पोर्टल्स" content={getContentByType('देश वेब सूची')} icon={Globe} staticKey="country" />
            <GenericDataCard defaultTitle="राष्ट्रीय प्रतीक और गान" content={getContentByType('राष्ट्रीय प्रतीक')} icon={Award} />
            <GenericDataCard defaultTitle="केंद्र सरकार और मंत्रालय" content={getContentByType('केंद्र सरकार')} icon={Building2} />
            <GenericDataCard defaultTitle="संविधान और नागरिक अधिकार" content={getContentByType('संविधान')} icon={Scroll} />
            <GenericDataCard defaultTitle="राष्ट्रीय योजनाएँ और कल्याण कार्यक्रम" content={getContentByType('राष्ट्रीय योजनाएँ')} icon={Megaphone} />
            <GenericDataCard defaultTitle="पासपोर्ट, आधार, पैन और दस्तावेज़ सेवाएँ" content={getContentByType('दस्तावेज़ सेवाएँ')} icon={BookUser} />
            <GenericDataCard defaultTitle="राष्ट्रीय आपातकाल और आपदा प्रबंधन" content={getContentByType('राष्ट्रीय आपातकाल')} icon={Siren} />
            <GenericDataCard defaultTitle="भारत के बारे में तथ्य और उपलब्धियाँ" content={getContentByType('भारत तथ्य')} icon={Medal} />
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
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
  const contentQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'content'));
  }, [firestore]);
  const { data: allContent } = useCollection<DocumentData>(contentQuery);

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile } = useDoc<DocumentData>(userProfileRef);

  const [detectedDistrict, setDetectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    const addressText = (
        (deliveryAddress?.fullAddress || "") + " " + 
        (userProfile?.location || "") + " " + 
        (userProfile?.state || "") + " " +
        (userProfile?.city || "") + " " +
        (userProfile?.district || "")
    ).toLowerCase();
    
    let foundMatch = false;
    if (addressText.trim()) {
        const dLinks = staticLinks.district || [];
        const match = dLinks.find(link => {
            const districtName = link.label.split('(')[0].trim().toLowerCase();
            return addressText.includes(districtName);
        });
        
        if (match) {
            setDetectedDistrict(match.label.split('(')[0].trim());
            foundMatch = true;
        }
    }

    if (!foundMatch) {
        setDetectedDistrict("Buxar");
    }
  }, [deliveryAddress, userProfile]);

  const getContentByType = (type: string) => allContent?.find(c => c.type === type);
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const contextValue = { getContentByType, setIsSearchOpen, detectedDistrict };

  return (
    <MorePageContext.Provider value={contextValue}>
        <div className="bg-background text-foreground min-h-screen">
        <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
            {isSearchOpen ? (
            <div className="flex items-center gap-2 w-full">
                <Button onClick={() => setIsSearchOpen(false)} size="icon" variant="ghost" className="rounded-full"> <ChevronLeft /> </Button>
                <form onSubmit={handleSearchSubmit} className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text" placeholder="खोजें..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-input rounded-full pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" autoFocus
                />
                <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer" onClick={openVoiceModal} />
                </form>
            </div>
            ) : (
            <>
                <div className='flex items-center gap-4'> <h1 className="text-lg font-semibold">🇮🇳 भारत सूचना</h1> </div>
                <div className='flex items-center gap-2'>
                <Button onClick={() => setIsSearchOpen(true)} size="icon" variant="ghost" className="rounded-full"> <Search /> </Button>
                <Button onClick={() => router.push('/profile')} size="icon" variant="ghost" className="rounded-full"> <User /> </Button>
                </div>
            </>
            )}
        </header>

            <main className="p-4 space-y-6 pb-32">
                <Tabs defaultValue="my-place" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-auto">
                        <TabsTrigger value="my-place" className="text-xs sm:text-sm">मेरा स्थान</TabsTrigger>
                        <TabsTrigger value="district" className="text-xs sm:text-sm">जिला</TabsTrigger>
                        <TabsTrigger value="state" className="text-xs sm:text-sm">राज्य</TabsTrigger>
                        <TabsTrigger value="country" className="text-xs sm:text-sm">देश</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-place" className="mt-6"> <Tab1_MyPlace /> </TabsContent>
                    <TabsContent value="district" className="mt-6"> <Tab2_District /> </TabsContent>
                    <TabsContent value="state" className="mt-6"> <Tab3_State /> </TabsContent>
                    <TabsContent value="country" className="mt-6"> <Tab4_Country /> </TabsContent>
                </Tabs>
            </main>
            <FloatingActionButton />
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
                <div className="flex justify-around items-center p-2">
                {mainFooterNavLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    if (link.isCentral) {
                        return (
                        <div key={index} className="-mt-8">
                            <Link href={link.href}>
                                <div className={cn("flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900",)}>
                                <link.icon className="w-8 h-8" />
                                </div>
                            </Link>
                        </div>
                        );
                    }
                    return (
                        <Link key={index} href={link.href} className={cn( "flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md transition-colors w-16", isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary' )}>
                        <link.icon className="w-6 h-6" />
                        <span className="text-xs">
                            {(translations.home as any)[link.labelKey] || (translations.location as any)[link.labelKey] || ''}
                            </span>
                        </Link>
                    )
                })}
                </div>
            </footer>
        </div>
    </MorePageContext.Provider>
  );
}
