
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

  const OpinionIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" {...props}>
        <path d="M350-63q-46 0-82.5-24T211-153q-16 21-40.5 32.5T120-109q-51 0-85.5-35T0-229q0-43 28-77.5T99-346q-14-20-21.5-42.5T70-436q0-40 20.5-75t57.5-57q5 18 13.5 38.5T181-494q-14 11-22 26.5t-8 32.5q0 56 46 69t87 21l19 32q-11 32-19 54.5t-8 40.5q0 30 21.5 52.5T350-143q38 0 63-34t41-80q16-46 24.5-93t13.5-72l78 21q-9 45-22 103t-36.5 110.5Q488-135 449.5-99T350-63ZM120-189q17 0 28.5-11.5T160-229q0-17-11.5-28.5T120-269q-17 0-28.5 11.5T80-229q0 17 11.5 28.5T120-189Zm284-158q-46-41-83.5-76.5t-64.5-69q-27-33.5-41.5-67T200-629q0-65 44.5-109.5T354-783q4 0 7 .5t7 .5q-4-10-6-20t-2-21q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h14q60 0 102 38.5t50 95.5q-18-3-40.5-3t-41.5 2q-7-23-25.5-38T606-703q-35 0-54.5 20.5T498-623h-37q-35-41-54.5-60.5T354-703q-32 0-53 21t-21 53q0 23 13 47.5t36.5 52q23.5 27.5 57 58.5t74.5 67l-57 57Zm76-436q17 0 28.5-11.5T520-823q0-17-11.5-28.5T480-863q-17 0-28.5 11.5T440-823q0 17 11.5 28.5T480-783ZM609-63q-22 0-43.5-6T524-88q11-14 22-33t20-35q11 7 22 10t22 3q32 0 53.5-22.5T685-219q0-19-8-41t-19-54l19-32q42-8 87.5-21t45.5-69q0-40-29.5-58T716-512q-42 0-98 16t-131 41l-21-78q78-25 139-42t112-17q69 0 121 41t52 115q0 25-7.5 47.5T861-346q43 5 71 39.5t28 77.5q0 50-34.5 85T840-109q-26 0-50.5-11.5T749-153q-20 42-56.5 66T609-63Zm232-126q17 0 28-11.5t11-28.5q0-17-11.5-29T840-270q-17 0-28.5 11.5T800-230q0 17 12 29t29 12Zm-721-40Zm360-594Zm360 593Z"/></svg>
  );
  
  // For src/app/page.tsx, src/app/location/* pages
  export const mainFooterNavLinks = [
    { href: '/', icon: HomeIcon, labelKey: 'home' },
    { href: '/library', icon: BookCopy, labelKey: 'library' },
    { href: '/explore-action', icon: LayoutGrid, labelKey: 'central', isCentral: true },
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
  export const allServiceCategories = [
    {
        title: "पेशेवर एवं कुशल सेवाएँ (Professional & Skilled Services)",
        categories: [
            "सूचना प्रौद्योगिकी (IT) सेवाएँ",
            "डिजिटल मार्केटिंग सेवाएँ",
            "इंजीनियरिंग सेवाएँ",
            "वास्तुकला सेवाएँ",
            "परामर्श सेवाएँ (मैनेजमेंट, बिजनेस)",
            "मानव संसाधन (HR) सेवाएँ",
            "भर्ती सेवाएँ",
            "बाजार अनुसंधान सेवाएँ",
            "विज्ञापन सेवाएँ",
            "जनसंपर्क (PR) सेवाएँ",
            "मरम्मत एवं रखरखाव सेवाएँ (तकनीकी उपकरण)",
            "पैकेजिंग सेवाएँ",
            "मुद्रण एवं प्रकाशन सेवाएँ",
            "सुरक्षा सेवाएँ",
            "सर्वेक्षण एवं मानचित्रण सेवाएँ",
            "फोटोग्राफी एवं वीडियोग्राफी सेवाएँ",
            "संगीत एवं ऑडियो सेवाएँ (रिकॉर्डिंग, मिक्सिंग)",
            "अनुवाद एवं दुभाषिया सेवाएँ",
            "नोटरी सेवाएँ",
            "दस्तावेज़ीकरण सेवाएँ",
            "एआई एवं मशीन लर्निंग सेवाएँ",
            "क्लाउड कंप्यूटिंग सेवाएँ",
            "साइबर सुरक्षा सेवाएँ",
            "ब्लॉकचेन सेवाएँ",
            "वर्चुअल रियलिटी (VR) / ऑगमेंटेड रियलिटी (AR) सेवाएँ",
            "ड्रोन सेवाएँ",
            "मॉडलिंग सेवाएँ",
            "वॉयस-ओवर एवं डबिंग सेवाएँ",
            "बीपीओ/केपीओ/एलपीओ सेवाएँ",
        ]
    },
    {
        title: "स्वास्थ्य सेवाएँ (Healthcare Services)",
        categories: [
            "चिकित्सा परामर्श (एलोपैथी, होम्योपैथी)",
            "आयुर्वेदिक सेवाएँ",
            "यूनानी चिकित्सा सेवाएँ",
            "प्राकृतिक चिकित्सा सेवाएँ",
            "पंचकर्म एवं शिरोधारा सेवाएँ",
            "फिटनेस एवं व्यायाम प्रशिक्षण",
            "योग एवं ध्यान प्रशिक्षण",
            "नर्सिंग सेवाएँ",
            "फार्मेसी सेवाएँ",
            "एम्बुलेंस सेवाएँ",
            "चिकित्सा लिपिकीय सेवाएँ",
            "नैदानिक प्रयोगशाला परीक्षण",
            "वरिष्ठ नागरिक देखभाल सेवाएँ",
            "बाल देखभाल सेवाएँ (शिशु)",
            "दिव्यांग सहायता सेवाएँ",
            "पशु चिकित्सा सेवाएँ",
            "पालतू पशु देखभाल सेवाएँ",
            "मानसिक स्वास्थ्य परामर्श",
            "शारीरिक चिकित्सा",
            "व्यावसायिक चिकित्सा",
            "भाषण चिकित्सा",
            "आहार एवं पोषण परामर्श",
            "वजन प्रबंधन सेवाएँ",
            "स्वास्थ्य जाँच शिविर",
            "टेलीमेडिसिन सेवाएँ",
            "मोबाइल क्लिनिक सेवाएँ",
            "मेडिकल टूरिज्म सेवाएँ",
            "वृद्धाश्रम सेवाएँ",
            "नशा मुक्ति सेवाएँ",
        ]
    },
    {
        title: "शिक्षा एवं प्रशिक्षण सेवाएँ (Education & Training Services)",
        categories: [
            "औपचारिक शिक्षण (स्कूल, कॉलेज, कोचिंग)",
            "व्यावसायिक प्रशिक्षण",
            "कौशल विकास प्रशिक्षण",
            "ऑनलाइन पाठ्यक्रम एवं वेबिनार",
            "भाषा प्रशिक्षण",
            "कंप्यूटर शिक्षा",
            "प्रतियोगी परीक्षा कोचिंग",
            "कला एवं शिल्प प्रशिक्षण (चित्रकला, मधुबनी, पट्टचित्र)",
            "संगीत एवं नृत्य प्रशिक्षण",
            "खेल प्रशिक्षण",
            "ड्राइविंग स्कूल",
            "व्यक्तित्व विकास प्रशिक्षण",
            "कैरियर परामर्श",
            "रोजगार सहायता सेवाएँ",
            "साक्षात्कार प्रशिक्षण",
            "रिज्यूमे लेखन सेवाएँ",
            "प्रवासी श्रमिक शिक्षा केंद्र",
            "विशेष शिक्षा (दिव्यांग बच्चों के लिए)",
            "प्रीस्कूल एवं डेकेयर सेवाएँ",
            "होम ट्यूशन सेवाएँ",
            "लाइब्रेरी सेवाएँ",
            "संग्रहालय एवं संस्कृति संवर्धन सेवाएँ",
            "एनिमेशन एवं VFX प्रशिक्षण",
            "फैशन डिजाइन प्रशिक्षण",
        ]
    },
    {
        title: "वित्तीय सेवाएँ (Financial Services)",
        categories: [
            "बैंकिंग सेवाएँ (बचत, चालू खाता, FD)",
            "ऋण सेवाएँ (होम लोन, कार लोन, पर्सनल लोन)",
            "निवेश सेवाएँ (म्यूचुअल फंड, शेयर बाजार, SIP)",
            "बीमा सेवाएँ (जीवन, स्वास्थ्य, वाहन, संपत्ति)",
            "कर (Tax) परामर्श एवं योजना",
            "लेखा (Accounting) सेवाएँ",
            "लेखा परीक्षा (Auditing) सेवाएँ",
            "पेंशन योजना सेवाएँ",
            "धन प्रबंधन (Wealth Management)",
            "मर्चेंट बैंकिंग",
            "वेंचर कैपिटल एवं निजी इक्विटी सेवाएँ",
            "क्रेडिट रेटिंग सेवाएँ",
            "डेब्ट कलेक्शन सेवाएँ",
            "फॉरेक्स (विदेशी मुद्रा) सेवाएँ",
            "क्रिप्टोकरेंसी एक्सचेंज एवं वॉलेट सेवाएँ",
            "पॉइंट ऑफ सेल (POS) एवं पेमेंट गेटवे सेवाएँ (UPI सेटअप)",
            "रेमिटेंस (प्रेषण) सेवाएँ",
            "माइक्रोफाइनेंस सेवाएँ",
        ]
    },
    {
        title: "कानूनी सेवाएँ (Legal Services)",
        categories: [
            "वकील / विधि परामर्श",
            "अदालती कार्यवाही एवं प्रतिनिधित्व",
            "दस्तावेज़ तैयार करना (समझौता, अनुबंध, वसीयत)",
            "संपत्ति कानून सेवाएँ (खरीद-बिक्री, पंजीकरण)",
            "कॉर्पोरेट कानून सेवाएँ",
            "बौद्धिक संपदा अधिकार (IPR) सेवाएँ",
            "कर (Tax) संबंधी कानूनी सेवाएँ",
            "श्रम कानून परामर्श",
            "अपराधिक कानून सेवाएँ",
            "दिवानी मुकदमेबाजी",
            "पारिवारिक कानून सेवाएँ (विवाह, तलाक, दत्तकग्रहण)",
            "विवाद समाधान एवं मध्यस्थता",
            "दिवाला एवं शोधन अक्षमता कानून",
            "साइबर कानून परामर्श",
            "पर्यावरण कानून परामर्श",
            "वीजा एवं आप्रवासन कानून सहायता",
            "सीमा शुल्क एवं अंतर्राष्ट्रीय व्यापार कानून",
            "कानूनी अनुवाद सेवाएँ",
            "नोटरी सेवाएँ",
            "शपथ पत्र तैयार करना",
        ]
    }
];
    
