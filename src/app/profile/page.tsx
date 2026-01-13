
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Loader2,
  Moon,
  Sun,
  User as UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase';
import { useAuthUI } from '@/firebase/auth/use-auth-ui';
import { profileMenuItems, profileOtherInfoLinks } from '@/lib/navigation.tsx';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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


  const carImage = PlaceHolderImages.find((img) => img.id === 'refer-car');

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
       <header className="p-4 flex items-center gap-4">
         <h1 className="text-xl font-bold">{user?.displayName ? `Hey, ${user.displayName.split(' ')[0]}`: translations.profile.title}</h1>
      </header>

      <main className="flex-grow p-4">
        <div className="flex items-center gap-4 mb-8">
            <Avatar className="w-20 h-20 border-2 border-primary">
                {userLoading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : (
                    <>
                        {user?.photoURL ? (
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                        ) : (
                            <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" />
                        )}
                        <AvatarFallback className='text-3xl'>
                            <UserIcon />
                        </AvatarFallback>
                    </>
                )}
            </Avatar>
             {userLoading ? (
                <div className="w-full max-w-xs space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ) : user ? (
                <div>
                    <h2 className="text-xl font-bold">{user.displayName || 'Welcome User'}</h2>
                    <p className="text-sm text-muted-foreground">
                      {user.phoneNumber || user.email}
                    </p>
                </div>
            ) : (
              <div className="w-full">
                <Link href="/phone-login" passHref>
                  <Button className="bg-primary text-primary-foreground font-bold rounded-md w-full sm:w-auto hover:bg-primary/90 mb-2">
                    {translations.profile.continue}
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {translations.profile.loginMessage}
                </p>
              </div>
            )}
        </div>


        <div className="bg-card rounded-lg border">
            <div className="p-4 space-y-1">
            {profileMenuItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between py-3 cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="font-medium transition-colors group-hover:text-primary">{translations.profile[item.labelKey]}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </Link>
            ))}
            </div>
        </div>

        <div className="bg-card rounded-lg border mt-6">
          <div className="p-4 space-y-1">
            <h3 className="text-muted-foreground text-sm font-bold tracking-wider mb-2 px-3">
                {translations.profile.otherInfo}
            </h3>
            {profileOtherInfoLinks.map((item, index) => {
              if (item.labelKey === 'logOut') {
                 if (!user) return null;
                 return (
                    <button
                      key={index}
                      onClick={handleSignOut}
                      disabled={signOutPending}
                      className="w-full flex items-center justify-between py-3 cursor-pointer group disabled:opacity-50"
                    >
                        <div className='flex items-center gap-4'>
                            {signOutPending ? <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" /> : <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-destructive" />}
                            <span className="font-medium transition-colors group-hover:text-destructive">{translations.profile.logOut}</span>
                        </div>
                    </button>
                 );
              }
              if (item.labelKey === 'shareApp') {
                  return (
                    <button
                        key={index}
                        onClick={handleShare}
                        className="w-full flex items-center justify-between py-3 cursor-pointer group text-left"
                    >
                        <div className="flex items-center gap-4">
                            <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                            <span className="font-medium transition-colors group-hover:text-primary">
                                {translations.profile[item.labelKey]}
                            </span>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </button>
                  );
              }
              return (
                 <Link
                    key={index}
                    href={item.href}
                    className="flex items-center justify-between py-3 cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-muted-foreground transition-colors group-hover:text-primary" />
                        <span className="font-medium transition-colors group-hover:text-primary">
                        {translations.profile[item.labelKey]}
                        </span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </Link>
            )})}
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-8 p-1 bg-muted rounded-full">
            <Label htmlFor="theme-switch" className="flex-1 text-center">
                <div className={`w-full p-2 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 'light' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground'}`}>
                    <Sun className="w-4 h-4 mr-2" />
                    {translations.profile.lightMode}
                </div>
            </Label>
            <Switch
                id="theme-switch"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="hidden"
            />
             <Label htmlFor="theme-switch" className="flex-1 text-center">
                <div className={`w-full p-2 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 'dark' ? 'bg-gray-900 text-white shadow' : 'bg-transparent text-muted-foreground'}`}>
                    <Moon className="w-4 h-4 mr-2" />
                    {translations.profile.darkMode}
                </div>
            </Label>
        </div>


        <p className="text-center text-gray-400 text-sm mt-6">
          {translations.profile.appVersions}
        </p>
        <p className="text-center text-gray-500 font-bold">0.2</p>
      </main>
    </div>
  );
}
