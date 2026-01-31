
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  LogOut,
  Moon,
  Star,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { profileHeaderLinks, profileMenuItems, profileOtherInfoLinks } from '@/lib/navigation.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useMemo } from 'react';
import { doc } from 'firebase/firestore';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { signOut, isPending: signOutPending } = useAuthUI();
  const { theme, toggleTheme } = useTheme();
  const { clearCart } = useCart();
  const referCarImage = PlaceHolderImages.find(img => img.id === 'refer-car');
  
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
    <div className="bg-gray-900 text-white relative h-screen">
        <Button 
            onClick={() => router.back()} 
            size="icon" 
            variant="ghost" 
            className="absolute top-4 left-4 rounded-full bg-black/50 text-white hover:bg-black/70 border border-gray-600 z-30">
            <ChevronLeft />
        </Button>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs flex flex-col items-center text-center z-20">
            <Avatar className="w-24 h-24 border-4 border-white">
                {isLoading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : user ? (
                    <>
                        <AvatarImage src={userProfile?.photoURL || user?.photoURL || "https://picsum.photos/seed/user-profile/100/100"} alt={userProfile?.displayName || 'User'} />
                        <AvatarFallback className='text-4xl bg-gray-700 text-gray-400'>
                           {userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </>
                ) : (
                    <>
                        <AvatarImage src={"https://picsum.photos/seed/user-profile/100/100"} alt="Guest user avatar" />
                        <AvatarFallback className='text-4xl bg-gray-700 text-gray-400'>G</AvatarFallback>
                    </>
                )}
            </Avatar>
            
            {isLoading ? (
                <div className="w-full space-y-2 mt-4">
                    <Skeleton className="h-8 w-3/4 mx-auto rounded-md bg-gray-500" />
                    <Skeleton className="h-4 w-1/2 mx-auto rounded-md bg-gray-600" />
                </div>
            ) : user ? (
                 <div className="mt-4 text-white">
                    <div className="flex items-center justify-center gap-2">
                        <h2 className="text-xl font-bold">{userProfile?.displayName || user?.displayName || 'Welcome User'}</h2>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8 rounded-full" onClick={() => router.push('/edit-profile')}>
                            <Edit className="w-4 h-4" />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-400">
                      {userProfile?.phoneNumber || user?.phoneNumber || userProfile?.email || user?.email}
                    </p>
                </div>
            ) : (
                <div className="mt-6 w-full max-w-xs flex flex-col items-center">
                    <Link href="/phone-login" passHref className='w-full'>
                        <Button variant="outline" className="w-full max-w-[200px] bg-transparent text-white border-primary rounded-full h-12 text-base hover:bg-primary/10 hover:text-white">
                           {translations.profile.continue}
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-400 mt-2 px-4">
                        {translations.profile.loginMessage}
                    </p>
                </div>
            )}
        </div>
        
        <main className="absolute top-1/4 bottom-0 left-0 right-0 overflow-y-auto bg-gray-50 rounded-t-3xl p-4 space-y-4 z-10">
            <div className="pt-24 space-y-4">
                <div className="flex justify-around w-full max-w-sm mx-auto">
                    {profileHeaderLinks.map((item) => (
                        <Link key={item.labelKey} href={item.href} className="flex flex-col items-center gap-2 text-gray-600">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-center">{translations.profile[item.labelKey as keyof typeof translations.profile]}</span>
                        </Link>
                    ))}
                </div>

                <div className='divide-y divide-gray-200'>
                    {profileMenuItems.map((item) => (
                        <Link key={item.labelKey} href={item.href} className="flex items-center justify-between py-4 cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <item.icon className="w-6 h-6 text-gray-500" />
                                <span className="font-medium text-gray-800">{translations.profile[item.labelKey as keyof typeof translations.profile]}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>
                    ))}
                </div>
                
                <div className="space-y-1 pt-4">
                  <h3 className="text-gray-500 text-sm font-bold tracking-wider mb-2 px-1 uppercase">
                    {translations.profile.otherInfo}
                  </h3>
                  <div className='divide-y divide-gray-200'>
                    {profileOtherInfoLinks.map(link => (
                        <Link key={link.labelKey} href={link.href} className="flex items-center justify-between py-4 cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <link.icon className="w-6 h-6 text-gray-500" />
                                <span className="font-medium text-gray-800">{translations.profile[link.labelKey as keyof typeof translations.profile]}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>
                    ))}
                  </div>
                </div>

                {user && !userLoading && (
                    <div className="pt-2">
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            disabled={signOutPending}
                            className="w-auto h-auto px-4 py-2 rounded-full border-gray-300 text-gray-800"
                        >
                            {signOutPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5 mr-2" />}
                            {translations.profile.logOut}
                        </Button>
                    </div>
                )}

                {referCarImage && (
                    <Card className="p-4 rounded-lg flex items-center justify-between bg-gray-100 border-none shadow-md mt-6">
                        <div>
                        <h4 className="font-bold text-lg text-gray-900">{translations.profile.referEarn}</h4>
                        <p className="text-sm text-gray-600 max-w-[150px]">{translations.profile.referEarnDescription}</p>
                        <p className="text-xs text-primary font-bold mt-1">{translations.profile.hurryUp}</p>
                        </div>
                        <div className="flex flex-col items-center">
                        <Image 
                            src={referCarImage.imageUrl}
                            alt={referCarImage.description}
                            data-ai-hint={referCarImage.imageHint}
                            width={120}
                            height={60}
                            className="object-contain"
                        />
                        <Button 
                            className="mt-2 bg-primary text-primary-foreground h-8 text-sm px-6 rounded-md"
                            onClick={() => router.push('/refer')}
                        >
                            {translations.profile.referNow}
                        </Button>
                        </div>
                    </Card>
                )}

                <div className="mt-8 flex items-center justify-center space-x-4">
                    <Button
                        onClick={() => { if (theme === 'dark') toggleTheme(); }}
                        variant={theme === 'light' ? 'default' : 'outline'}
                        className='rounded-full px-5 py-2 flex items-center gap-2'
                    >
                        <Sun className="h-4 w-4" />
                        {translations.profile.lightMode}
                    </Button>
                    <Button
                        onClick={() => { if (theme === 'light') toggleTheme(); }}
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        className='rounded-full px-5 py-2 flex items-center gap-2'
                    >
                        <Moon className="h-4 w-4" />
                        {translations.profile.darkMode}
                    </Button>
                </div>

                <div className="text-center text-gray-500 text-sm pt-6 pb-2">
                    <p>{translations.profile.appVersions}</p>
                    <p>0.2</p>
                </div>
            </div>
        </main>
    </div>
  );
}
