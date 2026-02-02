'use client'

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sideNavLinks } from '@/lib/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface SideNavigationBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideNavigationBar({ isOpen, setIsOpen }: SideNavigationBarProps) {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { signOut, isPending: signOutPending } = useAuthUI();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isDesktop, setIsDesktop] = useState(false);
  const { clearCart } = useCart();
  const { toast } = useToast();
  const { translations } = useLanguage();

  const userProfileRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, loading: profileLoading } = useDoc(userProfileRef);

  useEffect(() => {
    setIsDesktop(!isMobile);
  }, [isMobile]);

  const handleSignOut = async () => {
    await signOut();
    clearCart();
    setIsOpen(false);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };
  
  const isLoading = userLoading || profileLoading;

  const content = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-4 user-info">
          <Avatar className="w-12 h-12">
            {isLoading ? (
                <Skeleton className="w-full h-full rounded-full" />
            ) : (
                <AvatarImage src={userProfile?.photoURL || user?.photoURL || "https://picsum.photos/seed/avatar/100/100"} />
            )}
            <AvatarFallback>{userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
             {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32 bg-gray-600" />
                    <Skeleton className="h-4 w-40 bg-gray-700" />
                </div>
            ) : user ? (
                <>
                    <p className="font-semibold text-lg user-name">{userProfile?.displayName || user?.displayName || 'Guest User'}</p>
                    <p className="text-sm text-gray-400 user-name">{userProfile?.phoneNumber || user?.phoneNumber || userProfile?.email || user?.email}</p>
                </>
            ) : (
                 <div>
                    <p className="font-semibold text-lg user-name">Guest User</p>
                     <Button
                        variant="link"
                        className="p-0 h-auto text-primary nav-text"
                        onClick={() => {
                            router.push('/phone-login');
                            setIsOpen(false);
                        }}
                    >
                        Login / Sign Up
                    </Button>
                </div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {sideNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
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
  );

  if (isDesktop) {
    return (
      <div className={cn(
        "fixed top-0 left-0 h-full bg-gray-900 text-white z-50 desktop-sidebar-transition",
        isOpen ? "desktop-sidebar-open" : "desktop-sidebar-closed"
      )}>
        {content}
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-4/5 max-w-sm bg-gray-900 text-white z-50 sidebar-transition",
          isOpen ? "sidebar-open" : "sidebar-closed"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </Button>
        {content}
      </div>
    </>
  );
}
