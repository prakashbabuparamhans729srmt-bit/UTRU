
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
    Download,
    Hotel,
    MoreHorizontal,
    Brush,
    Car,
    Gift,
    Sparkles,
    Baby,
    Circle,
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

  const CentralIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-380q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0-160q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm120 340q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280q17 0 28.5 11.5T280-240q0 17-11.5 28.5T240-200Zm0-160q-17 0-28.5-11.5T200-400q0-17 11.5-28.5T240-440q17 0 28.5 11.5T280-400q0 17-11.5 28.5T240-360Zm0-160q-17 0-28.5-11.5T200-560q0-17 11.5-28.5T240-600q17 0 28.5 11.5T280-560q0 17-11.5 28.5T240-520Zm0-160q-17 0-28.5-11.5T200-720q0-17 11.5-28.5T240-760q17 0 28.5 11.5T280-720q0 17-11.5 28.5T240-680Zm160 340q-25 0-42.5-17.5T340-400q0-25 17.5-42.5T400-460q25 0 42.5 17.5T460-400q0 25-17.5 42.5T400-340Zm0-160q-25 0-42.5-17.5T340-560q0-25 17.5-42.5T400-620q25 0 42.5 17.5T460-560q0 25-17.5 42.5T400-500Zm0 300q-17 0-28.5-11.5T360-240q0-17 11.5-28.5T400-280q17 0 28.5 11.5T440-240q0 17-11.5 28.5T400-200Zm0-480q-17 0-28.5-11.5T360-720q0-17 11.5-28.5T400-760q17 0 28.5 11.5T440-720q0 17-11.5 28.5T400-680Zm0 580q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0-720q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm160 480q-25 0-42.5-17.5T500-400q0-25 17.5-42.5T560-460q25 0 42.5 17.5T620-400q0 25-17.5 42.5T560-340Zm0-160q-25 0-42.5-17.5T500-560q0-25 17.5-42.5T560-620q25 0 42.5 17.5T620-560q0 25-17.5 42.5T560-500Zm0 300q-17 0-28.5-11.5T520-240q0-17 11.5-28.5T560-280q17 0 28.5 11.5T600-240q0 17-11.5 28.5T560-200Zm0-480q-17 0-28.5-11.5T520-720q0-17 11.5-28.5T560-760q17 0 28.5 11.5T600-720q0 17-11.5 28.5T560-680Zm0 580q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0-720q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm160 620q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200Zm0-160q-17 0-28.5-11.5T680-400q0-17 11.5-28.5T720-440q17 0 28.5 11.5T760-400q0 17-11.5 28.5T720-360Zm0-160q-17 0-28.5-11.5T680-560q0-17 11.5-28.5T720-600q17 0 28.5 11.5T760-560q0 17-11.5 28.5T720-520Zm0-160q-17 0-28.5-11.5T680-720q0-17 11.5-28.5T720-760q17 0 28.5 11.5T760-720q0 17-11.5 28.5T720-680Zm120 300q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0-160q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Z"/></svg>
  );

  const OpinionIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M390-120q-51 0-88-35.5T260-241q-60-8-100-53t-40-106q0-21 5.5-41.5T142-480q-11-18-16.5-38t-5.5-42q0-61 40-105.5t99-52.5q3-51 41-86.5t90-35.5q26 0 48.5 10t41.5 27q18-17 41-27t49-10q52 0 89.5 35t40.5 86q59 8 99.5 53T840-560q0 22-5.5 42T818-480q11 18 16.5 38.5T840-400q0 62-40.5 106.5T699-241q-5 50-41.5 85.5T570-120q-25 0-48.5-9.5T480-156q-19 17-42 26.5t-48 9.5Zm130-590v460q0 21 14.5 35.5T570-200q20 0 34.5-16t15.5-36q-21-8-38.5-21.5T550-306q-10-14-7.5-30t16.5-26q14-10 30-7.5t26 16.5q11 16 28 24.5t37 8.5q33 0 56.5-23.5T760-400q0-5-.5-10t-2.5-10q-17 10-36.5 15t-40.5 5q-17 0-28.5-11.5T640-440q0-17 11.5-28.5T680-480q33 0 56.5-23.5T760-560q0-33-23.5-56T680-640q-11 18-28.5 31.5T613-587q-16 6-31-1t-20-23q-5-16 1.5-31t22.5-20q15-5 24.5-18t9.5-30q0-21-14.5-35.5T570-760q-21 0-35.5 14.5T520-710Zm-80 460v-460q0-21-14.5-35.5T390-760q-21 0-35.5 14.5T340-710q0 16 9 29.5t24 18.5q16 5 23 20t2 31q-6 16-21 23t-31 1q-21-8-38.5-21.5T279-640q-32 1-55.5 24.5T200-560q0 33 23.5 56.5T280-480q17 0 28.5 11.5T320-440q0 17-11.5 28.5T280-400q-21 0-40.5-5T203-420q-2 5-2.5 10t-.5 10q0 33 23.5 56.5T280-320q20 0 37-8.5t28-24.5q10-14 26-16.5t30 7.5q14 10 16.5 26t-7.5 30q-14 19-32 33t-39 22q1 20 16 35.5t35 15.5q21 0 35.5-14.5T440-250Zm40-230Z"/></svg>
  );
  
  // For src/app/page.tsx, src/app/location/* pages
  export const mainFooterNavLinks = [
    { href: '/', icon: HomeIcon, labelKey: 'home' },
    { href: '/library', icon: BookCopy, labelKey: 'library' },
    { href: '/explore-action', icon: CentralIcon, labelKey: 'central', isCentral: true },
    { href: '/explore', icon: PlaySquare, labelKey: 'explore' },
    { href: '/opinion', icon: OpinionIcon, labelKey: 'opinion' },
  ];
  
  // For src/app/page.tsx
  export const homeCategoryLinks = [
      { name: 'all', href: '/' },
      { name: 'electronics', href: '/services/repairs' },
      { name: 'beauty', href: '/beauty' },
      { name: 'kids', href: '/kids' },
      { name: 'gifting', href: '/gifting' },
      { name: 'premium', href: '/cleaning' },
  ];

  export const mainCategoryGrid = [
    { href: '/cleaning', icon: Sparkles, labelKey: 'premium' },
    { href: '/beauty', icon: Brush, labelKey: 'beauty' },
    { href: '/electronics', icon: Wrench, labelKey: 'electronics' },
    { href: '/kids', icon: Baby, labelKey: 'kids' },
    { href: '/gifting', icon: Gift, labelKey: 'gifting' },
    { href: '/car', icon: Car, labelKey: 'car' },
    { href: '/painting', icon: Brush, labelKey: 'painting' },
    { href: '/more', icon: MoreHorizontal, labelKey: 'more' },
  ];
  
  // For src/app/profile/page.tsx
  
  export const profileHeaderLinks = [
    { icon: CreditCard, text: 'Payments', href: '/payment-settings', labelKey: 'payments' },
    { icon: Headset, text: 'Support', href: '/support', labelKey: 'support' },
    { icon: Wallet, text: 'Wallet', href: '/wallet', labelKey: 'wallet' },
  ];

  export const profileMenuItems = [
      { icon: Star, text: 'Setting', href: '/settings', labelKey: 'setting' },
      { icon: FileText, text: 'My plans', href: '/my-plans', labelKey: 'myPlans' },
      { icon: Smartphone, text: 'Native devices', href: '/native-devices', labelKey: 'nativeDevices' },
      { icon: BookUser, text: 'Address book', href: '/address', labelKey: 'addressBook' },
      { icon: Star, text: 'Plus membership', href: '/plus-membership', labelKey: 'plusMembership' },
      { icon: Star, text: 'My rating', href: '#', labelKey: 'myRating' },
  ];
  
  export const profileOtherInfoLinks = [
      { icon: Share2, text: 'Share the app', href: '/refer', labelKey: 'shareApp' },
      { icon: Info, text: 'About us', href: '/about', labelKey: 'aboutUs' },
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
      { icon: HomeIcon, labelKey: 'home' },
      { icon: Building, labelKey: 'work' },
      { icon: Hotel, labelKey: 'hotel' },
      { icon: MoreHorizontal, labelKey: 'other' },
    ];

  // For src/components/ui/SideNavigationBar.tsx
  export const sideNavLinks = [
    { icon: FileText, text: 'My Bookings', href: '/my-plans', labelKey: 'myPlans' },
    { icon: BookUser, text: 'Address book', href: '/address', labelKey: 'addressBook' },
    { icon: Star, text: 'Plus membership', href: '/plus-membership', labelKey: 'plusMembership' },
    { icon: Wallet, text: 'My Wallet', href: '/wallet', labelKey: 'wallet' },
    { icon: Star, text: 'My Ratings', href: '#', labelKey: 'myRating' },
    { icon: CreditCard, text: 'My Payments', href: '/payment-settings', labelKey: 'payments' },
    { icon: Share2, text: 'Share App', href: '/refer', labelKey: 'shareApp' },
    { icon: Info, text: 'About Us', href: '/about', labelKey: 'aboutUs' },
    { icon: Settings, text: 'Settings', href: '/settings', labelKey: 'setting' },
  ];

// For src/app/more/page.tsx
export interface ServiceCategory {
  name: string;
  children?: ServiceCategory[];
}

export const allServiceCategories: ServiceCategory[] = [
    {
        name: "मुख्य सेवा श्रेणियाँ",
        children: [
            {
                name: "पेशेवर एवं कुशल सेवाएँ",
                children: [
                    { name: "सूचना प्रौद्योगिकी (IT) सेवाएँ" },
                    { name: "डिजिटल मार्केटिंग सेवाएँ" },
                    { name: "इंजीनियरिंग सेवाएँ" },
                    { name: "वास्तुकला सेवाएँ" },
                    { name: "परामर्श सेवाएँ (मैनेजमेंट, बिजनेस)" },
                    { name: "मानव संसाधन (HR) सेवाएँ" },
                    { name: "भर्ती सेवाएँ" },
                    { name: "बाजार अनुसंधान सेवाएँ" },
                    { name: "विज्ञापन सेवाएँ" },
                    { name: "जनसंपर्क (PR) सेवाएँ" },
                    { name: "मरम्मत एवं रखरखाव सेवाएँ (तकनीकी उपकरण)" },
                    { name: "पैकेजिंग सेवाएँ" },
                    { name: "मुद्रण एवं प्रकाशन सेवाएँ" },
                    { name: "सुरक्षा सेवाएँ" },
                    { name: "सर्वेक्षण एवं मानचित्रण सेवाएँ" },
                    { name: "फोटोग्राफी एवं वीडियोग्राफी सेवाएँ" },
                    { name: "संगीत एवं ऑडियो सेवाएँ (रिकॉर्डिंग, मिक्सिंग)" },
                    { name: "अनुवाद एवं दुभाषिया सेवाएँ" },
                    { name: "नोटरी सेवाएँ" },
                    { name: "दस्तावेज़ीकरण सेवाएँ" },
                    { name: "पैकेजिंग सेवाएँ" },
                    { name: "एआई एवं मशीन लर्निंग सेवाएँ" },
                    { name: "क्लाउड कंप्यूटिंग सेवाएँ" },
                    { name: "साइबर सुरक्षा सेवाएँ" },
                    { name: "ब्लॉकचेन सेवाएँ" },
                    { name: "वर्चुअल रियलिटी (VR) / ऑगमेंटेड रियलिटी (AR) सेवाएँ" },
                    { name: "ड्रोन सेवाएँ" },
                    { name: "मॉडलिंग सेवाएँ" },
                    { name: "वॉयस-ओवर एवं डबिंग सेवाएँ" },
                    { name: "बीपीओ/केपीओ/एलपीओ सेवाएँ" },
                ]
            },
            {
                name: "स्वास्थ्य सेवाएँ",
                children: [
                    { name: "चिकित्सा परामर्श (एलोपैथी, होम्योपैथी)" },
                    { name: "आयुर्वेदिक सेवाएँ" },
                    { name: "यूनानी चिकित्सा सेवाएँ" },
                    { name: "प्राकृतिक चिकित्सा सेवाएँ" },
                    { name: "पंचकर्म एवं शिरोधारा सेवाएँ" },
                    { name: "फिटनेस एवं व्यायाम प्रशिक्षण" },
                    { name: "योग एवं ध्यान प्रशिक्षण" },
                    { name: "नर्सिंग सेवाएँ" },
                    { name: "फार्मेसी सेवाएँ" },
                    { name: "एम्बुलेंस सेवाएँ" },
                    { name: "चिकित्सा लिपिकीय सेवाएँ" },
                    { name: "नैदानिक प्रयोगशाला परीक्षण" },
                    { name: "वरिष्ठ नागरिक देखभाल सेवाएँ" },
                    { name: "बाल देखभाल सेवाएँ (शिशु)" },
                    { name: "दिव्यांग सहायता सेवाएँ" },
                    { name: "पशु चिकित्सा सेवाएँ" },
                    { name: "पालतू पशु देखभाल सेवाएँ" },
                    { name: "मानसिक स्वास्थ्य परामर्श" },
                    { name: "शारीरिक चिकित्सा" },
                    { name: "व्यावसायिक चिकित्सा" },
                    { name: "भाषण चिकित्सा" },
                    { name: "आहार एवं पोषण परामर्श" },
                    { name: "वजन प्रबंधन सेवाएँ" },
                    { name: "स्वास्थ्य जाँच शिविर" },
                    { name: "टेलीमेडिसिन सेवाएँ" },
                    { name: "मोबाइल क्लिनिक सेवाएँ" },
                    { name: "मेडिकल टूरिज्म सेवाएँ" },
                    { name: "वृद्धाश्रम सेवाएँ" },
                    { name: "नशा मुक्ति सेवाएँ" },
                ]
            },
            {
                name: "शिक्षा एवं प्रशिक्षण सेवाएँ",
                children: [
                    { name: "औपचारिक शिक्षण (स्कूल, कॉलेज, कोचिंग)" },
                    { name: "व्यावसायिक प्रशिक्षण" },
                    { name: "कौशल विकास प्रशिक्षण" },
                    { name: "ऑनलाइन पाठ्यक्रम एवं वेबिनार" },
                    { name: "भाषा प्रशिक्षण" },
                    { name: "कंप्यूटर शिक्षा" },
                    { name: "प्रतियोगी परीक्षा कोचिंग" },
                    { name: "कला एवं शिल्प प्रशिक्षण (चित्रकला, मधुबनी, पट्टचित्र)" },
                    { name: "संगीत एवं नृत्य प्रशिक्षण" },
                    { name: "खेल प्रशिक्षण" },
                    { name: "ड्राइविंग स्कूल" },
                    { name: "व्यक्तित्व विकास प्रशिक्षण" },
                    { name: "कैरियर परामर्श" },
                    { name: "रोजगार सहायता सेवाएँ" },
                    { name: "साक्षात्कार प्रशिक्षण" },
                    { name: "रिज्यूमे लेखन सेवाएँ" },
                    { name: "प्रवासी श्रमिक शिक्षा केंद्र" },
                    { name: "विशेष शिक्षा (दिव्यांग बच्चों के लिए)" },
                    { name: "प्रीस्कूल एवं डेकेयर सेवाएँ" },
                    { name: "होम ट्यूशन सेवाएँ" },
                    { name: "लाइब्रेरी सेवाएँ" },
                    { name: "संग्रहालय एवं संस्कृति संवर्धन सेवाएँ" },
                    { name: "एनिमेशन एवं VFX प्रशिक्षण" },
                    { name: "फैशन डिजाइन प्रशिक्षण" },
                ]
            },
            {
                name: "वित्तीय सेवाएँ",
                children: [
                    { name: "बैंकिंग सेवाएँ (बचत, चालू खाता, FD)" },
                    { name: "ऋण सेवाएँ (होम लोन, कार लोन, पर्सनल लोन)" },
                    { name: "निवेश सेवाएँ (म्यूचुअल फंड, शेयर बाजार, SIP)" },
                    { name: "बीमा सेवाएँ (जीवन, स्वास्थ्य, वाहन, संपत्ति)" },
                    { name: "कर (Tax) परामर्श एवं योजना" },
                    { name: "लेखा (Accounting) सेवाएँ" },
                    { name: "लेखा परीक्षा (Auditing) सेवाएँ" },
                    { name: "पेंशन योजना सेवाएँ" },
                    { name: "धन प्रबंधन (Wealth Management)" },
                    { name: "मर्चेंट बैंकिंग" },
                    { name: "वेंचर कैपिटल एवं निजी इक्विटी सेवाएँ" },
                    { name: "क्रेडिट रेटिंग सेवाएँ" },
                    { name: "डेब्ट कलेक्शन सेवाएँ" },
                    { name: "फॉरेक्स (विदेशी मुद्रा) सेवाएँ" },
                    { name: "क्रिप्टोकरेंसी एक्सचेंज एवं वॉलेट सेवाएँ" },
                    { name: "पॉइंट ऑफ सेल (POS) एवं पेमेंट गेटवे सेवाएँ (UPI सेटअप)" },
                    { name: "रेमिटेंस (प्रेषण) सेवाएँ" },
                    { name: "माइक्रोफाइनेंस सेवाएँ" },
                ]
            },
            {
                name: "कानूनी सेवाएँ",
                children: [
                    { name: "वकील / विधि परामर्श" },
                    { name: "अदालती कार्यवाही एवं प्रतिनिधित्व" },
                    { name: "दस्तावेज़ तैयार करना (समझौता, अनुबंध, वसीयत)" },
                    { name: "संपत्ति कानून सेवाएँ (खरीद-बिक्री, पंजीकरण)" },
                    { name: "कॉर्पोरेट कानून सेवाएँ" },
                    { name: "बौद्धिक संपदा अधिकार (IPR) सेवाएँ" },
                    { name: "कर (Tax) संबंधी कानूनी सेवाएँ" },
                    { name: "श्रम कानून परामर्श" },
                    { name: "अपराधिक कानून सेवाएँ" },
                    { name: "दिवानी मुकदमेबाजी" },
                    { name: "पारिवारिक कानून सेवाएँ (विवाह, तलाक, दत्तकग्रहण)" },
                    { name: "विवाद समाधान एवं मध्यस्थता" },
                    { name: "दिवाला एवं शोधन अक्षमता कानून" },
                    { name: "साइबर कानून परामर्श" },
                    { name: "पर्यावरण कानून परामर्श" },
                    { name: "वीजा एवं आप्रवासन कानून सहायता" },
                    { name: "सीमा शुल्क एवं अंतर्राष्ट्रीय व्यापार कानून" },
                    { name: "कानूनी अनुवाद सेवाएँ" },
                    { name: "नोटरी सेवाएँ" },
                    { name: "शपथ पत्र तैयार करना" },
                ]
            }
        ]
    }
];

    