
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
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
import { profileMenuItems, profileOtherInfoLinks, profileQuickAccessLinks } from '@/lib/navigation.tsx';
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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-4 relative flex flex-col items-center shrink-0">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 left-4 rounded-full bg-black text-white hover:bg-gray-700"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="mt-8 mb-4">
            <Avatar className="w-24 h-24 border-4 border-gray-700 ring-2 ring-primary">
                {userLoading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : (
                    <>
                        {user?.photoURL ? (
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                        ) : (
                            <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" />
                        )}
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </>
                )}
            </Avatar>
        </div>

        {userLoading ? (
            <div className="text-center w-full max-w-xs space-y-2 mx-auto">
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
        ) : user ? (
            <div className='text-center'>
                <h2 className="text-xl font-bold">{user.displayName || 'Welcome User'}</h2>
                <p className="text-sm text-gray-400 mb-2">
                  {user.phoneNumber || user.email}
                </p>
            </div>
        ) : (
          <div className="text-center w-full">
            <Link href="/phone-login" className="w-4/5 inline-block">
              <Button className="bg-primary text-primary-foreground font-bold rounded-full w-full hover:bg-primary/90 mb-2">
                {translations.profile.continue}
              </Button>
            </Link>
            <p className="text-sm text-gray-400 mb-2">
              {translations.profile.loginMessage}
            </p>
          </div>
        )}


        <div className="flex justify-around w-full max-w-sm my-4">
          {profileQuickAccessLinks.map((item, index) => (
            <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center gap-2 text-white"
            >
                <div className="p-3 bg-gray-800 rounded-full">
                <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm">{translations.profile[item.labelKey]}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-t-3xl p-6 flex-grow overflow-y-auto">
        <div className="space-y-4">
          {profileMenuItems.map((item, index) => (
            <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between py-2 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                  <span className="font-medium">{translations.profile[item.labelKey]}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </Link>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-muted-foreground text-sm font-bold tracking-wider mb-4">
            {translations.profile.otherInfo}
          </h3>
          <div className="space-y-4">
            {profileOtherInfoLinks.map((item, index) => {
              // Conditionally render based on the link's purpose
              if (item.labelKey === 'logOut') {
                 if (!user) return null; // Don't show log out if not logged in
                 return (
                    <button
                      key={index}
                      onClick={handleSignOut}
                      disabled={signOutPending}
                      className="w-full flex items-center gap-4 py-2 cursor-pointer text-left disabled:opacity-50"
                    >
                      {signOutPending ? <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" /> : <item.icon className="w-6 h-6 text-muted-foreground" />}
                      <span className="font-medium">{translations.profile.logOut}</span>
                    </button>
                 );
              }
              if (item.labelKey === 'shareApp') {
                  return (
                    <button
                        key={index}
                        onClick={handleShare}
                        className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
                    >
                        <div className="flex items-center gap-4">
                            <item.icon className="w-6 h-6 text-muted-foreground" />
                            <span className="font-medium">
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
                    className="flex items-center justify-between py-2 cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-muted-foreground" />
                        <span className="font-medium">
                        {translations.profile[item.labelKey]}
                        </span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </Link>
            )})}
          </div>
        </div>

        {carImage && (
          <div className="bg-card-foreground/5 dark:bg-gray-800 text-card-foreground rounded-2xl p-4 mt-6 flex items-center gap-4 shadow-sm border">
            <div className="flex-1">
              <h4 className="font-bold text-lg">
                {translations.profile.referEarn}
              </h4>
              <p className="text-sm text-muted-foreground">
                {translations.profile.referEarnDescription}
              </p>
              <p className="text-sm font-semibold mt-2">
                {translations.profile.hurryUp}
              </p>
            </div>
            <div className="relative w-2/5">
              <Image
                src={carImage.imageUrl}
                alt={carImage.description}
                width={150}
                height={75}
                className="object-contain"
                data-ai-hint={carImage.imageHint}
              />
              <Button className="absolute -bottom-2 right-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-1 h-auto text-sm">
                {translations.profile.referNow}
              </Button>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}
