
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

export default function LibraryPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal: openVoiceModal } = useVoiceSearch();
  const firestore = useFirestore();
  const { user } = useUser();
  const { deliveryAddress } = useCart();

  // Fetch user profile for state/location info
  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: userProfile } = useDoc<DocumentData>(userProfileRef);

  const [detectedDistrict, setDetectedDistrict] = useState<string | null>(null);
  const [isAutoFiltered, setIsAutoFiltered] = useState(false);

  // Fetch dynamic content from Firestore
  const contentQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'content'));
  }, [firestore]);

  const { data: allContent, loading } = useCollection<DocumentData>(contentQuery);

  // Helper to extract and merge links
  const getMergedLinks = (type: string, staticKey: keyof typeof staticLinks) => {
    const local = (staticLinks as any)[staticKey] || [];
    let dynamicLinks: any[] = [];
    if (allContent) {
        const items = allContent.filter((c) => c.type === type);
        items.forEach(item => {
            if (item.contentData) {
                try {
                    const parsed = JSON.parse(item.contentData);
                    if (Array.isArray(parsed)) {
                        dynamicLinks = [...dynamicLinks, ...parsed];
                    }
                } catch (e) {
                    console.error(`Failed to parse ${type} JSON`, e);
                }
            }
        });
    }
    return [...local, ...dynamicLinks];
  };

  const districtLinks = useMemo(() => getMergedLinks('जिला वेब सूची', 'district'), [allContent]);
  const stateLinks = useMemo(() => getMergedLinks('राज्य वेब सूची', 'state'), [allContent]);
  const countryLinks = useMemo(() => getMergedLinks('देश वेब सूची', 'country'), [allContent]);

  // Logic to detect district from address or profile
  useEffect(() => {
    if (districtLinks.length > 0 && !searchQuery) {
        const addressText = (
            (deliveryAddress?.fullAddress || "") + " " + 
            (userProfile?.location || "") + " " + 
            (userProfile?.state || "")
        ).toLowerCase();
        
        if (addressText.trim()) {
            // Find a matching district from the list
            const match = districtLinks.find(link => {
                const districtName = link.label.split('(')[0].trim().toLowerCase();
                return addressText.includes(districtName);
            });
            
            if (match) {
                const districtName = match.label.split('(')[0].trim();
                setDetectedDistrict(districtName);
                setIsAutoFiltered(true);
                setSearchQuery(districtName); // Automatic Search
            }
        }
    }
  }, [deliveryAddress, userProfile, districtLinks]);

  const filteredLinks = (links: any[]) => {
    let results = links;
    if (searchQuery.trim()) {
      results = results.filter((link) =>
        link.label?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return results;
  };

  const WebLinkCard = ({ label, url }: { label: string; url: string }) => (
    <Card className="hover:border-primary transition-all group shadow-sm">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm sm:text-base truncate">{label}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(url, '_blank')}
          className="rounded-full shrink-0"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );

  const clearAutoFilter = () => {
    setSearchQuery('');
    setIsAutoFiltered(false);
    setDetectedDistrict(null);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="p-4 bg-background sticky top-0 z-50 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">डिजिटल पोर्टल लाइब्रेरी</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
            <Landmark className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="पोर्टल या वेबसाइट खोजें..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                if (isAutoFiltered) setIsAutoFiltered(false);
            }}
            className="w-full bg-input rounded-full pl-10 pr-24 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && <X className="w-4 h-4 cursor-pointer text-muted-foreground" onClick={clearAutoFilter} />}
            <Mic className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" onClick={openVoiceModal} />
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary" />
          </div>
        </div>
        
        {isAutoFiltered && detectedDistrict && (
            <div className="mt-3 flex items-center justify-between bg-primary/5 p-2 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <Navigation className="w-3 h-3 animate-pulse" />
                    <span>आपके स्थान के आधार पर: <b>{detectedDistrict}</b></span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] hover:bg-primary/10" onClick={clearAutoFilter}>
                    <RefreshCcw className="w-3 h-3 mr-1" /> सभी देखें
                </Button>
            </div>
        )}
      </header>

      <main className="flex-grow p-4 pb-32">
        <Tabs defaultValue="district" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="district" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <MapPin className="w-4 h-4" /> जिला
            </TabsTrigger>
            <TabsTrigger value="state" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Building2 className="w-4 h-4" /> राज्य
            </TabsTrigger>
            <TabsTrigger value="country" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Globe className="w-4 h-4" /> देश
            </TabsTrigger>
          </TabsList>

          {[
            { id: 'district', links: districtLinks, title: 'जिला स्तरीय वेबसाइट्स' },
            { id: 'state', links: stateLinks, title: 'राज्य स्तरीय पोर्टल' },
            { id: 'country', links: countryLinks, title: 'राष्ट्रीय डिजिटल सेवाएं' },
          ].map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4 focus-visible:outline-none">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{tab.title}</h2>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-bold">
                    {filteredLinks(tab.links).length} कुल लिंक्स
                </span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : filteredLinks(tab.links).length > 0 ? (
                <div className="grid gap-3">
                  {filteredLinks(tab.links).map((link: any, index: number) => (
                    <WebLinkCard key={index} label={link.label} url={link.url} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground font-medium">कोई लिंक नहीं मिला।</p>
                  <Button variant="link" onClick={clearAutoFilter} className="mt-2 text-primary">
                      पूरी सूची देखने के लिए यहाँ क्लिक करें
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
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
                      "flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-gray-900 transition-transform active:scale-90",
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
                <span className={cn("text-[10px]", isActive ? 'font-bold' : 'font-semibold')}>
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
