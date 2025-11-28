
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
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const menuItems = [
    { icon: FileText, text: 'My plans', href: '/my-plans' },
    { icon: Smartphone, text: 'Native devices', href: '/native-devices' },
    { icon: BookUser, text: 'Address book' },
    { icon: Star, text: 'Plus membership' },
    { icon: Star, text: 'My rating', notification: 1 },
    { icon: Settings, text: 'Setting', notification: 1 },
    // Add more items to demonstrate scrolling
    { icon: FileText, text: 'Another Item' },
    { icon: Smartphone, text: 'More Devices' },
    { icon: BookUser, text: 'Another Address' },
    { icon: Star, text: 'Extra Membership' },
    { icon: Settings, text: 'More Settings' },
  ];

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
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
            <span>Payments</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Headset className="w-6 h-6" />
            </div>
            <span>Support</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-gray-800 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
            <span>Wallet</span>
          </div>
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
          <h3 className="text-gray-400 text-sm font-bold tracking-wider">OTHER INFORMATION</h3>
        </div>
      </div>
    </div>
  );
}
