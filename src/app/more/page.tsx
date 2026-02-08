
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
  Train,
  Bus,
  Plane,
  TramFront,
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
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { shortsData, mainFooterNavLinks } from '@/lib/navigation';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const WeatherCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Cloud className="text-blue-500" />
          मौसम और पर्यावरण
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2"><Thermometer className="w-5 h-5 text-red-500" /><span>तापमान: ३२°C</span></div>
          <div className="flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500" /><span>आर्द्रता: ६५%</span></div>
          <div className="flex items-center gap-2"><Wind className="w-5 h-5 text-gray-500" /><span>हवा: १२ km/h</span></div>
          <div className="flex items-center gap-2"><Sunrise className="w-5 h-5 text-orange-500" /><span>सूर्योदय: ५:४५ AM</span></div>
          <div className="flex items-center gap-2"><Sunset className="w-5 h-5 text-orange-700" /><span>सूर्यास्त: ६:३० PM</span></div>
        </div>
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">वायु गुणवत्ता सूचकांक (AQI): ४५ (अच्छा)</p>
            <p className="text-xs text-muted-foreground">सलाह: बाहरी गतिविधियों के लिए उत्तम दिन</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">अगले ३ दिन का पूर्वानुमान:</p>
          <div className="flex justify-around text-center">
            <div><Sunrise className="mx-auto text-yellow-500" /><span>३२°</span></div>
            <div><Cloud className="mx-auto text-gray-400" /><span>३१°</span></div>
            <div><CloudRain className="mx-auto text-blue-400" /><span>२९°</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
);

const EmergencyCard = () => {
    const { toast } = useToast();
    return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Siren className="text-red-500" />
          आपातकालीन सेवाएँ और सुरक्षा
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold mb-2">एक क्लिक में कॉल:</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="destructive" size="sm" onClick={() => window.location.href = 'tel:100'}><Phone className="mr-2 h-4 w-4" /> पुलिस - १००</Button>
            <Button variant="destructive" size="sm" onClick={() => window.location.href = 'tel:102'}><Phone className="mr-2 h-4 w-4" /> एम्बुलेंस - १०२</Button>
            <Button variant="destructive" size="sm" onClick={() => window.location.href = 'tel:101'}><Phone className="mr-2 h-4 w-4" /> अग्निशमन - १०१</Button>
            <Button variant="destructive" size="sm" onClick={() => window.location.href = 'tel:1090'}><Phone className="mr-2 h-4 w-4" /> महिला हेल्पलाइन - १०९०</Button>
            <Button variant="destructive" size="sm" onClick={() => window.location.href = 'tel:1098'}><Phone className="mr-2 h-4 w-4" /> चाइल्ड हेल्पलाइन - १०९८</Button>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold">निकटतम स्वास्थ्य सुविधाएँ:</h3>
          <p className="text-muted-foreground">• सिविल हॉस्पिटल (२ किमी) - ०५२२-२२५५०००</p>
          <p className="text-muted-foreground">• मेडिकल कॉलेज (३.५ किमी) - २४x७ आपातकालीन</p>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Civil+Hospital+Lucknow', '_blank')}><MapIcon className="mr-2 h-4 w-4" /> रूट देखें</Button>
            <Button variant="outline" size="sm" onClick={() => window.location.href = 'tel:05222255000'}><Phone className="mr-2 h-4 w-4" /> कॉल करें</Button>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold">निकटतम पुलिस स्टेशन: हज़रतगंज थाना (१.५ किमी)</h3>
          <p className="text-muted-foreground">📞: ०५२२-२२१०३००</p>
          <div className="mt-2">
            <Button variant="destructive" className="w-full" onClick={() => toast({ title: 'SOS Alert Sent', description: 'Your location has been shared with emergency contacts.'})}><Siren className="mr-2 h-4 w-4" /> SOS अलर्ट भेजें</Button>
          </div>
        </div>
      </CardContent>
    </Card>
)};

const LocalNewsCard = () => {
    const router = useRouter();
    return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Newspaper /> स्थानीय समाचार और अपडेट्स</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-start gap-2"><CircleAlert className="text-red-500 mt-1 shrink-0" /><p><b>जरूरी सूचना:</b> कल से नगर निगम का विशेष स्वच्छता अभियान शुरू</p></div>
        <div className="flex items-start gap-2"><CircleAlert className="text-yellow-500 mt-1 shrink-0" /><p><b>चेतावनी:</b> आज रात १० बजे से सुबह ६ बजे तक पानी की आपूर्ति बाधित</p></div>
        <div className="flex items-start gap-2"><CheckCircle className="text-green-500 mt-1 shrink-0" /><p><b>सकारात्मक:</b> मेट्रो का नया रूट अगले माह से शुरू, ५०,००० लोगों को लाभ</p></div>
        <div className="flex items-start gap-2"><CalendarDays className="text-blue-500 mt-1 shrink-0" /><p><b>आगामी कार्यक्रम:</b> १५ अगस्त - स्वतंत्रता दिवस समारोह, पार्क में</p></div>
        <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/explore')}>सभी समाचार देखें</Button>
            <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>अलर्ट प्राप्त करें</Button>
        </div>
      </CardContent>
    </Card>
)};

const MapCard = ({ onSearchClick }: { onSearchClick: () => void }) => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><MapIcon /> इंटरएक्टिव नक्शा और स्थानीय सुविधाएँ</CardTitle></CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="secondary" size="sm">यातायात</Button>
                <Button variant="secondary" size="sm">दुकानें</Button>
                <Button variant="secondary" size="sm">रेस्तराँ</Button>
                <Button variant="secondary" size="sm">पेट्रोल पंप</Button>
                <Button variant="secondary" size="sm">सरकारी कार्यालय</Button>
                <Button variant="secondary" size="sm">अस्पताल</Button>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <p className="text-muted-foreground">गूगल मैप्स / ओपनस्ट्रीटमैप इंटीग्रेशन</p>
            </div>
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
);

const LocalStatsCard = () => {
    const { toast } = useToast();
    return (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><BarChart2 /> स्थानीय जानकारी और आँकड़े</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <p className="flex items-center gap-2"><b><UsersIcon className="w-4 h-4 inline-block"/> जनसंख्या:</b> ३६ लाख (२०२३ अनुमान)</p>
            <p className="flex items-center gap-2"><b><Ruler className="w-4 h-4 inline-block"/> क्षेत्रफल:</b> ३५० वर्ग किमी</p>
            <p className="flex items-center gap-2"><b><GraduationCap className="w-4 h-4 inline-block"/> साक्षरता दर:</b> ८४%</p>
            <p className="flex items-center gap-2"><b><UsersIcon className="w-4 h-4 inline-block"/> लिंगानुपात:</b> ९२० महिलाएँ प्रति १००० पुरुष</p>
            <p className="flex items-center gap-2"><b><Briefcase className="w-4 h-4 inline-block"/> प्रमुख उद्योग:</b> सूचना प्रौद्योगिकी, हस्तशिल्प, पर्यटन</p>
            <p className="flex items-center gap-2"><b><Building2 className="w-4 h-4 inline-block"/> स्थानीय प्रशासन:</b> लखनऊ नगर निगम, जिला प्रशासन</p>
            <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>विस्तृत आँकड़े देखें</Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>रिपोर्ट डाउनलोड</Button>
            </div>
        </CardContent>
    </Card>
)};

const DistrictAdminCard = () => {
    const { toast } = useToast();
    return (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Landmark /> जिला प्रशासन और अधिकारी</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div>
                <p><b>🎖️ जिला मजिस्ट्रेट (DM):</b> श्री राजेश कुमार, IAS</p>
                <p className="text-muted-foreground">📞: ०५२२-२२१०२०१ | ✉️: dm-lucknow@up.gov.in</p>
            </div>
            <div>
                <p><b>🚓 पुलिस अधीक्षक (SP):</b> श्रीमती प्रिया शर्मा, IPS</p>
                <p className="text-muted-foreground">📞: ०५२२-२२१०३०२ | <Button variant="link" className="p-0 h-auto" onClick={() => toast({ title: 'Feature coming soon!' })}>अपराध रिपोर्ट ऑनलाइन दर्ज करें</Button></p>
            </div>
            <div className="border-t pt-3">
                <p className="font-semibold">अन्य प्रमुख अधिकारी:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>जिला विकास अधिकारी (DDO)</li>
                    <li>मुख्य चिकित्सा अधिकारी (CMO)</li>
                    <li>जिला शिक्षा अधिकारी (DEO)</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({ title: 'Feature coming soon!' })}>सभी अधिकारियों की सूची</Button>
            </div>
        </CardContent>
    </Card>
)};

const DistrictStatsCard = () => {
    const { toast } = useToast();
    return (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><BarChart2 /> जिला सांख्यिकी और आँकड़े</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <p><b>📊 जनसंख्या (२०२३):</b> ४८ लाख</p>
                <p className="text-muted-foreground">🟢 शहरी: ३६ लाख (७५%) | 🟡 ग्रामीण: १२ लाख (२५%)</p>
            </div>
            <div>
                <p><b>📚 शिक्षा:</b></p>
                <p className="text-muted-foreground">साक्षरता दर: ८४.२% | विद्यालय: २,५००+ | कॉलेज: १२०+ | विश्वविद्यालय: ८+</p>
            </div>
            <div>
                <p><b>👨‍👩‍👧‍👦 जनसांख्यिकी:</b></p>
                <p className="text-muted-foreground">लिंगानुपात: ९२० | बाल लिंगानुपात: ९१० | जनसंख्या घनत्व: १,८००/वर्ग किमी</p>
            </div>
             <div>
                <p><b>💼 आर्थिक सूचक:</b></p>
                <p className="text-muted-foreground">प्रति व्यक्ति आय: ₹१,४५,०००/वर्ष | बेरोजगारी दर: ६.२%</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({ title: 'Feature coming soon!' })}>विस्तृत आर्थिक रिपोर्ट</Button>
            </div>
        </CardContent>
    </Card>
)};

const DistrictHealthCard = () => {
    const { toast } = useToast();
    return(
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><HeartPulse /> स्वास्थ्य सेवाएँ और अस्पताल</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold">सरकारी अस्पताल:</h3>
                <ul className="list-decimal list-inside text-muted-foreground">
                    <li>राजकीय चिकित्सा महाविद्यालय (२०००+ बेड)</li>
                    <li>सिविल हॉस्पिटल (५०० बेड)</li>
                    <li>बाल चिकित्सा अस्पताल (३०० बेड)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">विशेष चिकित्सा सुविधाएँ:</h3>
                <p className="text-muted-foreground">• हृदय रोग केंद्र • कैंसर अस्पताल • आयुष्मान भारत योजना हॉस्पिटल</p>
            </div>
             <div>
                <h3 className="font-semibold">टीकाकरण और परीक्षण:</h3>
                <p className="text-muted-foreground">💉 टीकाकरण केंद्र: १५०+ (<span className='text-primary underline cursor-pointer' onClick={() => window.open('https://www.google.com/maps/search/vaccination+center', '_blank')}>📍 निकटतम खोजें</span>)</p>
                <p className="text-muted-foreground">🧪 COVID-19 टेस्टिंग सेंटर: २५+</p>
            </div>
             <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>सभी अस्पताल देखें</Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>अपॉइंटमेंट बुक करें</Button>
            </div>
        </CardContent>
    </Card>
)};

const DistrictEducationCard = () => {
    const { toast } = useToast();
    return(
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><GraduationCap /> शिक्षा और शैक्षणिक संस्थान</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
             <div>
                <h3 className="font-semibold">प्रमुख शैक्षणिक संस्थान:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>लखनऊ विश्वविद्यालय (१९२१)</li>
                    <li>IIM लखनऊ</li>
                    <li>केजीएमयू (चिकित्सा विश्वविद्यालय)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">शिक्षा योजनाएँ:</h3>
                <p className="text-muted-foreground">• छात्रवृत्ति योजना • मुफ़्त पाठ्यपुस्तक • साइकिल वितरण</p>
                 <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>आवेदन करें</Button>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>योग्यता जाँचें</Button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold">प्रतियोगी परीक्षा केंद्र:</h3>
                <p className="text-muted-foreground">• UPSC/IAS कोचिंग • बैंकिंग परीक्षा • SSC कोचिंग</p>
            </div>
        </CardContent>
    </Card>
)};

const DistrictTransportCard = () => (
     <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Waypoints /> परिवहन और संपर्क</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold flex items-center gap-2"><Train/> रेलवे स्टेशन: लखनऊ जंक्शन</h3>
                <p className="text-muted-foreground">🚅 वंदे भारत, शताब्दी, राजधानी एक्सप्रेस</p>
                <div className="flex gap-2 mt-1">
                    <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://www.irctc.co.in/', '_blank')}>ट्रेन शेड्यूल</Button>
                    <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://www.irctc.co.in/', '_blank')}>टिकट बुकिंग</Button>
                </div>
            </div>
             <div>
                <h3 className="font-semibold flex items-center gap-2"><Bus/> बस स्टेशन: अलीगंज आईएसबीटी, चारबाग बस स्टेशन</h3>
                <p className="text-muted-foreground">🚍 UPSRTC बसें: सभी जिलों से कनेक्टिविटी</p>
            </div>
            <div>
                <h3 className="font-semibold flex items-center gap-2"><Plane/> हवाई अड्डा: चौधरी चरण सिंह अंतर्राष्ट्रीय हवाई अड्डा</h3>
                <p className="text-muted-foreground">🛫 घरेलू: दिल्ली, मुंबई, बैंगलोर | 🛬 अंतर्राष्ट्रीय: दुबई, शारजाह</p>
            </div>
             <div>
                <h3 className="font-semibold flex items-center gap-2"><TramFront/> मेट्रो रेल: २ लाइन (२३ स्टेशन)</h3>
                <div className="flex gap-2 mt-1">
                    <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://www.lmrcl.com/', '_blank')}>मेट्रो मैप</Button>
                    <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://www.lmrcl.com/passenger/value-added-services', '_blank')}>स्मार्ट कार्ड रिचार्ज</Button>
                </div>
            </div>
        </CardContent>
    </Card>
);

const DistrictSchemesCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Banknote /> जिला योजनाएँ और लाभ</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold">चल रही योजनाएँ:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>प्रधानमंत्री आवास योजना (२५,०००+ लाभार्थी)</li>
                    <li>उज्ज्वला योजना (मुफ़्त गैस कनेक्शन)</li>
                    <li>किसान सम्मान निधि (प्रति किसान ₹६,०००/वर्ष)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">आवेदन प्रक्रिया:</h3>
                 <div className="flex flex-wrap gap-2 mt-1">
                    <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>फॉर्म डाउनलोड</Button>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>योग्यता जाँचें</Button>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>ऑनलाइन आवेदन करें</Button>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>आवेदन स्थिति जाँचें</Button>
                </div>
            </div>
             <div>
                <h3 className="font-semibold">जिला सेवा केंद्र: ५०+ (<span className='text-primary underline cursor-pointer' onClick={() => window.open('https://www.google.com/maps/search/district+service+center', '_blank')}>📍 निकटतम खोजें</span>)</h3>
                <p className="text-muted-foreground">🕒 समय: सोम-शनि, ९:०० AM - ५:०० PM</p>
            </div>
        </CardContent>
    </Card>
);

const DistrictEventsCard = () => {
    const { toast } = useToast();
    return (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><CalendarDays /> आगामी जिला कार्यक्रम और त्योहार</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold">अगले ७ दिन:</h3>
                 <ul className="list-disc list-inside text-muted-foreground">
                    <li>१५ अगस्त: स्वतंत्रता दिवस समारोह, जिला स्टेडियम</li>
                    <li>१७ अगस्त: रोज़गार मेला, श्रम विभाग</li>
                    <li>२० अगस्त: स्वास्थ्य शिविर, सिविल हॉस्पिटल</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">स्थानीय त्योहार:</h3>
                 <ul className="list-disc list-inside text-muted-foreground">
                    <li>लखनऊ महोत्सव (नवंबर-दिसंबर)</li>
                    <li>बैसाखी मेला (अप्रैल)</li>
                </ul>
            </div>
            <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>पूरा कैलेंडर देखें</Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>रिमाइंडर सेट करें</Button>
            </div>
        </CardContent>
    </Card>
)};

const StateGovtCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Landmark /> राज्य सरकार और नेतृत्व</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div>
                <p><b>👑 मुख्यमंत्री:</b> श्री योगी आदित्यनाथ</p>
                <p className="text-muted-foreground">🏛️ पार्टी: भारतीय जनता पार्टी (BJP)</p>
                <p className="text-muted-foreground">📅 कार्यकाल: १९ मार्च २०१७ से</p>
            </div>
            <div>
                <p><b>👥 मंत्रिमंडल:</b> ५३ मंत्री (२५ कैबिनेट, २८ राज्य मंत्री)</p>
                 <ul className="list-disc list-inside text-muted-foreground">
                    <li>उप मुख्यमंत्री: श्री केशव प्रसाद मौर्य</li>
                    <li>गृह मंत्री: श्री योगी आदित्यनाथ (अतिरिक्त प्रभार)</li>
                </ul>
            </div>
            <div>
                 <p><b>🏛️ राज्यपाल:</b> श्रीमती आनंदीबेन पटेल</p>
                 <p className="text-muted-foreground">📍 राजभवन, लखनऊ</p>
            </div>
        </CardContent>
    </Card>
);

const StateBudgetCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Wallet /> राज्य का बजट और अर्थव्यवस्था</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
             <div>
                <p><b>💰 बजट २०२३-२४:</b> ₹६.९० लाख करोड़</p>
            </div>
             <div>
                <p><b>📈 आर्थिक संकेतक:</b></p>
                <p className="text-muted-foreground">• सकल राज्य घरेलू उत्पाद (GSDP): ₹२१.५ लाख करोड़</p>
                <p className="text-muted-foreground">• GSDP विकास दर: १६.८%</p>
            </div>
             <div>
                <p><b>🏭 प्रमुख उद्योग:</b></p>
                <p className="text-muted-foreground">• कृषि, विनिर्माण, सूचना प्रौद्योगिकी, पर्यटन</p>
            </div>
        </CardContent>
    </Card>
);

const StatePoliciesCard = () => (
     <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Gavel /> राज्य नीतियाँ और कानून</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div>
                <h3 className="font-semibold">प्रमुख नीतियाँ:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>उत्तर प्रदेश निवेश और रोज़गार प्रोत्साहन नीति २०२३</li>
                    <li>उत्तर प्रदेश स्टार्टअप नीति २०२०</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">नई योजनाएँ:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>मुख्यमंत्री युवा स्वरोजगार योजना</li>
                    <li>किसान समृद्धि योजना</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

const StateExamsCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Briefcase /> राज्यस्तरीय परीक्षाएँ और रिजल्ट</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold">शिक्षा बोर्ड:</h3>
                <p className="text-muted-foreground">• उत्तर प्रदेश माध्यमिक शिक्षा परिषद (UPMSP)</p>
                <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://upmsp.edu.in/', '_blank')}>UP बोर्ड हाईस्कूल/इंटरमीडिएट रिजल्ट</Button>
            </div>
            <div>
                <h3 className="font-semibold">भर्ती परीक्षाएँ:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>UPPSC (प्रांतीय सिविल सेवा)</li>
                    <li>UP Police (योग्यता/भौतिक परीक्षण)</li>
                    <li>UP TET (शिक्षक पात्रता परीक्षा)</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">आगामी परीक्षाएँ:</h3>
                <p className="text-muted-foreground">• UPPSC PCS २०२४ (आवेदन तिथि: १-३१ दिसंबर २०२३)</p>
            </div>
        </CardContent>
    </Card>
);

const StateAgricultureCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Sprout /> कृषि और मौसम पूर्वानुमान</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-sm">
            <div>
                <h3 className="font-semibold">प्रमुख फसलें:</h3>
                <p className="text-muted-foreground">• गेहूँ (देश का ३०% उत्पादन), धान, गन्ना</p>
            </div>
            <div>
                <h3 className="font-semibold">मौसम पूर्वानुमान:</h3>
                <p className="text-muted-foreground">• मॉनसून: जून-सितंबर, वर्षा: १०००-१२०० मिमी</p>
            </div>
            <div>
                <h3 className="font-semibold">सिंचाई:</h3>
                <p className="text-muted-foreground">• नहरें: गंगा नहर, शारदा नहर | नलकूप: ২৫ लाख+</p>
            </div>
            <div>
                <h3 className="font-semibold">किसान कल्याण:</h3>
                <p className="text-muted-foreground">• किसान सम्मान निधि, फसल बीमा योजना</p>
            </div>
        </CardContent>
    </Card>
);

const NationalSymbolCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Award /> राष्ट्रीय प्रतीक और गान</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
            <p><b> राष्ट्रीय ध्वज:</b> तिरंगा (केसरिया, सफेद, हरा)</p>
            <p><b> राष्ट्रीय चिन्ह:</b> अशोक स्तंभ</p>
            <p><b> राष्ट्रीय गान:</b> जन गण मन</p>
            <p><b> राष्ट्रीय पशु:</b> बाघ</p>
            <p><b> राष्ट्रीय पक्षी:</b> मोर</p>
            <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.youtube.com/watch?v=gb1UeSU11qI', '_blank')}>गान सुनें</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/documents/constitutions', '_blank')}>संविधान देखें</Button>
            </div>
             <div className="border-t pt-2 mt-2">
                <h3 className="font-semibold">राष्ट्रीय अवकाश:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>२६ जनवरी: गणतंत्र दिवस</li>
                    <li>१५ अगस्त: स्वतंत्रता दिवस</li>
                    <li>२ अक्टूबर: गांधी जयंती</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

const CentralGovtCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Building2 /> केंद्र सरकार और मंत्रालय</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
             <div>
                <p><b>👑 राष्ट्रपति:</b> श्रीमती द्रौपदी मुर्मू</p>
                <p><b>👑 प्रधानमंत्री:</b> श्री नरेंद्र मोदी</p>
            </div>
            <div>
                <h3 className="font-semibold">केंद्रीय मंत्रिमंडल:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>गृह मंत्री: श्री अमित शाह</li>
                    <li>विदेश मंत्री: श्री एस. जयशंकर</li>
                    <li>रक्षा मंत्री: श्री राजनाथ सिंह</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

const ConstitutionCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Scroll /> संविधान और नागरिक अधिकार</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
             <div>
                <p><b>📖 भारत का संविधान:</b> लागू: २६ जनवरी १९५०</p>
            </div>
            <div>
                <h3 className="font-semibold">⚖️ मौलिक अधिकार:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>समानता का अधिकार</li>
                    <li>स्वतंत्रता का अधिकार</li>
                    <li>शोषण के विरुद्ध अधिकार</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold">📋 मौलिक कर्तव्य (अनुच्छेद ५१ए):</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>संविधान का पालन करें</li>
                    <li>राष्ट्रीय ध्वज का सम्मान करें</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold">🗳️ राज्य के नीति निर्देशक तत्व:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>सामाजिक और आर्थिक न्याय</li>
                    <li>समान कार्य के लिए समान वेतन</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

const NationalSchemesCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Megaphone /> राष्ट्रीय योजनाएँ और कल्याण कार्यक्रम</CardTitle></CardHeader>
        <CardContent>
             <ul className="list-disc list-inside text-muted-foreground text-sm">
                <li>आयुष्मान भारत योजना</li>
                <li>प्रधानमंत्री आवास योजना</li>
                <li>प्रधानमंत्री किसान सम्मान निधि</li>
                <li>उज्ज्वला योजना</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>ऑनलाइन आवेदन करें</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>योग्यता जाँचें</Button>
                <Button variant="outline" size="sm" onClick={() => window.open('https://www.india.gov.in/my-government/schemes', '_blank')}>आवेदन स्थिति जाँचें</Button>
            </div>
        </CardContent>
    </Card>
);

const DocumentServicesCard = () => (
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><BookUser /> पासपोर्ट, आधार, पैन और दस्तावेज़ सेवाएँ</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => window.open('https://www.passportindia.gov.in/', '_blank')}>पासपोर्ट सेवाएँ</Button>
            <Button variant="secondary" size="sm" onClick={() => window.open('https://uidai.gov.in/', '_blank')}>आधार कार्ड सेवाएँ</Button>
            <Button variant="secondary" size="sm" onClick={() => window.open('https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html', '_blank')}>पैन कार्ड सेवाएँ</Button>
            <Button variant="secondary" size="sm" onClick={() => window.open('https://voters.eci.gov.in/', '_blank')}>मतदाता पहचान पत्र</Button>
        </CardContent>
    </Card>
);

const NationalEmergencyCard = () => {
    const { toast } = useToast();
    return(
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Siren /> राष्ट्रीय आपातकाल और आपदा प्रबंधन</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div>
                <h3 className="font-semibold">राष्ट्रीय आपातकालीन नंबर:</h3>
                <p className="text-muted-foreground">• पुलिस: १००, एम्बुलेंस: १०२, अग्निशमन: १०१</p>
            </div>
            <div>
                <h3 className="font-semibold">आपदा प्रबंधन:</h3>
                <p className="text-muted-foreground">• राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA)</p>
            </div>
            <div>
                <h3 className="font-semibold">आपातकालीन तैयारी:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                    <Button variant="outline" size="sm" onClick={() => toast({title: 'Feature coming soon!'})}>आपातकालीन किट</Button>
                    <Button variant="outline" size="sm" onClick={() => toast({title: 'Feature coming soon!'})}>निकासी मार्ग</Button>
                </div>
            </div>
        </CardContent>
    </Card>
)};

const IndiaFactsCard = () => {
    const { toast } = useToast();
    return(
    <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Medal /> भारत के बारे में तथ्य और उपलब्धियाँ</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div>
                <h3 className="font-semibold flex items-center gap-2"><Globe className="w-4 h-4"/>भौगोलिक तथ्य:</h3>
                <ul className="list-disc list-inside text-muted-foreground pl-6">
                    <li>क्षेत्रफल: ३२.८ लाख वर्ग किमी (विश्व में ७वाँ)</li>
                    <li>जनसंख्या: १४२ करोड़ (विश्व में प्रथम)</li>
                    <li>राज्य/केंद्रशासित प्रदेश: २८ राज्य, ८ केंद्रशासित प्रदेश</li>
                    <li>राजधानी: नई दिल्ली</li>
                    <li>सबसे बड़ा राज्य: राजस्थान (क्षेत्रफल)</li>
                    <li>सबसे अधिक जनसंख्या वाला राज्य: उत्तर प्रदेश</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold flex items-center gap-2"><Trophy className="w-4 h-4"/>उपलब्धियाँ:</h3>
                <ul className="list-disc list-inside text-muted-foreground pl-6">
                    <li>🚀 चंद्रयान-३ (चंद्रमा के दक्षिणी ध्रुव पर उतरा)</li>
                    <li>🌐 दुनिया की सबसे बड़ी डिजिटल भुगतान प्रणाली (UPI)</li>
                    <li>🏭 दुनिया की तीसरी सबसे बड़ी स्टार्टअप इकोसिस्टम</li>
                    <li>💊 दुनिया की सबसे बड़ी वैक्सीन ड्राइव (कोविड-१९)</li>
                    <li>🌾 दुनिया का सबसे बड़ा खाद्य सुरक्षा कार्यक्रम</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold flex items-center gap-2"><Landmark className="w-4 h-4"/>अंतर्राष्ट्रीय सदस्यता:</h3>
                 <ul className="list-disc list-inside text-muted-foreground pl-6">
                    <li>संयुक्त राष्ट्र (UN)</li>
                    <li>G20</li>
                    <li>BRICS</li>
                    <li>SCO</li>
                    <li>विश्व व्यापार संगठन (WTO)</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold flex items-center gap-2"><Medal className="w-4 h-4"/>नोबेल पुरस्कार विजेता:</h3>
                 <ul className="list-disc list-inside text-muted-foreground pl-6">
                    <li>रवींद्रनाथ टैगोर (१९१३)</li>
                    <li>सी.वी. रमन (१९३०)</li>
                    <li>मदर टेरेसा (१९७९)</li>
                    <li>अमर्त्य सेन (१९९८)</li>
                    <li>कैलाश सत्यार्थी (२०१४)</li>
                </ul>
            </div>
             <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: 'Feature coming soon!' })}>📚 भारत के बारे में और जानें</Button>
            </div>
        </CardContent>
    </Card>
)};

const StateTransportCard = () => (
    <Card>
       <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Bus /> राज्य परिवहन और यात्रा</CardTitle></CardHeader>
       <CardContent className="space-y-4 text-sm">
           <div>
               <h3 className="font-semibold">UPSRTC (उत्तर प्रदेश सड़क परिवहन निगम):</h3>
               <p className="text-muted-foreground">• बसें: १०,०००+ | मार्ग: २,५००+ | दैनिक यात्री: ३० लाख+</p>
               <Button variant="link" className="p-0 h-auto" onClick={() => window.open('https://www.upsrtconline.co.in/', '_blank')}>ऑनलाइन टिकट बुकिंग</Button>
           </div>
           <div>
               <h3 className="font-semibold">रेलवे:</h3>
               <p className="text-muted-foreground">• प्रमुख स्टेशन: लखनऊ, कानपुर, वाराणसी, प्रयागराज</p>
           </div>
           <div>
               <h3 className="font-semibold">हवाई अड्डे:</h3>
               <p className="text-muted-foreground">• अंतर्राष्ट्रीय: लखनऊ, वाराणसी, कुशीनगर</p>
               <p className="text-muted-foreground">• घरेलू: आगरा, प्रयागराज, गोरखपुर</p>
           </div>
           <div>
               <h3 className="font-semibold">राजमार्ग:</h3>
               <p className="text-muted-foreground">• NH-24, यमुना एक्सप्रेसवे, पूर्वांचल एक्सप्रेसवे</p>
           </div>
       </CardContent>
   </Card>
);

const StateHealthCard = () => (
   <Card>
       <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><HeartPulse /> स्वास्थ्य और चिकित्सा सुविधाएँ</CardTitle></CardHeader>
       <CardContent className="space-y-4 text-sm">
           <div>
               <h3 className="font-semibold">चिकित्सा बुनियादी ढाँचा:</h3>
               <p className="text-muted-foreground">• सरकारी अस्पताल: ८००+, स्वास्थ्य केंद्र: २०,०००+</p>
           </div>
           <div>
               <h3 className="font-semibold">महत्वपूर्ण संस्थान:</h3>
               <p className="text-muted-foreground">• SGPGI लखनऊ, KGMU लखनऊ, AIIMS (गोरखपुर, रायबरेली)</p>
           </div>
           <div>
               <h3 className="font-semibold">सार्वजनिक स्वास्थ्य कार्यक्रम:</h3>
               <p className="text-muted-foreground">• आयुष्मान भारत, टीकाकरण अभियान, स्वच्छ भारत मिशन</p>
           </div>
       </CardContent>
   </Card>
);


export default function MorePage() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { translations } = useLanguage();
  const { openModal: openVoiceModal } = useVoiceSearch();
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const BannerSection = () => {
    const bannerPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
    const bannerImages = PlaceHolderImages.filter((img) => img.id.startsWith('ad-hero')).slice(0, 5);

    return (
        <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[bannerPlugin.current]}
            onMouseEnter={bannerPlugin.current.stop}
            onMouseLeave={bannerPlugin.current.reset}
        >
            <CarouselContent>
                {bannerImages.map((image) => (
                    <CarouselItem key={image.id}>
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
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
      const shortsImages = PlaceHolderImages.filter(img => img.id.startsWith('shorts-'));
      return (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PlaySquare className="text-red-500" />
              ज़रूरी ख़बरें
            </h2>
            <Button variant="link" onClick={() => router.push('/explore')}>और देखें</Button>
          </div>
          <Carousel opts={{ align: 'start', loop: false }} className="w-full">
            <CarouselContent className="-ml-2">
              {shortsData.slice(0, 6).map((short, index) => {
                const image = shortsImages.find(img => img.id === short.imageId);
                return (
                  <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3">
                    <Link href="/explore">
                      <Card className="overflow-hidden rounded-xl border-none">
                        <CardContent className="p-0 relative">
                          <Image
                            src={image?.imageUrl || `https://picsum.photos/seed/${short.id}/300/500`}
                            alt={short.title}
                            width={300}
                            height={200}
                            className="object-cover w-full aspect-video rounded-xl"
                            data-ai-hint={image?.imageHint || 'video content'}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <h4 className="font-semibold text-white text-sm truncate">{short.title}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>
      );
  };

  const Tab1_MyPlace = () => (
    <div className="space-y-6 p-1">
        <BannerSection />
        <NewsSection />
        <WeatherCard />
        <EmergencyCard />
        <LocalNewsCard />
        <MapCard onSearchClick={() => setIsSearchOpen(true)} />
        <LocalStatsCard />
    </div>
  );

  const Tab2_District = () => (
    <div className="space-y-6 p-1">
        <BannerSection />
        <NewsSection />
        <DistrictAdminCard />
        <DistrictStatsCard />
        <DistrictHealthCard />
        <DistrictEducationCard />
        <DistrictTransportCard />
        <DistrictSchemesCard />
        <DistrictEventsCard />
    </div>
  );

  const Tab3_State = () => (
    <div className="space-y-6 p-1">
        <BannerSection />
        <NewsSection />
        <StateGovtCard />
        <StateBudgetCard/>
        <StatePoliciesCard />
        <StateExamsCard />
        <StateTransportCard />
        <StateAgricultureCard />
        <StateHealthCard />
    </div>
  );

  const Tab4_Country = () => (
    <div className="space-y-6 p-1">
        <BannerSection />
        <NewsSection />
        <NationalSymbolCard />
        <CentralGovtCard />
        <ConstitutionCard />
        <NationalSchemesCard />
        <DocumentServicesCard />
        <NationalEmergencyCard />
        <IndiaFactsCard />
    </div>
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 w-full">
            <Button onClick={() => setIsSearchOpen(false)} size="icon" variant="ghost" className="rounded-full">
              <ChevronLeft />
            </Button>
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-input rounded-full pl-10 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Mic
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground cursor-pointer"
                onClick={openVoiceModal}
              />
            </form>
          </div>
        ) : (
          <>
            <div className='flex items-center gap-4'>
              <h1 className="text-lg font-semibold">🇮🇳 भारत सूचना</h1>
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => setIsSearchOpen(true)} size="icon" variant="ghost" className="rounded-full">
                <Search />
              </Button>
              <Button onClick={() => router.push('/profile')} size="icon" variant="ghost" className="rounded-full">
                <User />
              </Button>
            </div>
          </>
        )}
      </header>

        <main className="p-4 space-y-6 pb-32">
            <Tabs defaultValue="my-place" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto">
                    <TabsTrigger value="my-place" className="text-xs sm:text-sm">मेरा वर्तमान स्थान</TabsTrigger>
                    <TabsTrigger value="district" className="text-xs sm:text-sm">जिला</TabsTrigger>
                    <TabsTrigger value="state" className="text-xs sm:text-sm">राज्य</TabsTrigger>
                    <TabsTrigger value="country" className="text-xs sm:text-sm">देश</TabsTrigger>
                </TabsList>
                <TabsContent value="my-place" className="mt-6">
                    <Tab1_MyPlace />
                </TabsContent>
                <TabsContent value="district" className="mt-6">
                    <Tab2_District />
                </TabsContent>
                <TabsContent value="state" className="mt-6">
                    <Tab3_State />
                </TabsContent>
                <TabsContent value="country" className="mt-6">
                    <Tab4_Country />
                </TabsContent>
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
                            <div className={cn(
                                "flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900",
                            )}>
                               <link.icon className="w-8 h-8" />
                            </div>
                        </Link>
                      </div>
                    );
                }
                return (
                    <Link key={index} href={link.href} className={cn(
                        "flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md transition-colors w-16", 
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                      )}>
                      <link.icon className="w-6 h-6" />
                      <span className={cn("text-xs", isActive ? 'font-bold' : 'font-semibold')}>
                        {(translations.home as any)[link.labelKey] || (translations.location as any)[link.labelKey] || ''}
                        </span>
                    </Link>
                )
            })}
            </div>
        </footer>
    </div>
  );
}
