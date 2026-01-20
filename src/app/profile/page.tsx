'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { profileHeaderLinks, profileMenuItems, profileOtherInfoLinks } from '@/lib/navigation.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const { signOut, isPending: signOutPending } = useAuthUI();
  const referCarImage = PlaceHolderImages.find(img => img.id === 'refer-car');
  
  const settingLink = profileMenuItems.find(link => link.labelKey === 'setting');
  const shareLink = profileOtherInfoLinks.find(link => link.labelKey === 'shareApp');
  const aboutLink = profileOtherInfoLinks.find(link => link.labelKey === 'aboutUs');

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };


  return (
    <div className="bg-background text-foreground min-h-screen">
       <div className="bg-gray-900 p-4 relative flex flex-col items-center text-center pb-24">
            <Button 
                onClick={() => router.back()} 
                size="icon" 
                variant="ghost" 
                className="absolute top-4 left-4 rounded-full bg-black/50 text-white hover:bg-black/70 border border-gray-600">
                <ChevronLeft />
            </Button>
            
            <Avatar className="w-24 h-24 border-4 border-white mt-8">
                {userLoading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : (
                    <>
                        {user?.photoURL ? (
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                        ) : (
                            <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" />
                        )}
                        <AvatarFallback className='text-4xl bg-gray-700 text-gray-400'>
                           {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </>
                )}
            </Avatar>
            
            {userLoading ? (
                <div className="w-full max-w-xs space-y-2 mt-4">
                    <Skeleton className="h-10 w-3/4 mx-auto rounded-full" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
            ) : user ? (
                <div className="mt-4 text-white">
                    <h2 className="text-xl font-bold">{user.displayName || 'Welcome User'}</h2>
                    <p className="text-sm text-gray-400">
                      {user.phoneNumber || user.email}
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
           
            <div className="flex justify-around w-full max-w-sm mt-8">
                {profileHeaderLinks.map((item) => (
                    <Link key={item.labelKey} href={item.href} className="flex flex-col items-center gap-2 text-white">
                        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium">{translations.profile[item.labelKey as keyof typeof translations.profile]}</span>
                    </Link>
                ))}
            </div>
       </div>

      <main className="flex-grow overflow-y-auto bg-white dark:bg-white text-black -mt-12 rounded-t-3xl p-4 space-y-4">
        {settingLink && (
            <Link href={settingLink.href} className="flex items-center justify-between py-2 cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="relative">
                <settingLink.icon className="w-6 h-6 text-gray-500" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-xs font-bold">1</span>
                </div>
                <span className="font-medium text-gray-800">{translations.profile[settingLink.labelKey as keyof typeof translations.profile]}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
        )}
        
        <div className="space-y-1 pt-4">
          <h3 className="text-gray-500 text-sm font-bold tracking-wider mb-2 px-1 uppercase">
            {translations.profile.otherInfo}
          </h3>
          <div className='divide-y divide-gray-200'>
            {shareLink && (
            <Link href={shareLink.href} className="flex items-center justify-between py-4 cursor-pointer group">
                <div className="flex items-center gap-4">
                <shareLink.icon className="w-6 h-6 text-gray-500" />
                <span className="font-medium text-gray-800">{translations.profile[shareLink.labelKey as keyof typeof translations.profile]}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            )}
            {aboutLink && (
            <Link href={aboutLink.href} className="flex items-center justify-between py-4 cursor-pointer group">
                <div className="flex items-center gap-4">
                <aboutLink.icon className="w-6 h-6 text-gray-500" />
                <span className="font-medium text-gray-800">{translations.profile[aboutLink.labelKey as keyof typeof translations.profile]}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            )}
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
            <Card className="p-4 rounded-lg flex items-center justify-between bg-gray-50 border-none shadow-md mt-6">
                <div>
                <h4 className="font-bold text-lg">{translations.profile.referEarn}</h4>
                <p className="text-sm text-gray-600 max-w-[150px]">{translations.profile.referEarnDescription}</p>
                <p className="text-xs text-primary font-bold mt-1">{translations.profile.hurryUp}</p>
                </div>
                <div className="flex flex-col items-center">
                <Image 
                    src={referCarImage.imageUrl}
                    alt={referCarImage.description}
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
      </main>
    </div>
  );
}
