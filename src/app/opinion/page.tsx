
'use client';

import {
  Search,
  X,
  MapPin,
  Mic,
  SlidersHorizontal,
  Menu,
  LogOut,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { locationNavLinks, mainFooterNavLinks, sideNavLinks } from '@/lib/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { useVoiceSearch } from '@/context/VoiceSearchContext';
import FloatingActionButton from '@/components/FloatingActionButton';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function OpinionPage() {
  const { translations } = useLanguage();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal: openVoiceModal } = useVoiceSearch();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { signOut, isPending: signOutPending } = useAuthUI();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc(userProfileRef);

  const handleSignOut = async () => {
    await signOut();
    clearCart();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };

  const isLoading = userLoading || profileLoading;

  return (
    <SidebarProvider>
      <div className="bg-background min-h-screen flex">
        <Sidebar collapsible="offcanvas" className="bg-gray-900 text-white">
          <div className="flex flex-col h-full">
            <SidebarHeader className='p-0'>
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-4 user-info">
                  <Avatar className="w-12 h-12">
                    {isLoading ? (
                      <Skeleton className="w-full h-full rounded-full" />
                    ) : user ? (
                      <>
                        <AvatarImage src={userProfile?.photoURL || user?.photoURL || "https://picsum.photos/seed/avatar/100/100"} />
                        <AvatarFallback>{userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="sidebar-text-wrapper">
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-32 bg-gray-600" />
                        <Skeleton className="h-4 w-40 bg-gray-700" />
                      </div>
                    ) : user ? (
                      <>
                        <p className="font-semibold text-lg">{userProfile?.displayName || user?.displayName || 'Guest User'}</p>
                        <p className="text-sm text-gray-400">{userProfile?.phoneNumber || user?.phoneNumber || userProfile?.email || user?.email}</p>
                      </>
                    ) : (
                      <div>
                        <Button
                          size="sm"
                          onClick={() => {
                            router.push('/phone-login');
                          }}
                        >
                          Login / Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="p-0">
              <nav className="flex-grow p-4 space-y-2">
                {sideNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 transition-colors",
                      pathname === link.href ? 'bg-primary text-white' : ''
                    )}
                  >
                    <link.icon className="w-6 h-6" />
                    <span className="nav-text">{(translations.profile as any)[link.labelKey] || link.text}</span>
                  </Link>
                ))}
              </nav>
            </SidebarContent>
            {user && (
              <div className="p-4 border-t border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left gap-4 p-2 hover:bg-red-500/20"
                  onClick={handleSignOut}
                  disabled={signOutPending || isLoading}
                >
                  <LogOut className="w-6 h-6" />
                  <span className="logout-text">{translations.profile.logOut}</span>
                </Button>
              </div>
            )}
          </div>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col">
          <header className="p-4 bg-background sticky top-0 z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-foreground" />
                <span className="font-semibold">{translations.location.selectLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{translations.location.man}</span>
                <SidebarTrigger>
                  <Menu />
                </SidebarTrigger>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={translations.location.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-input rounded-full pl-10 pr-28 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <X
                      className="w-5 h-5 text-muted-foreground cursor-pointer"
                      onClick={() => setSearchQuery('')}
                    />
                  )}
                  <div className="w-px h-5 bg-border"></div>
                  <Mic
                    className="w-5 h-5 text-muted-foreground cursor-pointer"
                    onClick={openVoiceModal}
                  />
                  <div className="w-px h-5 bg-border"></div>
                  <Link href="/filter">
                    <SlidersHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow pb-32">
            <div className="p-4 text-center">
              <h1 className="text-2xl font-bold">Opinion Page</h1>
              <p className="text-muted-foreground">Content for Opinion will be displayed here.</p>
            </div>
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
