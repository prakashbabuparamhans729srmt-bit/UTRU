
'use client';

import {
  Search,
  MapPin,
  Mic,
  SlidersHorizontal,
  ExternalLink,
  Globe,
  Landmark,
  Building2,
  FileText,
  X,
  Navigation,
  RefreshCcw,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { mainFooterNavLinks } from '@/lib/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollection, useFirestore, useUser, useDoc } from '@/firebase';
import { collection, query, type DocumentData, doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/CartContext';
import staticLinks from '@/lib/web-links.json';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LibraryPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal: openVoiceModal } = useVoiceSearch();
  const firestore = useFirestore();
  const { user } = useUser();
  const { deliveryAddress } = useCart();

  const userProfileRef = useMemo(() => user && firestore ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
  const { data: userProfile } = useDoc<DocumentData>(userProfileRef);

  const [detectedDistrict, setDetectedDistrict] = useState<string | null>(null);
  const [isAutoFiltered, setIsAutoFiltered] = useState(false);

  const contentQuery = useMemo(() => firestore ? query(collection(firestore, 'content')) : null, [firestore]);
  const { data: allContent, loading } = useCollection<DocumentData>(contentQuery);

  const getMergedLinks = (type: string, staticKey: keyof typeof staticLinks) => {
    const local = (staticLinks as any)[staticKey] || [];
    let dynamicLinks: any[] = [];
    if (allContent) {
        allContent.filter((c) => c.type === type).forEach(item => {
            if (item.contentData) {
                try {
                    const parsed = JSON.parse(item.contentData);
                    if (Array.isArray(parsed)) dynamicLinks = [...dynamicLinks, ...parsed];
                } catch (e) { console.error(e); }
            }
        });
    }
    return [...local, ...dynamicLinks];
  };

  const districtLinks = useMemo(() => getMergedLinks('जिला वेब सूची', 'district'), [allContent]);
  const stateLinks = useMemo(() => getMergedLinks('राज्य वेब सूची', 'state'), [allContent]);
  const countryLinks = useMemo(() => getMergedLinks('देश वेब सूची', 'country'), [allContent]);

  useEffect(() => {
    if (districtLinks.length > 0 && !searchQuery && !isAutoFiltered) {
        const text = ((deliveryAddress?.fullAddress || "") + " " + (userProfile?.district || "") + " " + (userProfile?.city || "")).toLowerCase();
        let found = districtLinks.find(link => text.includes(link.label.split('(')[0].trim().toLowerCase()));
        
        if (found) {
            const name = found.label.split('(')[0].trim();
            setDetectedDistrict(name);
            setIsAutoFiltered(true);
            setSearchQuery(name);
        } else if (!isAutoFiltered) {
            setDetectedDistrict("Buxar");
            setIsAutoFiltered(true);
            setSearchQuery("Buxar");
        }
    }
  }, [deliveryAddress, userProfile, districtLinks, isAutoFiltered, searchQuery]);

  const filteredLinks = (links: any[]) => {
    if (!searchQuery.trim()) return links;
    return links.filter((link) => link.label?.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const WebLinkCard = ({ label, url }: { label: string; url: string }) => (
    <Card className="hover:border-primary transition-all group">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white shrink-0"><Globe className="w-5 h-5" /></div>
          <span className="font-medium text-sm sm:text-base truncate">{label}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => window.open(url, '_blank')} className="rounded-full shrink-0"><ExternalLink className="w-4 h-4 text-muted-foreground" /></Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-background sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground"><FileText className="w-5 h-5" /></div>
            <span className="font-bold text-lg">डिजिटल पोर्टल लाइब्रेरी</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}><Landmark className="w-5 h-5" /></Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="पोर्टल या वेबसाइट खोजें..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsAutoFiltered(false); }} className="w-full bg-input rounded-full pl-10 pr-24 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && <X className="w-4 h-4 cursor-pointer text-muted-foreground" onClick={() => { setSearchQuery(''); setIsAutoFiltered(false); }} />}
            <Mic className="w-5 h-5 text-muted-foreground cursor-pointer" onClick={openVoiceModal} />
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
          </div>
        </div>
        {isAutoFiltered && detectedDistrict && (
            <div className="mt-3 flex items-center justify-between bg-primary/5 p-2 rounded-lg border border-primary/20 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-medium text-primary"><Navigation className="w-3 h-3 animate-pulse" /><span>स्थान के आधार पर: <b>{detectedDistrict}</b></span></div>
                <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => { setSearchQuery(''); setIsAutoFiltered(false); }}><RefreshCcw className="w-3 h-3 mr-1" /> सभी देखें</Button>
            </div>
        )}
      </header>

      <main className="flex-grow p-4 pb-32">
        <Tabs defaultValue="district" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="district" className="flex items-center gap-2"><MapPin className="w-4 h-4" /> जिला</TabsTrigger>
            <TabsTrigger value="state" className="flex items-center gap-2"><Building2 className="w-4 h-4" /> राज्य</TabsTrigger>
            <TabsTrigger value="country" className="flex items-center gap-2"><Globe className="w-4 h-4" /> देश</TabsTrigger>
          </TabsList>

          {['district', 'state', 'country'].map((id) => (
            <TabsContent key={id} value={id} className="space-y-4 focus-visible:outline-none">
              <ScrollArea className="h-[calc(100vh-320px)] w-full pr-4">
                {loading ? <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}</div> : 
                 filteredLinks(id === 'district' ? districtLinks : id === 'state' ? stateLinks : countryLinks).length > 0 ? 
                 <div className="grid gap-3 pb-8">{filteredLinks(id === 'district' ? districtLinks : id === 'state' ? stateLinks : countryLinks).map((link: any, index: number) => <WebLinkCard key={index} label={link.label} url={link.url} />)}</div> : 
                 <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted"><Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" /><p className="text-muted-foreground font-medium">कोई लिंक नहीं मिला।</p></div>}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <FloatingActionButton />
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
        <div className="flex justify-around items-center p-2">
          {mainFooterNavLinks.map((link, index) => {
            const isActive = pathname === link.href;
            if (link.isCentral) return (
                <div key={index} className="-mt-8">
                  <Link href={link.href}><div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900"><link.icon className="w-8 h-8" /></div></Link>
                </div>
            );
            return (
              <Link key={index} href={link.href} className={cn("flex flex-col items-center justify-center gap-1 h-auto p-2 rounded-md w-16", isActive ? 'text-primary' : 'text-muted-foreground')}>
                <link.icon className="w-6 h-6" /><span className="text-[10px]">{(translations.home as any)[link.labelKey] || (translations.location as any)[link.labelKey] || ''}</span>
              </Link>
            )
          })}
        </div>
      </footer>
    </div>
  );
}
