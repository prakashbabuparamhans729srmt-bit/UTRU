
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
  
  // For src/app/page.tsx, src/app/location/* pages
  export const mainFooterNavLinks = [
    { href: '/', icon: HomeIcon, labelKey: 'home' },
    { href: '/library', icon: BookCopy, labelKey: 'library' },
    { href: '/explore-action', icon: LayoutGrid, labelKey: 'central', isCentral: true },
    { href: '/explore', icon: PlaySquare, labelKey: 'explore' },
    { href: '/opinion', icon: LayoutGrid, labelKey: 'opinion' },
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
  export const allServiceCategories = [
    {
        title: "मुख्य सेवा श्रेणियाँ",
        categories: [
            "पेशेवर एवं कुशल सेवाएँ", "स्वास्थ्य सेवाएँ", "शिक्षा एवं प्रशिक्षण सेवाएँ", "वित्तीय सेवाएँ", "कानूनी सेवाएँ", "सूचना प्रौद्योगिकी सेवाएँ", "डिजिटल मार्केटिंग सेवाएँ", "कृषि सेवाएँ", "ऑटोमोटिव सेवाएँ", "निर्माण सेवाएँ", "रियल एस्टेट सेवाएँ", "यात्रा एवं पर्यटन सेवाएँ", "आतिथ्य सेवाएँ", "खाद्य एवं खानपान सेवाएँ", "इवेंट प्रबंधन सेवाएँ", "विवाह योजना सेवाएँ", "रसद एवं परिवहन सेवाएँ", "कूरियर एवं वितरण सेवाएँ", "सौंदर्य एवं कल्याण सेवाएँ", "फिटनेस एवं खेल सेवाएँ", "मनोरंजन सेवाएँ", "मीडिया एवं प्रसारण सेवाएँ", "दूरसंचार सेवाएँ", "मरम्मत एवं रखरखाव सेवाएँ", "सफाई एवं स्वच्छता सेवाएँ", "कीट नियंत्रण सेवाएँ", "सुरक्षा सेवाएँ", "पैकेजिंग सेवाएँ", "मुद्रण एवं प्रकाशन सेवाएँ", "फोटोग्राफी एवं वीडियोग्राफी सेवाएँ", "संगीत एवं ऑडियो सेवाएँ", "कला एवं शिल्प सेवाएँ", "आंतरिक सज्जा सेवाएँ", "वास्तुकला सेवाएँ", "इंजीनियरिंग सेवाएँ", "परामर्श सेवाएँ", "मानव संसाधन सेवाएँ", "भर्ती सेवाएँ", "बाजार अनुसंधान सेवाएँ", "विज्ञापन सेवाएँ", "जनसंपर्क सेवाएँ", "बीमा सेवाएँ", "बैंकिंग सेवाएँ", "निवेश सेवाएँ", "कर सेवाएँ", "लेखा सेवाएँ", "लेखा परीक्षा सेवाएँ", "आयात-निर्यात सेवाएँ", "सीमा शुल्क निकासी सेवाएँ", "गोदाम सेवाएँ", "कोल्ड स्टोरेज सेवाएँ", "विनिर्माण सेवाएँ", "गुणवत्ता नियंत्रण सेवाएँ", "प्रयोगशाला परीक्षण सेवाएँ", "चिकित्सा लिपिकीय सेवाएँ", "फार्मेसी सेवाएँ", "एम्बुलेंस सेवाएँ", "नर्सिंग सेवाएँ", "वरिष्ठ नागरिक देखभाल सेवाएँ", "बाल देखभाल सेवाएँ", "दिव्यांग सहायता सेवाएँ", "पशु चिकित्सा सेवाएँ", "पालतू पशु देखभाल सेवाएँ", "पर्यावरण सेवाएँ", "अपशिष्ट प्रबंधन सेवाएँ", "पुनर्चक्रण सेवाएँ", "जल उपचार सेवाएँ", "सौर ऊर्जा सेवाएँ", "विद्युत सेवाएँ", "प्लंबिंग सेवाएँ", "बढ़ई सेवाएँ", "राजगीरी सेवाएँ", "पेंटिंग सेवाएँ", "बागवानी सेवाएँ", "भूदृश्य डिजाइन सेवाएँ", "स्विमिंग पूल सेवाएँ", "लिफ्ट रखरखाव सेवाएँ", "अग्नि सुरक्षा सेवाएँ", "आपदा प्रबंधन सेवाएँ", "अनुवाद सेवाएँ", "दुभाषिया सेवाएँ", "नोटरी सेवाएँ", "दस्तावेज़ीकरण सेवाएँ", "वीजा एवं आप्रवासन सेवाएँ", "ज्योतिष एवं वास्तु सेवाएँ", "आध्यात्मिक सेवाएँ", "परामर्शदाता सेवाएँ", "चिकित्सा सेवाएँ (थेरेपी)", "योग एवं ध्यान सेवाएँ", "रोमांचक खेल सेवाएँ", "नौका सेवाएँ", "किराया सेवाएँ", "लॉन्ड्री सेवाएँ", "ड्राई क्लीनिंग सेवाएँ", "दर्जी सेवाएँ", "गहना मरम्मत सेवाएँ", "घड़ी मरम्मत सेवाएँ", "चाबी बनाने की सेवाएँ", "ताला बनाने की सेवाएँ", "गाड़ी खींचने की सेवाएँ", "सर्वेक्षण सेवाएँ", "मानचित्रण सेवाएँ", "ड्रोन सेवाएँ", "ब्लॉकचेन सेवाएँ", "एआई एवं मशीन लर्निंग सेवाएँ", "क्लाउड कंप्यूटिंग सेवाएँ", "साइबर सुरक्षा सेवाएँ", "ऐप विकास सेवाएँ", "वेब विकास सेवाएँ", "गेम विकास सेवाएँ", "एनिमेशन सेवाएँ", "विएफएक्स सेवाएँ", "फैशन डिजाइन सेवाएँ", "मॉडलिंग सेवाएँ", "वॉयस ओवर सेवाएँ", "डबिंग सेवाएँ", "उपशीर्षक सेवाएँ", "ट्रांसक्रिप्शन सेवाएँ", "कॉल सेंटर सेवाएँ", "बीपीओ सेवाएँ", "केपीओ सेवाएँ", "एलपीओ सेवाएँ", "सह-कार्य स्थान सेवाएँ", "वर्चुअल ऑफिस सेवाएँ", "भंडारण सेवाएँ", "स्थानांतरण सेवाएँ", "होम ऑटोमेशन सेवाएँ", "स्मार्ट सिटी सेवाएँ", "ई-कॉमर्स सेवाएँ", "अंतिम-मील वितरण सेवाएँ"
        ]
    },
    {
        title: "अतिरिक्त मुख्य सेवा श्रेणियाँ",
        categories: [
            "भवन निरीक्षण सेवाएँ", "औद्योगिक प्रशिक्षण सेवाएँ", "खाद्य सुरक्षा प्रमाणन सेवाएँ", "प्रमाणन एवं प्रत्यायन सेवाएँ", "विवाद समाधान सेवाएँ", "मध्यस्थता सेवाएँ", "शिकायत निवारण सेवाएँ", "उपभोक्ता फोरम सहायता सेवाएँ", "गृहकार्य सहायता सेवाएँ", "ट्यूशन एजेंसी सेवाएँ", "छात्रावास सेवाएँ", "पुस्तकालय सेवाएँ", "संग्रहालय सेवाएँ", "संस्कृति संवर्धन सेवाएँ", "पारंपरिक कला संरक्षण सेवाएँ", "जल संरक्षण सेवाएँ", "वन्यजीव संरक्षण सेवाएँ", "जैविक खेती परामर्श सेवाएँ", "मृदा परीक्षण सेवाएँ", "जल परीक्षण सेवाएँ", "वायु गुणवत्ता परीक्षण सेवाएँ", "औद्योगिक सुरक्षा सेवाएँ", "कार्यस्थल सुरक्षा सेवाएँ", "स्वास्थ्य जाँच शिविर सेवाएँ", "टेलीमेडिसिन सेवाएँ", "मोबाइल क्लिनिक सेवाएँ", "दवा वितरण सेवाएँ", "मेडिकल टूरिज्म सेवाएँ", "आयुर्वेदिक उपचार सेवाएँ", "यूनानी चिकित्सा सेवाएँ", "प्राकृतिक चिकित्सा सेवाएँ", "पंचकर्म सेवाएँ", "शिरोधारा सेवाएँ", "रेकी चिकित्सा सेवाएँ", "क्रायोथेरेपी सेवाएँ", "हाइड्रोथेरेपी सेवाएँ", "पोषण परामर्श सेवाएँ", "आहार योजना सेवाएँ", "वजन प्रबंधन सेवाएँ", "डिटॉक्स सेवाएँ", "स्वास्थ्य शिविर आयोजन सेवाएँ", "प्राथमिक चिकित्सा प्रशिक्षण सेवाएँ", "सीपीआर प्रशिक्षण सेवाएँ", "औषधीय पौधे खेती सेवाएँ", "हर्बल उत्पाद निर्माण सेवाएँ", "औषधि अनुसंधान सेवाएँ", "नैदानिक परीक्षण सेवाएँ", "बायोमेडिकल अपशिष्ट प्रबंधन सेवाएँ", "चिकित्सा उपकरण कैलिब्रेशन सेवाएँ", "अस्पताल प्रबंधन सेवाएँ", "क्लिनिक स्थापना सेवाएँ", "डेंटल क्लिनिक सेवाएँ", "नेत्र चिकित्सा सेवाएँ", "श्रवण सहायता सेवाएँ", "विकलांगता उपकरण सेवाएँ", "शारीरिक चिकित्सा सेवाएँ", "व्यावसायिक चिकित्सा सेवाएँ", "भाषण चिकित्सा सेवाएँ", "मानसिक स्वास्थ्य परामर्श सेवाएँ", "नशा मुक्ति सेवाएँ", "वृद्धाश्रम सेवाएँ", "अनाथालय सेवाएँ", "महिला सशक्तिकरण सेवाएँ", "कौशल विकास सेवाएँ", "रोजगार सहायता सेवाएँ", "कैरियर परामर्श सेवाएँ", "रिज्यूमे बनाने की सेवाएँ", "साक्षात्कार प्रशिक्षण सेवाएँ", "प्लेसमेंट सेवाएँ", "प्रवासी श्रमिक सहायता सेवाएँ"
        ]
    },
    {
        title: "विशेष सेवा श्रेणियाँ (नए युग की)",
        categories: [
            "वर्चुअल रियलिटी सेवाएँ", "ऑगमेंटेड रियलिटी सेवाएँ", "मेटावर्स कंसल्टिंग सेवाएँ", "क्रिप्टोकरेंसी सेवाएँ", "एनएफटी सेवाएँ", "स्मार्ट फार्मिंग सेवाएँ", "हाइड्रोपोनिक्स सेवाएँ", "एक्वापोनिक्स सेवाएँ", "वर्टिकल फार्मिंग सेवाएँ", "ऑर्गेनिक प्रमाणन सेवाएँ", "कार्बन क्रेडिट परामर्श सेवाएँ", "हरित ऊर्जा परामर्श सेवाएँ", "ई-वेस्ट प्रबंधन सेवाएँ", "प्लास्टिक अपशिष्ट प्रबंधन सेवाएँ", "जैव-खाद निर्माण सेवाएँ", "वर्मीकम्पोस्टिंग सेवाएँ", "बायोगैस संयंत्र स्थापना सेवाएँ", "वर्षा जल संचयन सेवाएँ", "सौर पम्प स्थापना सेवाएँ", "ई-रिक्शा चार्जिंग स्टेशन सेवाएँ", "इलेक्ट्रिक वाहन चार्जिंग सेवाएँ", "बैटरी स्वैपिंग सेवाएँ", "इलेक्ट्रिक वाहन रूपांतरण सेवाएँ", "वाहन ट्रैकिंग सेवाएँ", "फ्लीट प्रबंधन सेवाएँ", "GPS नेविगेशन सेवाएँ", "सैटेलाइट फोन सेवाएँ", "रिमोट सेंसिंग सेवाएँ", "भूवैज्ञानिक सर्वेक्षण सेवाएँ", "पुरातात्विक सर्वेक्षण सेवाएँ", "जनजातीय पर्यटन सेवाएँ", "एडवेंचर टूरिज्म सेवाएँ", "मेडिकल कैंप सेवाएँ", "विवाह ब्रोकरेज सेवाएँ", "वंशावली अनुसंधान सेवाएँ", "पारिवारिक विवाद समाधान सेवाएँ", "वंचित वर्ग शिक्षा सेवाएँ", "दूरस्थ शिक्षा सेवाएँ", "ऑनलाइन परीक्षा सेवाएँ", "प्रोक्टरिंग सेवाएँ", "प्लेगराउंड डिजाइन सेवाएँ", "पार्क रखरखाव सेवाएँ", "सार्वजनिक शौचालय रखरखाव सेवाएँ", "सड़क रखरखाव सेवाएँ", "सार्वजनिक नल रखरखाव सेवाएँ", "स्ट्रीट लाइट रखरखाव सेवाएँ", "ड्रेनेज सफाई सेवाएँ", "नाला सफाई सेवाएँ", "सेप्टिक टैंक सफाई सेवाएँ", "मल गड्ढा सफाई सेवाएँ"
        ]
    },
    {
        title: "क्षेत्र-विशेष आवश्यकताएँ",
        categories: [
            "शीतकालीन सड़क रखरखाव सेवाएँ", "हिमस्खलन बचाव सेवाएँ", "ऊँचाई वाले क्षेत्रों के लिए चिकित्सा सेवाएँ", "ट्रेकिंग गाइड सेवाएँ", "भेड़ पालन परामर्श सेवाएँ", "होमस्टे प्रबंधन सेवाएँ", "जल संरक्षण परामर्श सेवाएँ", "रेगिस्तानी कृषि विशेषज्ञ सेवाएँ", "ऊँट चिकित्सा सेवाएँ", "रेत तूफान सुरक्षा सेवाएँ", "पारंपरिक जल भंडारण संरचना मरम्मत सेवाएँ", "मछली पालन परामर्श सेवाएँ", "नाव मरम्मत सेवाएँ", "सुनामी चेतावनी सेवाएँ", "समुद्री पर्यटन गाइड सेवाएँ", "नारियल उत्पाद प्रसंस्करण सेवाएँ", "बाँस शिल्प प्रशिक्षण सेवाएँ", "जनजातीय पर्यटन सेवाएँ", "ऑर्गेनिक खेती प्रमाणन सेवाएँ", "सीमावर्ती व्यापार सहायता सेवाएँ"
        ]
    },
    {
        title: "स्थानीय संस्कृति आधारित सेवाएँ",
        categories: [
            "पुजारी सेवाएँ (पंडित, पुरोहित)", "मंदिर प्रबंधन सेवाएँ", "धार्मिक अनुष्ठान सामग्री वितरण", "तीर्थ यात्रा गाइड सेवाएँ", "सत्संग आयोजन सेवाएँ", "मधुबनी चित्रकला प्रशिक्षण", "राजस्थानी लघु चित्रकारी सेवाएँ", "कश्मीरी पश्मीना बुनाई प्रशिक्षण", "बिदरी शिल्प पुनरुद्धार सेवाएँ", "पट्टचित्र चित्रकारी सेवाएँ", "लोक कलाकार प्रबंधन सेवाएँ", "पारंपरिक वाद्य यंत्र मरम्मत", "लोक नृत्य प्रशिक्षण सेवाएँ", "सांस्कृतिक कार्यक्रम आयोजन", "सिद्ध चिकित्सा सेवाएँ (तमिलनाडु)", "जड़ी-बूटी संग्रहकर्ता सेवाएँ", "पारंपरिक प्रसव सहायक (दाई) सेवाएँ", "हकीम परामर्श सेवाएँ"
        ]
    },
    {
        title: "नई प्रौद्योगिकियों के साथ नई सेवाएँ",
        categories: [
            "UPI पेमेंट गेटवे सेटअप सेवाएँ", "डिजिटल लॉकर परामर्श", "आधार-सक्षम सेवा एकीकरण", "ई-गवर्नेंस कंसल्टिंग", "IoT-आधारित कृषि मॉनिटरिंग", "स्मार्ट मीटर इंस्टालेशन", "AI-चालित ग्राहक सेवा", "ब्लॉकचेन सप्लाई चेन मैनेजमेंट", "कार्बन फुटप्रिंट कैलकुलेशन", "ई-वाहन चार्जिंग इंफ्रास्ट्रक्चर", "सोलर रूफटॉप इंस्टालेशन", "वाटर हार्वेस्टिंग टेक्नोलॉजी", "वर्चुअल क्लासरूम सेटअप", "लर्निंग मैनेजमेंट सिस्टम", "ऑनलाइन असेसमेंट टूल्स", "एडाप्टिव लर्निंग प्लेटफॉर्म"
        ]
    },
    {
        title: "ग्रामीण और शहरी क्षेत्रों की जरूरतें",
        categories: [
            "किसान उत्पादक संगठन (FPO) गठन सेवाएँ", "मोबाइल बैंकिंग सहायता", "सामुदायिक रेडियो संचालन", "ग्रामीण हाट (बाजार) प्रबंधन", "पंचायत डिजिटलीकरण सेवाएँ", "गोबर गैस संयंत्र स्थापना", "सूक्ष्म सिंचाई सिस्टम इंस्टालेशन", "ग्रामीण हस्तशिल्प मार्केटिंग", "पशु चिकित्सा मोबाइल क्लिनिक", "खाद्य प्रसंस्करण यूनिट सेटअप", "सह-कार्य स्थान (Co-working) प्रबंधन", "होम डिलीवरी सेवाएँ (किराना, दवाई, भोजन)", "स्मार्ट पार्किंग सॉल्यूशंस", "वेस्ट सेग्रिगेशन कंसल्टिंग", "हाई-राइज बिल्डिंग मेन्टेनेंस", "कम्यूटर शटल सेवाएँ", "डॉग वॉकिंग और पेट सिटिंग", "पर्सनल कॉन्सियर्ज सेवाएँ", "फ्लैट/सोसाइटी मैनेजमेंट", "स्मार्ट होम ऑटोमेशन", "लास्ट-माइल कनेक्टिविटी सॉल्यूशंस", "सेमी-अर्बन वेस्ट मैनेजमेंट", "सब-अर्बन फार्मिंग कंसल्टिंग", "टाउनशिप डेवलपमेंट सर्विसेज", "पेरी-अर्बन लॉजिस्टिक्स"
        ]
    },
    {
        title: "विशेष समुदाय आधारित सेवाएँ",
        categories: [
            "आंगनवाड़ी सहायक प्रशिक्षण", "महिला स्वयं सहायता समूह गठन", "दिव्यांग अनुकूल सुविधा परामर्श", "वृद्धाश्रम प्रबंधन सेवाएँ", "मजदूर आवास प्रबंधन", "प्रवासी श्रमिक शिक्षा केंद्र", "रेमिटेंस ट्रांसफर सहायता", "भाषा प्रशिक्षण सेवाएँ", "स्टार्टअप इन्क्यूबेशन सेवाएँ", "फ्रीलांसिंग प्लेटफॉर्म मैनेजमेंट", "डिजिटल कंटेंट क्रिएशन कोर्सेज", "इन्फ्लुएंसर मार्केटिंग सेवाएँ"
        ]
    },
    {
        title: "मौसम/ऋतु आधारित सेवाएँ",
        categories: [
            "वर्षा जल संचयन परामर्श", "मच्छर प्रबंधन सेवाएँ", "बाढ़ राहत सेवाएँ", "छत रिसाव मरम्मत सेवाएँ", "AC सर्विसिंग एवं रिपेयर", "वाटर कूलर मेन्टेनेंस", "सनस्ट्रोक प्रिवेंशन कंसल्टिंग", "हाइड्रेशन सेवाएँ", "गीजर इंस्टालेशन एवं रिपेयर", "विंटर क्लॉथिंग रेंटल सेवाएँ", "हीटर सेफ्टी चेक सेवाएँ"
        ]
    }
];
    
