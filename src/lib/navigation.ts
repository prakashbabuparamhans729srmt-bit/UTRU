
import {
    LayoutDashboard,
    Box,
    Building,
    List,
    Calendar,
    Ticket,
    Users,
    CreditCard,
    Wallet,
    MessageSquare,
    Settings,
    Banknote,
    Tags,
    Plus,
    Wrench,
    User,
    MapPin,
    ClipboardList,
    Headset,
    FileText,
    Smartphone,
    BookUser,
    Star,
    Share2,
    Info,
    LogOut,
    Home as HomeIcon,
    BookCopy,
    PlaySquare,
    LayoutGrid,
    Globe,
    Bell,
    Mail,
    Phone,
    Shield,
    Download
  } from 'lucide-react';
  
  // From settings/page.tsx
  const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.38 1.25 4.81L2 22l5.3-1.38c1.37.72 2.93 1.13 4.57 1.13h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.47 16c-.22.54-.87 1-1.6.97-1.05-.05-2.22-.44-3.53-1.4-1.74-1.27-2.88-2.8-3.15-3.32-.28-.52-.5-1.12-.5-1.77 0-.65.23-1.21.63-1.63.33-.33.74-.48 1.08-.48h.1c.28 0 .53.08.73.28l.2.2c.4.4.65 1 .65 1.05s.03.4-.1.65l-1.07 1.23c-.15.15-.22.3-.1.45.12.15.53.84 1.25 1.55.93.93 1.63 1.22 1.83 1.32.2.1.35.08.48-.05l1.03-.98c.2-.2.4-.3.65-.3s.5.1.7.3l.2.2c.2.2.3.45.3.7s0 .55-.1.82l-.24.28zm-5.43-3.2c-.15.2-.15.3 0 .45l.15.15c.15.15.3.15.45 0l.15-.15c.15-.15.15-.3 0-.45l-.15-.15c-.15-.15-.3-.15-.45 0z" />
      </svg>
  );
  const SmsIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M14 9h-4" />
          <path d="M12 7v2" />
          <path d="M12 11v2" />
      </svg>
  );
  
  // For src/app/admin/page.tsx
  export const adminSidebarNav = [
      {
          items: [
              { name: 'Dashboard', icon: LayoutDashboard, isSelected: true },
              { name: 'Orders', icon: Box },
          ]
      },
      {
          title: 'MANAGEMENT',
          items: [
              { name: 'City', icon: Building },
          ]
      },
      {
          title: 'CATEGORIES',
          items: [
              { name: 'Main Category', icon: List, hasSubmenu: true },
          ]
      },
      {
          title: 'BUSINESS',
          items: [
              { name: 'TimeSlot & Date', icon: Calendar },
              { name: 'Banner', icon: Ticket },
              { name: 'Partner', icon: Users },
          ]
      },
      {
          title: 'FINANCE',
          items: [
              { name: 'Credit Packages', icon: CreditCard },
              { name: 'Payment Gateway', icon: Wallet },
          ]
      },
      {
          title: 'CONTENT',
          items: [
              { name: 'Testimonials', icon: MessageSquare },
          ]
      },
      {
          items: [
              { name: 'Settings', icon: Settings },
          ]
      }
  ];
  
  export const dashboardStats = [
      { title: 'Pending', value: '1413', valueClass: 'text-primary' },
      { title: 'Process', value: '2' },
      { title: 'Cancel', value: '90' },
      { title: 'Completed', value: '1' },
    ];
  
  export const dashboardCards = [
      { icon: Box, title: 'Total Orders', value: '1506', isHighlighted: true },
      { icon: Banknote, title: 'Total Sales', value: '₹ 534' },
      { icon: Ticket, title: 'Total Banners', value: '3' },
      { icon: List, title: 'Total Main Category', value: '9' },
      { icon: Wallet, title: 'Total Payment Gateway', value: '5' },
      { icon: List, title: 'Total Sub Category', value: '9' },
      { icon: List, title: 'Total Child Category', value: '41' },
      { icon: Plus, title: 'Total Add On', value: '36' },
      { icon: Calendar, title: 'Total Timeslot & Date', value: '9' },
      { icon: Users, title: 'Total Partner', value: '148' },
      { icon: Wrench, title: 'Total Partner Service', value: '57' },
      { icon: CreditCard, title: 'Total Credit Package', value: '3' },
      { icon: ClipboardList, title: 'Total Section', value: '1' },
      { icon: Wrench, title: 'Total Section Service', value: '4' },
      { icon: MapPin, title: 'Total City', value: '1' },
      { icon: User, title: 'Total Customer', value: '631' },
    ];
  
  
  // For src/app/location/* pages
  export const locationNavLinks = [
      { href: '/location', labelKey: 'my' },
      { href: '/district', labelKey: 'district' },
      { href: '/state', labelKey: 'state' },
      { href: '/bharat', labelKey: 'bharat' },
  ];
  
  // For src/app/page.tsx, src/app/location/* pages
  export const mainFooterNavLinks = [
      { href: '/', icon: HomeIcon, labelKey: 'home' },
      { href: '/cart', icon: BookCopy, labelKey: 'library' },
      { href: '/location', icon: LayoutGrid, isCentral: true, labelKey: '' },
      { href: '/search', icon: PlaySquare, labelKey: 'explore' },
      { href: '/profile', icon: LayoutGrid, labelKey: 'opinion' },
  ];
  
  // For src/app/page.tsx
  export const homeCategoryLinks = [
      { name: 'all', href: '/' },
      { name: 'electronics', href: '/electronics' },
      { name: 'beauty', href: '/beauty' },
      { name: 'kids', href: '/kids' },
      { name: 'gifting', href: '/gifting' },
      { name: 'premium', href: '/premium' },
  ];
  
  // For src/app/profile/page.tsx
  export const profileQuickAccessLinks = [
      { icon: CreditCard, text: 'Payments', href: '/payment-settings', labelKey: 'payments' },
      { icon: Headset, text: 'Support', href: '/support', labelKey: 'support' },
      { icon: Wallet, text: 'Wallet', href: '/wallet', labelKey: 'wallet' },
  ];
  
  export const profileMenuItems = [
      { icon: FileText, text: 'My plans', href: '/my-plans', labelKey: 'myPlans' },
      { icon: Smartphone, text: 'Native devices', href: '/native-devices', labelKey: 'nativeDevices' },
      { icon: BookUser, text: 'Address book', href: '/address', labelKey: 'addressBook' },
      { icon: Star, text: 'Plus membership', href: '/plus-membership', labelKey: 'plusMembership' },
      { icon: Star, text: 'My rating', href: '#', labelKey: 'myRating' },
      { icon: Settings, text: 'Setting', href: '/settings', labelKey: 'setting' },
  ];
  
  export const profileOtherInfoLinks = [
      { icon: Share2, text: 'Share the app', href: '#', labelKey: 'shareApp' },
      { icon: Info, text: 'About us', href: '/about', labelKey: 'aboutUs' },
      { icon: LogOut, text: 'Log out', href: '#', labelKey: 'logOut' },
  ];
  
  
  // For src/app/settings/page.tsx
  export const settingsItems = [
      { icon: WhatsappIcon, labelKey: 'whatsapp', defaultChecked: true },
      { icon: SmsIcon, labelKey: 'sms' },
      { icon: Mail, labelKey: 'email' },
      { icon: Bell, labelKey: 'pushNotification' },
      { icon: Phone, labelKey: 'voiceCalls' },
    ];
  
  export const settingsLanguageLink = {
      icon: Globe,
      href: '/language',
  };
  
  export const settingsAdminLinks = [
      { icon: Shield, href: '/admin', labelKey: 'masterAdminPanel' }
  ];
  
  export const settingsAppInstall = {
      icon: Download,
      label: 'Install App'
  };
  
  
  // For src/app/new-address/page.tsx
  export const addressTypes = [
      { icon: HomeIcon, label: 'home' },
      { icon: Building, label: 'work' },
      { icon: Hotel, label: 'hotel' },
      { icon: List, label: 'other' },
    ];
