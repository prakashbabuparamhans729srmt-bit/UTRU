
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
  ChevronLeft,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { mainFooterNavLinks } from '@/lib/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, type DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function LibraryPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal: openVoiceModal } = useVoiceSearch();
  const firestore = useFirestore();

  // Fetch all web lists from Firestore
  const contentQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'content'));
  }, [firestore]);

  const { data: allContent, loading } = useCollection<DocumentData>(contentQuery);

  const getWebList = (type: string) => {
    const item = allContent?.find((c) => c.type === type);
    if (!item?.contentData) return [];
    try {
      const parsed = JSON.parse(item.contentData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error(`Failed to parse ${type}`, e);
      return [];
    }
  };

  const districtLinks = getWebList('जिला वेब सूची');
  const stateLinks = getWebList('राज्य वेब सूची');
  const countryLinks = getWebList('देश वेब सूची');

  const filteredLinks = (links: any[]) => {
    if (!searchQuery.trim()) return links;
    return links.filter((link) =>
      link.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const WebLinkCard = ({ label, url }: { label: string; url: string }) => (
    <Card className="hover:border-primary transition-all group">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm sm:text-base">{label}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(url, '_blank')}
          className="rounded-full"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );

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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-input rounded-full pl-10 pr-24 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && <X className="w-4 h-4 cursor-pointer" onClick={() => setSearchQuery('')} />}
            <Mic className="w-5 h-5 text-muted-foreground cursor-pointer" onClick={openVoiceModal} />
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 pb-32">
        <Tabs defaultValue="district" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="district" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> जिला
            </TabsTrigger>
            <TabsTrigger value="state" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" /> राज्य
            </TabsTrigger>
            <TabsTrigger value="country" className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> देश
            </TabsTrigger>
          </TabsList>

          {[
            { id: 'district', links: districtLinks, title: 'जिला स्तरीय वेबसाइट्स' },
            { id: 'state', links: stateLinks, title: 'राज्य स्तरीय पोर्टल' },
            { id: 'country', links: countryLinks, title: 'राष्ट्रीय डिजिटल सेवाएं' },
          ].map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{tab.title}</h2>
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{filteredLinks(tab.links).length} लिंक्स</span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : filteredLinks(tab.links).length > 0 ? (
                <div className="grid gap-3">
                  {filteredLinks(tab.links).map((link: any, index: number) => (
                    <WebLinkCard key={index} label={link.label} url={link.url} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 opacity-50">
                  <Globe className="w-12 h-12 mx-auto mb-4" />
                  <p>कोई लिंक नहीं मिला। एडमिन पैनल से जोड़ें।</p>
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
