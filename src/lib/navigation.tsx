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
    Quote,
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
    { href: '/library', icon: BookCopy, labelKey: 'library' },
    { href: '/more', icon: LayoutGrid, labelKey: 'more', isCentral: true },
    { href: '/explore', icon: PlaySquare, labelKey: 'explore' },
    { href: '/opinion', icon: Quote, labelKey: 'opinion' },
  ];
  
  // For src/app/page.tsx
  export const homeCategoryLinks = [
      { name: 'all', href: '/' },
      { name: 'electronics', href: '/electronics' },
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
      { icon: FileText, text: 'My plans', href: '/my-plans', labelKey: 'myPlans' },
      { icon: Smartphone, text: 'Native devices', href: '/native-devices', labelKey: 'nativeDevices' },
      { icon: BookUser, text: 'Address book', href: '/address', labelKey: 'addressBook' },
      { icon: Star, text: 'Plus membership', href: '/plus-membership', labelKey: 'plusMembership' },
      { icon: Star, text: 'My rating', href: '/my-ratings', labelKey: 'myRating' },
      { icon: Settings, text: 'Setting', href: '/settings', labelKey: 'setting' },
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
    { icon: Star, text: 'My Ratings', href: '/my-ratings', labelKey: 'myRating' },
    { icon: CreditCard, text: 'My Payments', href: '/payment-settings', labelKey: 'payments' },
    { icon: Share2, text: 'Share App', href: '/refer', labelKey: 'shareApp' },
    { icon: Info, text: 'About Us', href: '/about', labelKey: 'aboutUs' },
    { icon: Settings, text: 'Settings', href: '/settings', labelKey: 'setting' },
  ];

// For src/app/more/page.tsx
export interface ServiceCategory {
  id: string;
  name: string;
  children?: ServiceCategory[];
  serviceId?: string;
  imageHint: string;
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
    },
    { name: "सूचना प्रौद्योगिकी सेवाएँ" },
    { name: "डिजिटल मार्केटिंग सेवाएँ" },
    { name: "कृषि सेवाएँ" },
    { name: "ऑटोमोटिव सेवाएँ" },
    { name: "निर्माण सेवाएँ" },
    { name: "रियल एस्टेट सेवाएँ" },
    { name: "यात्रा एवं पर्यटन सेवाएँ" },
    { name: "आतिथ्य सेवाएँ" },
    { name: "खाद्य एवं खानपान सेवाएँ" },
    { name: "इवेंट प्रबंधन सेवाएँ" },
    { name: "विवाह योजना सेवाएँ" },
    { name: "रसद एवं परिवहन सेवाएँ" },
    { name: "कूरियर एवं वितरण सेवाएँ" },
    { name: "सौंदर्य एवं कल्याण सेवाएँ" },
    { name: "फिटनेस एवं खेल सेवाएँ" },
    { name: "मनोरंजन सेवाएँ" },
    { name: "मीडिया एवं प्रसारण सेवाएँ" },
    { name: "दूरसंचार सेवाएँ" },
    { name: "मरम्मत एवं रखरखाव सेवाएँ" },
    { name: "सफाई एवं स्वच्छता सेवाएँ" },
    { name: "कीट नियंत्रण सेवाएँ" },
    { name: "सुरक्षा सेवाएँ" },
    { name: "पैकेजिंग सेवाएँ" },
    { name: "मुद्रण एवं प्रकाशन सेवाएँ" },
    { name: "फोटोग्राफी एवं वीडियोग्राफी सेवाएँ" },
    { name: "संगीत एवं ऑडियो सेवाएँ" },
    { name: "कला एवं शिल्प सेवाएँ" },
    { name: "आंतरिक सज्जा सेवाएँ" },
    { name: "वास्तुकला सेवाएँ" },
    { name: "इंजीनियरिंग सेवाएँ" },
    { name: "परामर्श सेवाएँ" },
    { name: "मानव संसाधन सेवाएँ" },
    { name: "भर्ती सेवाएँ" },
    { name: "बाजार अनुसंधान सेवाएँ" },
    { name: "विज्ञापन सेवाएँ" },
    { name: "जनसंपर्क सेवाएँ" },
    { name: "बीमा सेवाएँ" },
    { name: "बैंकिंग सेवाएँ" },
    { name: "निवेश सेवाएँ" },
    { name: "कर सेवाएँ" },
    { name: "लेखा सेवाएँ" },
    { name: "लेखा परीक्षा सेवाएँ" },
    { name: "आयात-निर्यात सेवाएँ" },
    { name: "सीमा शुल्क निकासी सेवाएँ" },
    { name: "गोदाम सेवाएँ" },
    { name: "कोल्ड स्टोरेज सेवाएँ" },
    { name: "विनिर्माण सेवाएँ" },
    { name: "गुणवत्ता नियंत्रण सेवाएँ" },
    { name: "प्रयोगशाला परीक्षण सेवाएँ" },
    { name: "चिकित्सा लिपिकीय सेवाएँ" },
    { name: "फार्मेसी सेवाएँ" },
    { name: "एम्बुलेंस सेवाएँ" },
    { name: "नर्सिंग सेवाएँ" },
    { name: "वरिष्ठ नागरिक देखभाल सेवाएँ" },
    { name: "बाल देखभाल सेवाएँ" },
    { name: "दिव्यांग सहायता सेवाएँ" },
    { name: "पशु चिकित्सा सेवाएँ" },
    { name: "पालतू पशु देखभाल सेवाएँ" },
    { name: "पर्यावरण सेवाएँ" },
    { name: "अपशिष्ट प्रबंधन सेवाएँ" },
    { name: "पुनर्चक्रण सेवाएँ" },
    { name: "जल उपचार सेवाएँ" },
    { name: "सौर ऊर्जा सेवाएँ" },
    { name: "विद्युत सेवाएँ" },
    { name: "प्लंबिंग सेवाएँ" },
    { name: "बढ़ई सेवाएँ" },
    { name: "राजगीरी सेवाएँ" },
    { name: "पेंटिंग सेवाएँ" },
    { name: "बागवानी सेवाएँ" },
    { name: "भूदृश्य डिजाइन सेवाएँ" },
    { name: "स्विमिंग पूल सेवाएँ" },
    { name: "लिफ्ट रखरखाव सेवाएँ" },
    { name: "अग्नि सुरक्षा सेवाएँ" },
    { name: "आपदा प्रबंधन सेवाएँ" },
    { name: "अनुवाद सेवाएँ" },
    { name: "दुभाषिया सेवाएँ" },
    { name: "नोटरी सेवाएँ" },
    { name: "दस्तावेज़ीकरण सेवाएँ" },
    { name: "वीजा एवं आप्रवासन सेवाएँ" },
    { name: "ज्योतिष एवं वास्तु सेवाएँ" },
    { name: "आध्यात्मिक सेवाएँ" },
    { name: "परामर्शदाता सेवाएँ" },
    { name: "चिकित्सा सेवाएँ (थेरेपी)" },
    { name: "योग एवं ध्यान सेवाएँ" },
    { name: "रोमांचक खेल सेवाएँ" },
    { name: "नौका सेवाएँ" },
    { name: "किराया सेवाएँ" },
    { name: "लॉन्ड्री सेवाएँ" },
    { name: "ड्राई क्लीनिंग सेवाएँ" },
    { name: "दर्जी सेवाएँ" },
    { name: "गहना मरम्मत सेवाएँ" },
    { name: "घड़ी मरम्मत सेवाएँ" },
    { name: "चाबी बनाने की सेवाएँ" },
    { name: "ताला बनाने की सेवाएँ" },
    { name: "गाड़ी खींचने की सेवाएँ" },
    { name: "सर्वेक्षण सेवाएँ" },
    { name: "मानचित्रण सेवाएँ" },
    { name: "ड्रोन सेवाएँ" },
    { name: "ब्लॉकचेन सेवाएँ" },
    { name: "एआई एवं मशीन लर्निंग सेवाएँ" },
    { name: "क्लाउड कंप्यूटिंग सेवाएँ" },
    { name: "साइबर सुरक्षा सेवाएँ" },
    { name: "ऐप विकास सेवाएँ" },
    { name: "वेब विकास सेवाएँ" },
    { name: "गेम विकास सेवाएँ" },
    { name: "एनिमेशन सेवाएँ" },
    { name: "विएफएक्स सेवाएँ" },
    { name: "फैशन डिजाइन सेवाएँ" },
    { name: "मॉडलिंग सेवाएँ" },
    { name: "वॉयस ओवर सेवाएँ" },
    { name: "डबिंग सेवाएँ" },
    { name: "उपशीर्षक सेवाएँ" },
    { name: "ट्रांसक्रिप्शन सेवाएँ" },
    { name: "कॉल सेंटर सेवाएँ" },
    { name: "बीपीओ सेवाएँ" },
    { name: "केपीओ सेवाएँ" },
    { name: "एलपीओ सेवाएँ" },
    { name: "सह-कार्य स्थान सेवाएँ" },
    { name: "वर्चुअल ऑफिस सेवाएँ" },
    { name: "भंडारण सेवाएँ" },
    { name: "स्थानांतरण सेवाएँ" },
    { name: "होम ऑटोमेशन सेवाएँ" },
    { name: "स्मार्ट सिटी सेवाएँ" },
    { name: "ई-कॉमर्स सेवाएँ" },
    { name: "अंतिम-मील वितरण सेवाएँ" },
    { name: "भवन निरीक्षण सेवाएँ" },
    { name: "औद्योगिक प्रशिक्षण सेवाएँ" },
    { name: "खाद्य सुरक्षा प्रमाणन सेवाएँ" },
    { name: "प्रमाणन एवं प्रत्यायन सेवाएँ" },
    { name: "विवाद समाधान सेवाएँ" },
    { name: "मध्यस्थता सेवाएँ" },
    { name: "शिकायत निवारण सेवाएँ" },
    { name: "उपभोक्ता फोरम सहायता सेवाएँ" },
    { name: "गृहकार्य सहायता सेवाएँ" },
    { name: "ट्यूशन एजेंसी सेवाएँ" },
    { name: "छात्रावास सेवाएँ" },
    { name: "पुस्तकालय सेवाएँ" },
    { name: "संग्रहालय सेवाएँ" },
    { name: "संस्कृति संवर्धन सेवाएँ" },
    { name: "पारंपरिक कला संरक्षण सेवाएँ" },
    { name: "जल संरक्षण सेवाएँ" },
    { name: "वन्यजीव संरक्षण सेवाएँ" },
    { name: "जैविक खेती परामर्श सेवाएँ" },
    { name: "मृदा परीक्षण सेवाएँ" },
    { name: "जल परीक्षण सेवाएँ" },
    { name: "वायु गुणवत्ता परीक्षण सेवाएँ" },
    { name: "औद्योगिक सुरक्षा सेवाएँ" },
    { name: "कार्यस्थल सुरक्षा सेवाएँ" },
    { name: "स्वास्थ्य जाँच शिविर सेवाएँ" },
    { name: "टेलीमेडिसिन सेवाएँ" },
    { name: "मोबाइल क्लिनिक सेवाएँ" },
    { name: "दवा वितरण सेवाएँ" },
    { name: "मेडिकल टूरिज्म सेवाएँ" },
    { name: "आयुर्वेदिक उपचार सेवाएँ" },
    { name: "यूनानी चिकित्सा सेवाएँ" },
    { name: "प्राकृतिक चिकित्सा सेवाएँ" },
    { name: "पंचकर्म सेवाएँ" },
    { name: "शिरोधारा सेवाएँ" },
    { name: "रेकी चिकित्सा सेवाएँ" },
    { name: "क्रायोथेरेपी सेवाएँ" },
    { name: "हाइड्रोथेरेपी सेवाएँ" },
    { name: "पोषण परामर्श सेवाएँ" },
    { name: "आहार योजना सेवाएँ" },
    { name: "वजन प्रबंधन सेवाएँ" },
    { name: "डिटॉक्स सेवाएँ" },
    { name: "स्वास्थ्य शिविर आयोजन सेवाएँ" },
    { name: "प्राथमिक चिकित्सा प्रशिक्षण सेवाएँ" },
    { name: "सीपीआर प्रशिक्षण सेवाएँ" },
    { name: "औषधीय पौधे खेती सेवाएँ" },
    { name: "हर्बल उत्पाद निर्माण सेवाएँ" },
    { name: "औषधि अनुसंधान सेवाएँ" },
    { name: "नैदानिक परीक्षण सेवाएँ" },
    { name: "बायोमेडिकल अपशिष्ट प्रबंधन सेवाएँ" },
    { name: "चिकित्सा उपकरण कैलिब्रेशन सेवाएँ" },
    { name: "अस्पताल प्रबंधन सेवाएँ" },
    { name: "क्लिनिक स्थापना सेवाएँ" },
    { name: "डेंटल क्लिनिक सेवाएँ" },
    { name: "नेत्र चिकित्सा सेवाएँ" },
    { name: "श्रवण सहायता सेवाएँ" },
    { name: "विकलांगता उपकरण सेवाएँ" },
    { name: "शारीरिक चिकित्सा सेवाएँ" },
    { name: "व्यावसायिक चिकित्सा सेवाएँ" },
    { name: "भाषण चिकित्सा सेवाएँ" },
    { name: "मानसिक स्वास्थ्य परामर्श सेवाएँ" },
    { name: "नशा मुक्ति सेवाएँ" },
    { name: "वृद्धाश्रम सेवाएँ" },
    { name: "अनाथालय सेवाएँ" },
    { name: "महिला सशक्तिकरण सेवाएँ" },
    { name: "कौशल विकास सेवाएँ" },
    { name: "रोजगार सहायता सेवाएँ" },
    { name: "कैरियर परामर्श सेवाएँ" },
    { name: "रिज्यूमे बनाने की सेवाएँ" },
    { name: "साक्षात्कार प्रशिक्षण सेवाएँ" },
    { name: "प्लेसमेंट सेवाएँ" },
    { name: "प्रवासी श्रमिक सहायता सेवाएँ" },
    { name: "विशेष सेवा श्रेणियाँ (नए युग की)",
        children: [
            { name: "वर्चुअल रियलिटी सेवाएँ" },
            { name: "ऑगमेंटेड रियलिटी सेवाएँ" },
            { name: "मेटावर्स कंसल्टिंग सेवाएँ" },
            { name: "क्रिप्टोकरेंसी सेवाएँ" },
            { name: "एनएफटी सेवाएँ" },
            { name: "स्मार्ट फार्मिंग सेवाएँ" },
            { name: "हाइड्रोपोनिक्स सेवाएँ" },
            { name: "एक्वापोनिक्स सेवाएँ" },
            { name: "वर्टिकल फार्मिंग सेवाएँ" },
            { name: "ऑर्गेनिक प्रमाणन सेवाएँ" },
            { name: "कार्बन क्रेडिट परामर्श सेवाएँ" },
            { name: "हरित ऊर्जा परामर्श सेवाएँ" },
            { name: "ई-वेस्ट प्रबंधन सेवाएँ" },
            { name: "प्लास्टिक अपशिष्ट प्रबंधन सेवाएँ" },
            { name: "जैव-खाद निर्माण सेवाएँ" },
            { name: "वर्मीकम्पोस्टिंग सेवाएँ" },
            { name: "बायोगैस संयंत्र स्थापना सेवाएँ" },
            { name: "वर्षा जल संचयन सेवाएँ" },
            { name: "सौर पम्प स्थापना सेवाएँ" },
            { name: "ई-रिक्शा चार्जिंग स्टेशन सेवाएँ" },
            { name: "इलेक्ट्रिक वाहन चार्जिंग सेवाएँ" },
            { name: "बैटरी स्वैपिंग सेवाएँ" },
            { name: "इलेक्ट्रिक वाहन रूपांतरण सेवाएँ" },
            { name: "वाहन ट्रैकिंग सेवाएँ" },
            { name: "फ्लीट प्रबंधन सेवाएँ" },
            { name: "GPS नेविगेशन सेवाएँ" },
            { name: "सैटेलाइट फोन सेवाएँ" },
            { name: "रिमोट सेंसिंग सेवाएँ" },
            { name: "भूवैज्ञानिक सर्वेक्षण सेवाएँ" },
            { name: "पुरातात्विक सर्वेक्षण सेवाएँ" },
            { name: "जनजातीय पर्यटन सेवाएँ" },
            { name: "एडवेंचर टूरिज्म सेवाएँ" },
            { name: "मेडिकल कैंप सेवाएँ" },
            { name: "विवाह ब्रोकरेज सेवाएँ" },
            { name: "वंशावली अनुसंधान सेवाएँ" },
            { name: "पारिवारिक विवाद समाधान सेवाएँ" },
            { name: "वंचित वर्ग शिक्षा सेवाएँ" },
            { name: "दूरस्थ शिक्षा सेवाएँ" },
            { name: "ऑनलाइन परीक्षा सेवाएँ" },
            { name: "प्रोक्टरिंग सेवाएँ" },
            { name: "प्लेगराउंड डिजाइन सेवाएँ" },
            { name: "पार्क रखरखाव सेवाएँ" },
            { name: "सार्वजनिक शौचालय रखरखाव सेवाएँ" },
            { name: "सड़क रखरखाव सेवाएँ" },
            { name: "सार्वजनिक नल रखरखाव सेवाएँ" },
            { name: "स्ट्रीट लाइट रखरखाव सेवाएँ" },
            { name: "ड्रेनेज सफाई सेवाएँ" },
            { name: "नाला सफाई सेवाएँ" },
            { name: "सेप्टिक टैंक सफाई सेवाएँ" },
            { name: "मल गड्ढा सफाई सेवाएँ" },
        ]
    },
    { name: "क्षेत्र-विशेष आवश्यकताओं के अनुसार सेवाएँ",
        children: [
            { name: "हिमालयी क्षेत्र (उत्तराखंड, हिमाचल, लद्दाख)",
                children: [
                    { name: "शीतकालीन सड़क रखरखाव सेवाएँ" },
                    { name: "हिमस्खलन बचाव सेवाएँ" },
                    { name: "ऊँचाई वाले क्षेत्रों के लिए चिकित्सा सेवाएँ" },
                    { name: "ट्रेकिंग गाइड सेवाएँ" },
                    { name: "भेड़ पालन परामर्श सेवाएँ" },
                    { name: "होमस्टे प्रबंधन सेवाएँ" },
                ]
            },
            { name: "रेगिस्तानी क्षेत्र (राजस्थान, गुजरात)",
                children: [
                    { name: "जल संरक्षण परामर्श सेवाएँ" },
                    { name: "रेगिस्तानी कृषि विशेषज्ञ सेवाएँ" },
                    { name: "ऊँट चिकित्सा सेवाएँ" },
                    { name: "रेत तूफान सुरक्षा सेवाएँ" },
                    { name: "पारंपरिक जल भंडारण संरचना मरम्मत सेवाएँ" },
                ]
            },
            { name: "तटीय क्षेत्र (केरल, गोवा, तमिलनाडु)",
                children: [
                    { name: "मछली पालन परामर्श सेवाएँ" },
                    { name: "नाव मरम्मत सेवाएँ" },
                    { name: "सुनामी चेतावनी सेवाएँ" },
                    { name: "समुद्री पर्यटन गाइड सेवाएँ" },
                    { name: "नारियल उत्पाद प्रसंस्करण सेवाएँ" },
                ]
            },
            { name: "पूर्वोत्तर राज्य",
                children: [
                    { name: "बाँस शिल्प प्रशिक्षण सेवाएँ" },
                    { name: "जनजातीय पर्यटन सेवाएँ" },
                    { name: "ऑर्गेनिक खेती प्रमाणन सेवाएँ" },
                    { name: "सीमावर्ती व्यापार सहायता सेवाएँ" },
                ]
            },
        ]
    },
    { name: "स्थानीय संस्कृति आधारित सेवाएँ",
        children: [
            { name: "धार्मिक एवं आध्यात्मिक सेवाएँ",
                children: [
                    { name: "पुजारी सेवाएँ (पंडित, पुरोहित)" },
                    { name: "मंदिर प्रबंधन सेवाएँ" },
                    { name: "धार्मिक अनुष्ठान सामग्री वितरण" },
                    { name: "तीर्थ यात्रा गाइड सेवाएँ" },
                    { name: "सत्संग आयोजन सेवाएँ" },
                ]
            },
            { name: "पारंपरिक कला एवं शिल्प",
                children: [
                    { name: "मधुबनी चित्रकला प्रशिक्षण" },
                    { name: "राजस्थानी लघु चित्रकारी सेवाएँ" },
                    { name: "कश्मीरी पश्मीना बुनाई प्रशिक्षण" },
                    { name: "बिदरी शिल्प पुनरुद्धार सेवाएँ" },
                    { name: "पट्टचित्र चित्रकारी सेवाएँ" },
                ]
            },
            { name: "लोक संगीत एवं नृत्य",
                children: [
                    { name: "लोक कलाकार प्रबंधन सेवाएँ" },
                    { name: "पारंपरिक वाद्य यंत्र मरम्मत" },
                    { name: "लोक नृत्य प्रशिक्षण सेवाएँ" },
                    { name: "सांस्कृतिक कार्यक्रम आयोजन" },
                ]
            },
            { name: "पारंपरिक चिकित्सा पद्धतियाँ",
                children: [
                    { name: "सिद्ध चिकित्सा सेवाएँ (तमिलनाडु)" },
                    { name: "जड़ी-बूटी संग्रहकर्ता सेवाएँ" },
                    { name: "पारंपरिक प्रसव सहायक (दाई) सेवाएँ" },
                    { name: "हकीम परामर्श सेवाएँ" },
                ]
            },
        ]
    },
    { name: "नई प्रौद्योगिकियों के साथ नई सेवाएँ",
        children: [
            { name: "डिजिटल ट्रांसफॉर्मेशन सेवाएँ",
                children: [
                    { name: "UPI पेमेंट गेटवे सेटअप सेवाएँ" },
                    { name: "डिजिटल लॉकर परामर्श" },
                    { name: "आधार-सक्षम सेवा एकीकरण" },
                    { name: "ई-गवर्नेंस कंसल्टिंग" },
                ]
            },
            { name: "स्मार्ट टेक्नोलॉजी सेवाएँ",
                children: [
                    { name: "IoT-आधारित कृषि मॉनिटरिंग" },
                    { name: "स्मार्ट मीटर इंस्टालेशन" },
                    { name: "AI-चालित ग्राहक सेवा" },
                    { name: "ब्लॉकचेन सप्लाई चेन मैनेजमेंट" },
                ]
            },
            { name: "ग्रीन टेक्नोलॉजी सेवाएँ",
                children: [
                    { name: "कार्बन फुटप्रिंट कैलकुलेशन" },
                    { name: "ई-वाहन चार्जिंग इंफ्रास्ट्रक्चर" },
                    { name: "सोलर रूफटॉप इंस्टालेशन" },
                    { name: "वाटर हार्वेस्टिंग टेक्नोलॉजी" },
                ]
            },
            { name: "एजुटेक सेवाएँ",
                children: [
                    { name: "वर्चुअल क्लासरूम सेटअप" },
                    { name: "लर्निंग मैनेजमेंट सिस्टम" },
                    { name: "ऑनलाइन असेसमेंट टूल्स" },
                    { name: "एडाप्टिव लर्निंग प्लेटफॉर्म" },
                ]
            },
        ]
    },
    { name: "ग्रामीण और शहरी क्षेत्रों की अलग-अलग जरूरतें",
        children: [
            { name: "ग्रामीण क्षेत्रों की विशेष सेवाएँ",
                children: [
                    { name: "किसान उत्पादक संगठन (FPO) गठन सेवाएँ" },
                    { name: "मोबाइल बैंकिंग सहायता" },
                    { name: "सामुदायिक रेडियो संचालन" },
                    { name: "ग्रामीण हाट (बाजार) प्रबंधन" },
                    { name: "पंचायत डिजिटलीकरण सेवाएँ" },
                    { name: "गोबर गैस संयंत्र स्थापना" },
                    { name: "सूक्ष्म सिंचाई सिस्टम इंस्टालेशन" },
                    { name: "ग्रामीण हस्तशिल्प मार्केटिंग" },
                    { name: "पशु चिकित्सा मोबाइल क्लिनिक" },
                    { name: "खाद्य प्रसंस्करण यूनिट सेटअप" },
                ]
            },
            { name: "शहरी क्षेत्रों की विशेष सेवाएँ",
                children: [
                    { name: "सह-कार्य स्थान (Co-working) प्रबंधन" },
                    { name: "होम डिलीवरी सेवाएँ (किराना, दवाई, भोजन)" },
                    { name: "स्मार्ट पार्किंग सॉल्यूशंस" },
                    { name: "वेस्ट सेग्रिगेशन कंसल्टिंग" },
                    { name: "हाई-राइज बिल्डिंग मेन्टेनेंस" },
                    { name: "कम्यूटर शटल सेवाएँ" },
                    { name: "डॉग वॉकिंग और पेट सिटिंग" },
                    { name: "पर्सनल कॉन्सियर्ज सेवाएँ" },
                    { name: "फ्लैट/सोसाइटी मैनेजमेंट" },
                    { name: "स्मार्ट होम ऑटोमेशन" },
                ]
            },
            { name: "अर्ध-शहरी/उपनगरीय क्षेत्रों की सेवाएँ",
                children: [
                    { name: "लास्ट-माइल कनेक्टिविटी सॉल्यूशंस" },
                    { name: "सेमी-अर्बन वेस्ट मैनेजमेंट" },
                    { name: "सब-अर्बन फार्मिंग कंसल्टिंग" },
                    { name: "टाउनशिप डेवलपमेंट सर्विसेज" },
                    { name: "पेरी-अर्बन लॉजिस्टिक्स" },
                ]
            },
        ]
    },
    { name: "विशेष समुदाय आधारित सेवाएँ",
        children: [
            { name: "वंचित वर्गों के लिए सेवाएँ",
                children: [
                    { name: "आंगनवाड़ी सहायक प्रशिक्षण" },
                    { name: "महिला स्वयं सहायता समूह गठन" },
                    { name: "दिव्यांग अनुकूल सुविधा परामर्श" },
                    { name: "वृद्धाश्रम प्रबंधन सेवाएँ" },
                ]
            },
            { name: "प्रवासी श्रमिकों के लिए सेवाएँ",
                children: [
                    { name: "मजदूर आवास प्रबंधन" },
                    { name: "प्रवासी श्रमिक शिक्षा केंद्र" },
                    { name: "रेमिटेंस ट्रांसफर सहायता" },
                    { name: "भाषा प्रशिक्षण सेवाएँ" },
                ]
            },
            { name: "युवाओं के लिए नवीन सेवाएँ",
                children: [
                    { name: "स्टार्टअप इन्क्यूबेशन सेवाएँ" },
                    { name: "फ्रीलांसिंग प्लेटफॉर्म मैनेजमेंट" },
                    { name: "डिजिटल कंटेंट क्रिएशन कोर्सेज" },
                    { name: "इन्फ्लुएंसर मार्केटिंग सेवाएँ" },
                ]
            },
        ]
    },
    { name: "मौसम/ऋतु आधारित सेवाएँ",
        children: [
            { name: "मानसून विशेष सेवाएँ",
                children: [
                    { name: "वर्षा जल संचयन परामर्श" },
                    { name: "मच्छर प्रबंधन सेवाएँ" },
                    { name: "बाढ़ राहत सेवाएँ" },
                    { name: "छत रिसाव मरम्मत सेवाएँ" },
                ]
            },
            { name: "ग्रीष्मकालीन सेवाएँ",
                children: [
                    { name: "AC सर्विसिंग एवं रिपेयर" },
                    { name: "वाटर कूलर मेन्टेनेंस" },
                    { name: "सनस्ट्रोक प्रिवेंशन कंसल्टिंग" },
                    { name: "हाइड्रेशन सेवाएँ" },
                ]
            },
            { name: "शीतकालीन सेवाएँ",
                children: [
                    { name: "गीजर इंस्टालेशन एवं रिपेयर" },
                    { name: "विंटर क्लॉथिंग रेंटल सेवाएँ" },
                    { name: "हीटर सेफ्टी चेक सेवाएँ" },
                ]
            },
        ]
    },
];
