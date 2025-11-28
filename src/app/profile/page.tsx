
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
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

export default function ProfilePage() {
  const menuItems = [
    { icon: FileText, text: 'My plans', href: '/my-plans' },
    { icon: Smartphone, text: 'Native devices', href: '/native-devices' },
    { icon: BookUser, text: 'Address book', href: '/address' },
    { icon: Star, text: 'Plus membership', href: '/plus-membership' },
    { icon: Star, text: 'My rating', notification: 1 },
    { icon: Settings, text: 'Setting', notification: 1, href: '/settings' },
  ];

  const otherInfoItems = [
      { icon: Share2, text: 'Share the app' },
      { icon: Info, text: 'About us' }
  ]

  const carImage = PlaceHolderImages.find((img) => img.id === 'refer-car');

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 relative flex flex-col items-center shrink-0">
        <Link href="/" className="absolute top-4 left-4">
          <Button size="icon" variant="ghost" className="bg-gray-700 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="mt-8 mb-4">
          <Avatar className="w-24 h-24 border-4 border-gray-700 ring-2 ring-teal-400">
            <AvatarImage src="https://picsum.photos/seed/user-profile/100/100" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <Link href="/login" className="w-4/5">
            <Button className="bg-teal-400 text-gray-900 font-bold rounded-full w-full hover:bg-teal-500 mb-2">
              Continue
            </Button>
        </Link>
        <p className="text-sm text-gray-400 mb-2">
          Log in or sign up to view your complete profile
        </p>

        <div className="flex justify-around w-full max-w-sm my-4">
          <Link href="/payment-settings" className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
            <span>Payments</span>
          </Link>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Headset className="w-6 h-6" />
            </div>
            <span>Support</span>
          </div>
          <Link href="/wallet" className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
            <span>Wallet</span>
          </Link>
        </div>
      </div>

      <div className="bg-white text-gray-900 rounded-t-3xl p-6 flex-grow overflow-y-auto">
        <div className="space-y-4">
          {menuItems.map((item, index) => {
            const ItemWrapper = item.href ? Link : 'div';
            const props = item.href ? { href: item.href } : {};
            return (
              <ItemWrapper key={index} {...props} className="flex items-center justify-between py-2 cursor-pointer">
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">{item.text}</span>
                  {item.notification && (
                    <div className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                      {item.notification}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </ItemWrapper>
            );
          })}
        </div>
        <div className="mt-8">
          <h3 className="text-gray-400 text-sm font-bold tracking-wider mb-4">OTHER INFORMATION</h3>
           <div className="space-y-4">
             {otherInfoItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <item.icon className="w-6 h-6 text-gray-600" />
                        <span className="font-medium">{item.text}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              ))}
                <div className="flex items-center gap-4 py-2 cursor-pointer">
                    <LogOut className="w-6 h-6 text-gray-600" />
                    <span className="font-medium">Log out</span>
                </div>
           </div>
        </div>

        {carImage && (
            <div className="bg-card text-card-foreground rounded-2xl p-4 mt-6 flex items-center gap-4 shadow-sm border">
                <div className='flex-1'>
                    <h4 className="font-bold text-lg">Refer or Earn</h4>
                    <p className="text-sm text-muted-foreground">Get ₹ 100 when your friend completes their first booking.</p>
                    <p className='text-sm font-semibold mt-2'>Hurry up</p>
                </div>
                <div className='relative w-2/5'>
                    <Image src={carImage.imageUrl} alt={carImage.description} width={150} height={75} className="object-contain" data-ai-hint={carImage.imageHint} />
                    <Button className="absolute -bottom-2 right-0 bg-teal-400 hover:bg-teal-500 text-white rounded-lg px-4 py-1 h-auto text-sm">Refer now</Button>
                </div>
            </div>
        )}

        <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" className="rounded-full flex-1">
                <Sun className="w-4 h-4 mr-2" />
                Light Mode
            </Button>
            <Button variant="secondary" className="rounded-full flex-1 bg-gray-200 text-black">
                <Moon className="w-4 h-4 mr-2" />
                Dark Mode
            </Button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">App Versions</p>
        <p className="text-center text-gray-500 font-bold">0.2</p>

      </div>
    </div>
  );
}
