
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useUser } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { profileHeaderLinks, profileMenuItems, profileOtherInfoLinks } from '@/lib/navigation.tsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { translations } = useLanguage();
  const { user, loading: userLoading } = useUser();
  const { signOut, isPending: signOutPending } = useAuthUI();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this amazing app!',
          text: 'I found this great e-commerce app, you should try it.',
          url: window.location.origin,
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          toast({
            variant: 'destructive',
            title: 'Sharing failed',
            description:
              'Could not share the app at this moment. Please try again.',
          });
        }
      }
    } else {
      toast({
        title: 'Web Share not supported',
        description: 'Your browser does not support the Web Share API.',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };


  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
       <div className="bg-gray-900 p-4 relative flex flex-col items-center text-center pb-24">
            <Button 
                onClick={() => router.back()} 
                size="icon" 
                variant="ghost" 
                className="absolute top-4 left-4 rounded-full bg-black/50 text-white hover:bg-black/70">
                <ChevronLeft />
            </Button>
            
            <Avatar className="w-24 h-24 border-4 border-primary mt-8">
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
                           U
                        </AvatarFallback>
                    </>
                )}
            </Avatar>
            
            {userLoading ? (
                <div className="w-full max-w-xs space-y-2 mt-4">
                    <Skeleton className="h-6 w-3/4 mx-auto" />
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
                <div className="mt-6 w-full max-w-xs">
                    <Link href="/phone-login" passHref>
                        <Button className="w-full bg-primary text-primary-foreground font-bold rounded-full h-12 text-base hover:bg-primary/90">
                           {translations.profile.continue}
                        </Button>
                    </Link>
                    <p className="text-sm text-gray-400 mt-2">
                        {translations.profile.loginMessage}
                    </p>
                </div>
            )}
           
            <div className="flex justify-around w-full max-w-sm mt-8">
                {profileHeaderLinks.map((item) => (
                    <Link key={item.labelKey} href={item.href} className="flex flex-col items-center gap-2 text-white">
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{translations.profile[item.labelKey as keyof typeof translations.profile]}</span>
                    </Link>
                ))}
            </div>
       </div>

      <main className="flex-grow overflow-y-auto bg-card -mt-12 rounded-t-3xl p-4">
        <div className="divide-y divide-border">
            {profileMenuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between py-4 cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="font-medium transition-colors group-hover:text-primary">{translations.profile[item.labelKey as keyof typeof translations.profile]}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </Link>
            ))}
        </div>

        <div className="mt-6">
            <h3 className="text-muted-foreground text-sm font-bold tracking-wider mb-2 px-1">
                {translations.profile.otherInfo}
            </h3>
            <div className='divide-y divide-border'>
            {profileOtherInfoLinks.map((item, index) => {
              if (item.labelKey === 'logOut') {
                 if (!user) return null;
                 return (
                    <button
                      key={index}
                      onClick={handleSignOut}
                      disabled={signOutPending}
                      className="w-full flex items-center justify-between py-4 cursor-pointer group disabled:opacity-50 text-left"
                    >
                        <div className='flex items-center gap-4'>
                            {signOutPending ? <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" /> : <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-destructive" />}
                            <span className="font-medium transition-colors group-hover:text-destructive">{translations.profile.logOut}</span>
                        </div>
                         <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </button>
                 );
              }
              if (item.labelKey === 'shareApp') {
                  return (
                    <button
                        key={index}
                        onClick={handleShare}
                        className="w-full flex items-center justify-between py-4 cursor-pointer group text-left"
                    >
                        <div className="flex items-center gap-4">
                            <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                            <span className="font-medium transition-colors group-hover:text-primary">
                                {translations.profile[item.labelKey as keyof typeof translations.profile]}
                            </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </button>
                  );
              }
              return (
                 <Link
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between py-4 cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                        <span className="font-medium transition-colors group-hover:text-primary">
                        {translations.profile[item.labelKey as keyof typeof translations.profile]}
                        </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </Link>
            )})}
            </div>
        </div>
      </main>
    </div>
  );
}
