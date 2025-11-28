
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Headset,
  Wallet,
  FileText,
  Smartphone,
  BookUser,
  Star,
  Settings,
  Share2,
  Info,
  LogOut,
  Sun,
  Moon,
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

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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

  const menuItems = [
    { icon: FileText, text: translations.profile.myPlans, href: '/my-plans' },
    {
      icon: Smartphone,
      text: translations.profile.nativeDevices,
      href: '/native-devices',
    },
    { icon: BookUser, text: translations.profile.addressBook, href: 'address' },
    {
      icon: Star,
      text: translations.profile.plusMembership,
      href: 'plus-membership',
    },
    { icon: Star, text: translations.profile.myRating },
    { icon: Settings, text: translations.profile.setting, href: '/settings' },
  ];

  const carImage = PlaceHolderImages.find((img) => img.id === 'refer-car');

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
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
          <Avatar className="w-24 h-24 border-4 border-gray-700 ring-2 ring-teal-400">
            <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <Link href="/login" className="w-4/5">
          <Button className="bg-teal-400 text-gray-900 font-bold rounded-full w-full hover:bg-teal-500 mb-2">
            {translations.profile.continue}
          </Button>
        </Link>
        <p className="text-sm text-gray-400 mb-2">
          {translations.profile.loginMessage}
        </p>

        <div className="flex justify-around w-full max-w-sm my-4">
          <Link
            href="/payment-settings"
            className="flex flex-col items-center gap-2"
          >
            <div className="p-3 bg-gray-800 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
            <span>{translations.profile.payments}</span>
          </Link>
          <Link href="/support" className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Headset className="w-6 h-6" />
            </div>
            <span>{translations.profile.support}</span>
          </Link>
          <Link href="/wallet" className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
            <span>{translations.profile.wallet}</span>
          </Link>
        </div>
      </div>

      <div className="bg-white text-gray-900 rounded-t-3xl p-6 flex-grow overflow-y-auto">
        <div className="space-y-4">
          {menuItems.map((item, index) => {
            const ItemWrapper = item.href ? Link : 'div';
            const props = item.href ? { href: item.href } : {};
            return (
              <ItemWrapper
                key={index}
                {...props}
                className="flex items-center justify-between py-2 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">{item.text}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </ItemWrapper>
            );
          })}
        </div>
        <div className="mt-8">
          <h3 className="text-gray-400 text-sm font-bold tracking-wider mb-4">
            {translations.profile.otherInfo}
          </h3>
          <div className="space-y-4">
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-between py-2 cursor-pointer text-left"
            >
              <div className="flex items-center gap-4">
                <Share2 className="w-6 h-6 text-gray-600" />
                <span className="font-medium">
                  {translations.profile.shareApp}
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
            <Link
              href="/about"
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <Info className="w-6 h-6 text-gray-600" />
                <span className="font-medium">
                  {translations.profile.aboutUs}
                </span>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </Link>
            <button
              onClick={() => alert('Log out functionality to be implemented')}
              className="w-full flex items-center gap-4 py-2 cursor-pointer text-left"
            >
              <LogOut className="w-6 h-6 text-gray-600" />
              <span className="font-medium">{translations.profile.logOut}</span>
            </button>
          </div>
        </div>

        {carImage && (
          <div className="bg-card text-card-foreground rounded-2xl p-4 mt-6 flex items-center gap-4 shadow-sm border">
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
              <Button className="absolute -bottom-2 right-0 bg-teal-400 hover:bg-teal-500 text-white rounded-lg px-4 py-1 h-auto text-sm">
                {translations.profile.referNow}
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 mt-8 p-1 bg-gray-200 rounded-full">
            <Label htmlFor="theme-switch" className="flex-1 text-center">
                <div className={`w-full p-2 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 'light' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500'}`}>
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
                <div className={`w-full p-2 rounded-full flex items-center justify-center cursor-pointer transition-colors ${theme === 'dark' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500'}`}>
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
